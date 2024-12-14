<template>
  <div v-if="state.overlays" class="overlay" @click="close"></div>
    <div v-if="state.isVisble" class="content">  
      <span class="close-btn" @click="close">X</span>
      <span class="guide">游戏指南</span>
      <slot></slot>
      
    </div>

</template>


<script>
import { inject } from 'vue';
export default {
    setup(){
        const state = inject('state');

        const close = () => {
            state.isVisble = !state.isVisble;
            state.overlays = !state.overlays;
        }
        return{state, close}
    },
    props:{
        // position: {
        //     type: Object,
        //     default: () => ({ left: '0px', top: '0px' })
        // },


    },
    data() {
      return {
      }
    },
    methods:{

    }
}
</script>

<style scoped>
/* 背景遮罩 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.content{
    position: fixed;;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    margin: 2rem;
    width: 50%;
    background-color: rgb(35, 42, 53);

}
.guide{
    display: inline-block;
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.5rem;
    
}
.close-btn {
  display: inline-block;
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: black;
  background: none;
  border: none;
  border-radius: 1rem;
  font-weight:bolder;
  font-size: 1rem;
  cursor: pointer;
}

</style>
