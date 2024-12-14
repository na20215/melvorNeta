<template>
    <basic-block class="cuttingblock"
    :side-color="'rgb(146,208,241)'"
  >
  
  <div class="header">
            <span class="groundName">{{fishingGround.name}}</span>
            <span class="groundInfo">
                <span>渔获:{{ fishProbablilty }}</span>
                <span>垃圾:{{ trashProbablilty }}</span>
                <span>特殊物品:{{ specialItemProbablilty }}</span>
            </span>
        </div>
    <div class="inner_content">
        <div class="body">
          <div class="fishes">
            <fishing-unit
              v-for="fish in fishingGround.fishInGround"
              :key="fish.name"
              :fish-name="fish.name"
              @update-selected="undateSelectedFish">
              <img class="icon" :src="fish.icon">
              <div class="fishInfo">
                <span :style="{fontSize:'0.9rem'}">{{ fish.name }}</span>
                <span>{{ fish.exp }}技能经验值 {{ fish.minTime }}秒 - {{ fish.maxTime }}秒</span>
              </div>
            </fishing-unit>
          </div>
          <div class="view_window">
              <fishing-screen
                :selected-fish="fishingGround.fishInGround[selectedFish]"
                :fish-ground="fishingGround.name"
                :ground-is-worked="groundIsWorked"
                @update-fish-name="addFishingGroundName"
                @stop-working="stopFishing"
              ></fishing-screen>
          </div>
        </div>
    </div>
  </basic-block>
</template>

<script>
import FishingScreen from './fishingScreen.vue';
import FishingUnit from './fishingUnit.vue';
export default {
  components:{ FishingScreen, FishingUnit},
  props:{
    fishingGround:{
      type:Object,
      Required:true,
    },
    groundIsWorked:{
      type:String,
      Required:true,
    }
  },
  data(){
    return{
      isLocked:false, //禁止工作中的渔场切换鱼
      selectedFish :'',
    }
  },
  methods:{
  stopFishing(){
    this.$emit('stopFishing');
  },
  undateSelectedFish(data){
    this.selectedFish = data;
    if(this.isLocked){
      // console.log("stopfishing 在fishingBlock触发了！")
      this.stopFishing();
      this.isLocked = false;
    }
  },
  addFishingGroundName(data){
    this.isLocked = true;
    // console.log('updateGroundName')
    this.$emit('addGroundName',{groundName: this.fishingGround.name , ...data});
  }
},
computed:{
  fishProbablilty(){
    const str = this.fishingGround.catchProbabilities.fish + "%";
    return str;
  },
  trashProbablilty(){
    const str = this.fishingGround.catchProbabilities.trash + "%";
    return str;
  },
  specialItemProbablilty(){
    const str = this.fishingGround.catchProbabilities.specialItem + "%";
    return str;
  },
},
}
</script>

<style>
.inner_content{
    display: flex;
    flex-direction: column;
    padding: 0%;
    margin: 0%;
    width:100%;
    height: 100%;
}
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(67,77,91);
    width: 100%;
    height: 2rem;
    box-sizing: border-box;
    padding-left:2rem;
    padding-right:2rem;
    border-radius: 0.1rem;

}
.header > .groundName{
    display: inline-flex;
    flex-direction: row;
    gap:0.75rem;
    font-size: 0.85rem;

    align-items: center;
}
.header > .groundInfo{
    display: inline-flex;
    flex-direction: row;
    gap:0.75rem;
    font-size: 0.75rem;
    justify-items: center;
    text-align: center;
    align-items: center;
}

.inner_content > .body{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 0%;
  margin: 0%;
  padding: 0%;
}

.inner_content > .body > .view_window{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  height: 18rem;
  gap: 0%;
  margin: 0%;
  padding: 1rem;
}

.inner_content > .body > .fishes{
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  gap: 0.2rem;
  padding: 1rem;
  box-sizing: border-box;
}

.fishInfo{
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
}

.icon{
  height: 2rem;
  width: 2rem;
}
</style>