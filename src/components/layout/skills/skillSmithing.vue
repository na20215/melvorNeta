<template>
    <div class="content">
    <smithing-block
        :inner-height="'85%'"
        :blockHeight="'7rem'"
    ></smithing-block>
  <smithing-block></smithing-block>
</div>
</template>

<script>
import smithingBlock from './smithingBlock.vue'
export default {
  components: { smithingBlock },

}
</script>

<style scoped>
.content{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 2rem;
    gap: 2rem;
}
</style>