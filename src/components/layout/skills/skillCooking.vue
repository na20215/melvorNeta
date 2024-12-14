<template>
<div class="kitchen">
  <cooking-block></cooking-block>
  <cooking-block></cooking-block>
  <cooking-block></cooking-block>
</div>
</template>

<script>
import cookingBlock from './cookingBlock.vue'
export default {
  components: { cookingBlock },

}
</script>

<style scoped>
.kitchen{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding:1rem;
}
</style>