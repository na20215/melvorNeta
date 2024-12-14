<template>
    <basic-block 
        class="farmingblock"
        :block-width="blockWidth"
        :block-height="blockHeight"
        :side-color="'rgb(171,146,26)'"
        :inner-height="'96%'"> 
  <slot></slot>
  </basic-block>
</template>

<script>
export default {
    props:{
        blockWidth:{
            type: String,
            required: false,
            default: '32%'
        },
        blockHeight:{
            type: String,
            required: false,
            default: '65%'
        }
    }
}
</script>

<style scoped>
  .farmingblock:hover{
    transform: translateY(-5px); 
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  }

  .farmingblock :deep(.inner_block) {
    padding: 2rem;
    flex-direction: row;
    justify-content: flex-start;
}

.farmingblock:hover :deep(.inner_block) {
    background-color: rgb(45,82,35);

}
</style>