<template>
    <div class="exp_block">
        <basic-exp-bar
            :bar-width="'100%'"
            :initial-pos="processBar"
        ></basic-exp-bar>
        <div class="level_info">
            <div :style="{margin:'0.5rem'}">
                <span :style="{margin:'0.5rem'}">技能等级</span>
                <span class="bubble"> {{ currentskill.level }}/99 </span>
            </div>
            <div :style="{margin:'0.5rem'}">
                <span :style="{margin:'0.5rem'}">技能经验值</span>
                <span class="bubble" :style="{backgroundColor: 'rgb(92,172,229)'}"> {{ currentskill.exp }}/{{ maxExp }} </span>
            </div>
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
    const lastMaxExp = computed(() => skillStore.getMaxExp(currentskill.value.level - 1));
    const maxExp = computed(() => skillStore.getMaxExp(currentskill.value.level));

    return {
      currentskill,
      maxExp,
      lastMaxExp
    };
  },
  computed:{
    processBar(){
        return `${(this.currentskill.exp - this.lastMaxExp)/(this.maxExp - this.lastMaxExp)* 100}%`
    }
  }
}
</script>

<style scoped>
.exp_block{
    display: flex;
    flex-direction: column;
    width:100%;
}
.exp_bar{
    display: flex;
    width: 100%;
    height: 0.5rem;
    border-radius: 1rem;
    background-color: rgb(45,53,66);
}

.exp_bar_value{
    display: flex;
    width: 50%;
    height: 0.5rem;
    border-radius: 1rem;
    background-color: rgb(92,172,229);
}

.level_info{
    display:flex;
     flex-direction:row;
     justify-content:space-evenly;
}

.bubble{
 display: inline-block;
 font-size:0.75rem;
 background-color:rgb(48,199,141);
 border-radius: 0.25rem;
 padding:0.2rem;
}
</style>