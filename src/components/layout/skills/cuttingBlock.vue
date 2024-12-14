<template>
  <basic-block class="cuttingblock"
    :side-color="'rgb(53,143,18)'"
  >
    <div class="treesContent">
                    <span :style="{fontSize:'0.7rem'}">砍伐</span>
                    <span :style="{fontSize:'0.9rem'}">{{ treeData.name }}</span>
                    <span :style="{fontSize:'0.7rem'}">{{ treeData.exp }} 技能经验值/{{ treeData.cutTime }}秒</span>
                    <span><img :src="treeData.icon"></span>
                    <basic-exp-bar
                    :bar-width="'90%'"
                    :bar-height="'1.5rem'"
                    :initial-pos="treeData.isActive ? '100%' :'0'"
                    :color-of-bar="'rgb(53,143,18)'"
                    ></basic-exp-bar>
                    <div class="mastery_part">
                        <div class="iconPart">
                            <img src="../../../assets/main/mastery_header.svg">
                            <span>{{ treeData.masteryLevel }}</span>
                        </div>
                        <div class="mastery_exp_info">
                            <span class="masteryExp">{{ treeData.masteryExp }}/{{ maxExp }}</span>
                            <basic-exp-bar
                                :bar-width="'100%'"
                                :initial-pos="masteryBarPercentage"
                            ></basic-exp-bar>
                        </div>
                    </div>
                </div>
  </basic-block>
</template>

<script>
import { useSkillStore } from '../../../stores/expPark';
import { computed } from 'vue';
export default {
  props:{
    treeData:{
      required:true,
    }
  },
  setup(props) {
    const SkillStore = useSkillStore();
    const maxExp = computed(() => SkillStore.getMaxExp(props.treeData.masteryLevel));
    const lastMaxExp = computed(() => SkillStore.getMaxExp(props.treeData.masteryLevel - 1));
    return{
      maxExp,
      lastMaxExp
    }
  },
  computed:{
    masteryBarPercentage(){
      return ((this.treeData.masteryExp - this.lastMaxExp) / (this.maxExp - this.lastMaxExp)) * 100 + '%';
    }
  }
}
</script>

<style scoped>

  .cuttingblock:hover{
    transform: translateY(-5px); 
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  }

  .cuttingblock:hover :deep(.inner_block) {
  background-color: rgb(45,82,35);

  
}

.treesContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 1rem;
    box-sizing: border-box;
}
.treesContent > span{
    margin: 0.2rem;
    font:bolder;
}
.mastery_part{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;  
    align-items: center;
    align-content: center;
    justify-items: center;
    text-align: center;
    margin-top:1rem;
}
.iconPart{
   display: flex;
   flex-direction: row;
   gap:0.2rem;
   margin: 0.3rem;
}
.mastery_part > .iconPart > img{
    height: 1.5rem;
    width: 1.5rem;
    
}
.mastery_part > .mastery_exp_info{
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;  
    align-items: center;
    padding:0px;
}
.masteryExp{
    font-size:0.75rem;
    margin-bottom:0.4rem;
}
img{
    height:4rem;
    width: 4rem;
}

</style>