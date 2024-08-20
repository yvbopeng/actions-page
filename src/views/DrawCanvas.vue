<template>
    <div>
        <!-- <v-stage :config="configKonva">
            <v-layer>
                <v-circle :config="configCircle"></v-circle>
                <v-image :config="configImage"></v-image>
                <v-transformer ref="transformer" />
            </v-layer>
        </v-stage> -->
        <button @click="saveImage" >保存图片</button>
        <v-stage ref="stage" :config="configKonva" @mousedown="handleStageMouseDown" @touchstart="handleStageMouseDown">
            <v-layer ref="layer">
                <v-rect v-for="item in rectangles" :key="item.id" :config="item" />
                <v-image :config="configImage"></v-image>
                <v-transformer ref="transformer" />
            </v-layer>
        </v-stage>
    </div>
</template>


<script setup>
import { ref } from 'vue'
// import Konva from 'konva';
// import blackBack from '../assets/black_bg.png';
import appIcon from '../assets/app_icon.png'


const configKonva = ref({
    width: 500,
    height: 500
});
const transformer = ref(null)
const selectedShapeName = ref('')

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
    if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode]);
    } else {
        console.log('删除')
        // remove transformer
        transformerNode.nodes([]);
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




// const configCircle = ref({
//     x: 100,
//     y: 100,
//     radius: 70,
//     fill: "red",
//     stroke: "black",
//     strokeWidth: 4,
//     draggable: true
// });

const rectangles = ref([
    {
        rotation: 0,
        x: 10,
        y: 10,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        fill: '#38bdf8',
        name: 'rect1',
        draggable: true,
    }
]);
const configImage = ref({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    image: null,
    name:'image-app',
    draggable: true,
    transform: true,
});
const imageObj = new Image();
imageObj.src = appIcon;
imageObj.onload = () => {
    configImage.value.image = imageObj;
};

</script>

<style scoped>
#imageCanvas {
    width: 500px;
    height: 500px;
}
</style>