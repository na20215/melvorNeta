<template>
  <div class="combinePart">
    <div class="basicInfoBlock" >
            <slot></slot>
            <div class="countPart" :style="{backgroundColor: bannerColor}"><slot name="count"></slot></div>
        </div>
  </div>
</template>

<script>
export default {
    props:{
        bannerColor:{
            type:String,
            required:false,
            default:'rgb(108,117,125)'
        }
    }
}
</script>

<style scoped>
.combinePart{
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
.basicInfoBlock{
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    border-radius: 0.25rem;
    background-color: rgb(45,53,66);
}

.countPart{
    position: absolute;
    bottom: -0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: white;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 600;
    padding: 0 0.25rem;
    border-radius: 0.4rem;
 }
</style>