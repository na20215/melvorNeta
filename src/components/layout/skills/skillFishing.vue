<template>
<div class="fishingGrounds">
  <div class="helperSturcture" v-for="ground in fishingGrounds"
    :key="ground.name">
  <fishing-block 
  :fishing-ground="ground"
  :ground-is-worked="groundIsWorked"
  @stop-fishing="stopFishing"
  @add-ground-name="getFishingTarget">
  </fishing-block>
  </div>
</div>
</template>

<script>
import { levelList } from '../../../data/levelList.js';
import { fishingGrounds,junkPack,spicialPack } from '../../../data/skillFishing.js';
import { useSkillStore } from '../../../stores/expPark.js';
import { useWarehouseStore } from '../../../stores/warehouse.js';
import fishingBlock from './fishingBlock.vue';

export default {
  components: { fishingBlock },
  setup() {
    const WarehouseStore = useWarehouseStore();
    const SkillStore = useSkillStore();
    const cumutiveProbablity = WarehouseStore.checkCumulativeProbabilities;
    const addItem = WarehouseStore.addItem;
    const openChest = WarehouseStore.openChest;
    const addExp = SkillStore.addExp;
    const getMasteryExp = SkillStore.getMasteryExp;
    const addMasteryPool = SkillStore.addMasteryPoolExp;
    return{
      cumutiveProbablity,
      addItem,
      openChest,
      addExp,
      getMasteryExp,
      addMasteryPool,
      
    }
  },
    data() {
  return {
    timer:'',
    groundIsWorked:'',
    fishIsHunted:'',
    probabilityPool:[],
    fishingGrounds: fishingGrounds,
    junkPack:junkPack,
    spicialPack:spicialPack,
  };
},
methods: {
  packThePackage(ground,fish){
    const fishDetail = this.fishingGrounds[ground].fishInGround[fish];
    const rewardPackage = [fishDetail,this.junkPack,this.spicialPack];
    return rewardPackage;
     
  },
  getRandomFishInterval(min,max, randomValue){
    const fishInterval = (min + randomValue*(max - min)) * 1000;
    return fishInterval;
  },
  getFishingTarget(data){
    this.groundIsWorked = data['groundName'];
    this.fishIsHunted = data['fishName'];
  },
  stopFishing(){
    // console.log("stopfishing 在skillfishing触发了！")
    this.groundIsWorked ='';
    this.fishIsHunted='';
  },
  addMasteryExp(fish){
        fish.masteryExp += fish.addMasteryExp;
        if(fish.masteryExp >= levelList[fish.masteryLevel]){
          fish.masteryLevel++;
          const averageTime = (fish.maxTime + fish.minTime)/2;
          fish.addMasteryExp = Math.round(this.getMasteryExp(fish.masteryLevel,23,averageTime));
          fish.addMasteryPoolExp = Math.ceil(fish.addMasteryExp/4);
        }
    }
},
computed:{
  activeSkill() {
            const SkillStore = useSkillStore();
            return SkillStore.activeSkill;
    }
},

watch:{
  activeSkill(newVal){
            if(newVal !== '钓鱼'){
              this.stopFishing();
            }
        },
  groundIsWorked(newVal){ 
    if(newVal === '') return;
    const probabilityArr = Object.values(this.fishingGrounds[newVal].catchProbabilities)
    this.probabilityPool = probabilityArr;
  },
  fishIsHunted(){
    if(this.timer){
      clearInterval(this.timer);
      this.timer = null;
    }
    if(this.fishIsHunted === '') return;
    const SkillStore = useSkillStore();
    SkillStore.activeSkill = '钓鱼';
    const rewardPackage = this.packThePackage(this.groundIsWorked,this.fishIsHunted);
    let randomValue = Math.random();
    let timeThisRound = this.getRandomFishInterval(rewardPackage[0].minTime,rewardPackage[0].maxTime,randomValue);
    this.timer = setInterval(()=>{  
      randomValue = Math.random();
      timeThisRound = this.getRandomFishInterval(rewardPackage[0].minTime,rewardPackage[0].maxTime,randomValue);
      const RandThisRound = this.cumutiveProbablity(this.probabilityPool,randomValue);
      if(RandThisRound === 0){
        this.addItem(rewardPackage[0].name, rewardPackage[0].count);
        this.addExp('钓鱼',rewardPackage[0].exp);
        this.addMasteryExp(rewardPackage[0]);
        this.addMasteryPool('钓鱼',rewardPackage[0].addMasteryPoolExp)
      }else{
        this.openChest(rewardPackage[RandThisRound]);
      }
    },timeThisRound)
  }
}
}
</script>

<style scoped>
.fishingGrounds{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 1.5rem;
    width: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
}
.helperSturcture{
  display: flex;
  width: 48%;
}

</style>