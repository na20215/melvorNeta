<template>  
        <div class="masteryBlock">
            <div class="masteryinfo">
                <img src="../../assets/main/mastery_pool.svg">
                <div class="masteryBar">
                    <div class="mastery_exp_bar"> 
                        <div class="mastery_exp_bar_value" :style="{width:masteryPoolPercentage}"></div>    
                    </div>
                    <span style="font-size: 0.8rem;">{{currentskill.masteryPool}}/{{currentskill.masteryPoolMax}}({{masteryPoolPercentage}})经验</span>
                </div>
            </div>
            <div class="masteryButtonPart">
                <span @click="something" class="bubble" :style="{background:'rgb(92,172,229)'}">查看熟练度</span>
                <span @click="something" class="bubble">花费熟练度经验</span>
            </div>
        </div>
</template>

<script>
import { useSkillStore } from '../../stores/expPark';
import { computed } from 'vue';
export default {

props:{
    skillName:{
        type:String,
        require:true,
    }
 },
 setup(props) {
    const skillStore = useSkillStore();
    const currentskill = computed(() => skillStore.skills[props.skillName]);
    return {
      currentskill,
    };
  },
  computed:{
    masteryPoolPercentage(){
        const result = (this.currentskill.masteryPool/this.currentskill.masteryPoolMax * 100).toFixed(2) + '%';
        return result;
    }
  }
}
</script>

<style scoped>
.masteryBlock{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
}

.masteryinfo{
    display: flex;
    flex-direction: row;
    width:60%;
    align-items: center;
    margin: 1rem;
    
}
.masteryBar{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.mastery_exp_bar {
  height: 0.3rem;
  width: 100%;
  border-radius: 1rem;
  background: white;
}

.mastery_exp_bar_value {
  background-color: rgb(229,174,103);
  border-radius: 1rem;
  height: 100%;
}

.masteryExp{
font-size:0.75rem;
}

img{
  height: 2rem;
  width: 2rem;
  margin-right:1rem;

}
.masteryButtonPart{
    width: 15%;
    text-align: center;
    align-content: center;
    
}
.bubble{
 display: inline-block;
 font-size:0.75rem;
 background-color:rgb(48,199,141);
 border-radius: 0.25rem;
 padding:0.3rem;
 margin-left: 1rem;
 
}
</style>