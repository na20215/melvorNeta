<template>
  <div class="maintitle">
    <base-title
      :skill-name="skillName"
    ></base-title>
    <div v-if="!firstFilter.includes(skillName)">
      <experience-block
        :skill-name="skillName"
      ></experience-block>
      <mastery-block v-if="skillName!=='转换魔法'"
        :skill-name="skillName"
      ></mastery-block>
    </div>
  </div>
  
</template>

<script>
import baseTitle from './baseTitle.vue';
import ExperienceBlock from './experienceBlock.vue';
import MasteryBlock from './masteryBlock.vue';
export default {
  components:{baseTitle, ExperienceBlock, MasteryBlock},
  props:{
    skillName:{
      type:String,
      require:true,
    },
    isVisble:{
        type:Boolean,
        require:true,
    },
  },
  data() {
    return {
      firstFilter: ['战斗','商店','仓库']
    }
  },
  methods: {
    updateState(){
        this.$emit('updateState2',!this.isVisble);
    }
  },
}
</script>

<style scoped>
.maintitle{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    background-color: rgb(35,42,53);
}





</style>