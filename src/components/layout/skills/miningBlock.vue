<template>
    <basic-block class="miningblock"
      :block-width="'23%'"
      :side-color="'rgb(149,133,122)'"
    >
    <slot></slot>
    </basic-block>
  </template>
  
  <script>
  export default {

  }
  </script>
  
  <style scoped>
  
    .miningblock:hover{
      transform: translateY(-5px); 
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
    }
  
    .miningblock:hover :deep(.inner_block) {
    background-color: rgb(45,82,35);
  }
  
  </style>