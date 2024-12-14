<template>
  <skill-bar
    @update-page="getNewPage"
  ></skill-bar>
  <main-content
    :skill-name="selectedPage"
  ></main-content>
  
  <help-page-selector
   :skill-name="selectedPage"
  ></help-page-selector>

  <div class="notificationContent">
    <main-notification></main-notification>
  </div>
</template>

<script>
import mainContent from './mainContent.vue';
import skillBar from './skillBar.vue';
import helpPageSelector from './components/layout/help/helpPageSelector.vue';
import mainNotification from './mainNotification.vue';
import { reactive } from 'vue';
import { provide } from 'vue';
export default {
  components: { skillBar, mainContent, helpPageSelector, mainNotification},
  setup(){
    let state = reactive({
      isVisble: false,
      overlays: false,
    });
    provide('state', state);
    return {
        state,
    };
  },
  data(){
    return {
      selectedPage:'伐木',
    }
  },
  methods: {
    getNewPage(newPage){
      this.selectedPage=newPage.name;
    },
  },
}
</script>

<style>
 html, body{
    display: flex;
    font-size: 16px;
    color: white;
    font-weight: 900;
    width: 100%;
    height: 100%;
    margin: 0;
    padding:0;
 }

 #app {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
 }

 .notificationContent{
  z-index: 20;
  position: absolute;
  left:45%;
  bottom:2rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  max-height: 50rem;
  width: 20rem;
  box-sizing: border-box;
  padding: 0 3rem;
  gap:1rem;    
  }


</style>