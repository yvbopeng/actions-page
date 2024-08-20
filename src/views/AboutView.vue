<template>
  <div class="about">
    About
  </div>
</template>

<script setup>

</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

th {
  background-color: #f8f8f8;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}



.item-tr {
  cursor: move;
}

.col-0 {
  width: 5%;
}

/* 设置每列的宽度 */
.col-1 {
  width: 20%;
}

.col-2 {
  width: 15%;
}

.col-3 {
  width: 20%;
}
.col-4-5 {
  width: 15%;
}
.col-4 {
  width: 10%;
}

.col-5 {
  width: 15%;
}

.list-warp {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
</style>
