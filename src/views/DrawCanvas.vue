<template>
    <div>
        <input type="file" id="imageInput" accept="image/*" @change="onFileChange">

        <button @click="saveImage">下载图片</button>
        <button id="copy-base64">复制base64到剪切板</button>
        <div class="stage-area">
            <v-stage ref="stage" :config="configKonva" @mousedown="handleStageMouseDown"
                @touchstart="handleStageMouseDown">
                <v-layer ref="layer">
                    <v-image :config="configImageBg"></v-image>
                    <v-image :config="singImagConfig"></v-image>
                    <v-transformer ref="transformer" />
                </v-layer>
            </v-stage>
        </div>

        <hr>

        <div class="sign-area">
            <button @click="saveSignImage">
                保存签名
            </button>
            <div class="border sign-wrap">
                <SignCanvasPlus class="sign-canvas" ref="SignCanvasPlusRef" :options="signOption" v-model="signData" />
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import appIcon from '../assets/app_icon.png'
import SignCanvasPlus from 'sign-canvas-plus'
import ClipboardJS from 'clipboard'
import Swal from 'sweetalert2'


const configKonva = ref({
    width: 500,
    height: 500
});
const transformer = ref(null)
const selectedShapeName = ref('')
const partScreenWidth = window.innerWidth * 2 / 3

function updateTransformer() {
    // here we need to manually attach or detach Transformer node
    const transformerNode = transformer.value.getNode();
    const stage = transformerNode.getStage();
    const selectedNode = stage.findOne('.' + selectedShapeName.value);
    // do nothing if selected node is already attached
    if (selectedNode === transformerNode.node()) {
        return;
    }
    console.log(selectedNode)
    if (selectedNode && selectedShapeName.value !== 'image-bg') {
        // attach to another node
        transformerNode.nodes([selectedNode]);
    } else {
        console.log('删除')
        // remove transformer
        transformerNode.nodes([]);
    }
}
const configImageBg = ref({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    image: null,
    name: 'image-bg',
    draggable: true,
    transform: true,
})

const imageDataUrl = ref('')
function onFileChange() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0]; // 获取用户选择的第一个文件  

    if (file) {
        // 创建一个FileReader对象来读取文件  
        const reader = new FileReader();

        // 当文件读取完成时，调用这个函数  
        reader.onload = function (e) {
            const imgBgObject = new Image();
            imgBgObject.onload = function () {
                const canvas = {}
                // 画布和图片原来尺寸一致
                canvas.width = imgBgObject.width;
                canvas.height = canvas.width * imgBgObject.height / imgBgObject.width;


                configKonva.value.width = canvas.width;
                configKonva.value.height = canvas.height;


                configImageBg.value.image = imgBgObject;
                configImageBg.value.width = canvas.width;
                configImageBg.value.height = canvas.height;


                console.log('打印：0000', imgBgObject)
            }
            imageDataUrl.value = e.target.result;
            imgBgObject.src = e.target.result;
        };
        // 读取文件内容，这里读取为DataURL（base64编码）  
        reader.readAsDataURL(file);
    }
}

function downloadURI(uri, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function saveImage() {
    const transformerNode = transformer.value.getNode();
    const stage = transformerNode.getStage();
    const dataURL = stage.toDataURL({ pixelRatio: 3 });
    console.log(dataURL)
    downloadURI(dataURL, 'stage.png');
}

function handleStageMouseDown(e) {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
        selectedShapeName.value = '';
        updateTransformer();
        return;
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
        return;
    }

    const name = e.target.name();

    if (name) {
        selectedShapeName.value = name;
    } else {
        selectedShapeName.value = '';
    }
    updateTransformer();
}


const configImage = ref({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    image: null,
    name: 'image-app',
    draggable: true,
    transform: true,
});
const imageObj = new Image();
imageObj.src = appIcon;
imageObj.onload = () => {
    configImage.value.image = imageObj;
};



// 签名
const signAreaWidthNumber = 658;
const signOption = reactive({
    isFullScreen: false, // 是否全屏手写 [Boolean] 可选
    isFullCover: false, // 是否全屏模式下覆盖所有的元素 [Boolean]   可选
    isDpr: false, // 是否使用dpr兼容高分屏 [Boolean] 可选
    lastWriteSpeed: 1, //书写速度 [Number] 可选
    lastWriteWidth: 2, //下笔的宽度 [Number] 可选
    lineCap: 'round', //线条的边缘类型 [butt]平直的边缘 [round]圆形线帽 [square] 正方形线帽
    lineJoin: 'bevel', //线条交汇时边角的类型  [bevel]创建斜角 [round]创建圆角 [miter]创建尖角。
    canvasWidth: signAreaWidthNumber, //canvas宽高 [Number] 可选
    canvasHeight: 370, //高度  [Number] 可选
    isShowBorder: false, //是否显示边框 [可选]
    bgColor: 'transparent', //背景色 [String] 可选
    borderWidth: 1, // 网格线宽度  [Number] 可选
    borderColor: '#333333', //网格颜色  [String] 可选
    writeWidth: 5, //基础轨迹宽度  [Number] 可选
    maxWriteWidth: 30, // 写字模式最大线宽  [Number] 可选
    minWriteWidth: 5, // 写字模式最小线宽  [Number] 可选
    writeColor: '#101010', // 轨迹颜色  [String] 可选
    isSign: true, // 签名模式 [Boolean] 默认为非签名模式,有线框, 当设置为true的时候没有任何线框
    imgType: 'png', // 下载的图片格式  [String] 可选为 jpeg  canvas本是透明背景的.
    quality: 1 //  图片压缩系数[0-1]之间 可以选 默认为1
})
const signData = ref(null);


const SignCanvasPlusRef = ref(null)

const singImagConfig = reactive({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
    image: null,
    name: 'image-sign',
    draggable: true,
    transform: true,
})
function saveSignImage() {
    const signImageData = SignCanvasPlusRef.value.saveAsImg()
    const signImgObject = new Image();
    signImgObject.src = signImageData;
    signImgObject.onload = () => {
        singImagConfig.image = signImgObject;
        singImagConfig.width = configKonva.value.width / 3;
        singImagConfig.height = singImagConfig.width * signImgObject.height / signImgObject.width;
    }
}

const clipboard = new ClipboardJS('#copy-base64', {
    text: function (trigger) {
        const transformerNode = transformer.value.getNode();
        const stage = transformerNode.getStage();
        const dataURL = stage.toDataURL({ pixelRatio: 3 });
        return dataURL ? dataURL : '';
    }
});
clipboard.on('success', function (e) {
    Swal.fire({
        text: '复制成功',
        timer: 1500,
        icon: "success",
        showConfirmButton: false
    })
    e.clearSelection();
});

const singAreaWidth = ref(signAreaWidthNumber + 'px')
</script>

<style scoped>
#imageCanvas {
    width: 500px;
    height: 500px;
}

.border {
    border: 1px solid #000;
}

.sign-area {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sign-wrap {
    width: v-bind(singAreaWidth);
    height: 370px;
    margin-top: 20px;
}

#copy-base64 {
    margin-left: 20px;
}

.stage-area {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>