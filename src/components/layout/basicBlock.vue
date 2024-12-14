<template>
  <div class="outer_block" :style="{backgroundColor:sideColor, width:blockWidth,height:blockHeight}">
    <div class="inner_block" :style="{height:innerHeight}">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        sideColor:{
            type:String,
            required:true,
        },
        blockWidth:{
            type:String,
            required:false,
            default:'100%',
        },
        blockHeight:{
            type:String,
            required:false,
            default: 'auto',
        },
        innerHeight:{
          type:String,
          required:false,
            default: '98%',
        }
    }
}
</script>

<style scoped>
  .outer_block{
    display: flex;
    flex-direction: column-reverse;
    box-sizing: border-box;
    border-radius: 0.5rem;
    transition: transform 0.5s;

  }
  .inner_block{
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgb(35,42,53);
    box-sizing: border-box;
    justify-content: center; 
    align-items: center;
    border-radius: 0 0 0.5rem 0.5rem; 
  }


</style>