<template>
    <div class="maincontent">
        <main-title
            :skill-name="skillName"
        ></main-title>
        <span v-if="skillName==='商店'">商店</span>
        <store-the-warehouse v-if="skillName==='仓库'"></store-the-warehouse>
        <span v-if="skillName==='战斗'">战斗</span>

        <skill-farming v-if="skillName==='种地'"></skill-farming>
        <span v-if="skillName==='城镇'">城镇</span>

        <skill-cutting v-show="skillName==='伐木'"></skill-cutting>
        <skill-fishing v-show="skillName==='钓鱼'"></skill-fishing>
        <skill-fire-making v-show="skillName==='生火'"></skill-fire-making>
        <skill-cooking v-show="skillName==='烹饪'"></skill-cooking>
        <skill-mining v-show="skillName==='采矿'"></skill-mining>
        <skill-smithing v-show="skillName==='锻造'"></skill-smithing>
        <span v-if="skillName==='扒窃'">扒窃</span>
        <span v-if="skillName==='弓匠'">弓匠</span>
        <span v-if="skillName==='制造'">制造</span>
        <span v-if="skillName==='符文锻造'">符文锻造</span>
        <span v-if="skillName==='草药学'">草药学</span>
        <span v-if="skillName==='敏捷训练'">敏捷训练</span>
        <span v-if="skillName==='召唤'">召唤</span>
        <span v-if="skillName==='天文学'">天文学</span>
        <span v-if="skillName==='转换魔法'">转换魔法</span>
        <div :style="{margin:'10rem'}"></div>
    </div>

</template>

<script>
import mainTitle from './components/layout/mainTitle.vue'
import SkillCooking from './components/layout/skills/skillCooking.vue'
import SkillCutting from './components/layout/skills/skillCutting.vue'
import SkillFireMaking from './components/layout/skills/skillFireMaking.vue'
import SkillFishing from './components/layout/skills/skillFishing.vue'
import SkillMining from './components/layout/skills/skillMining.vue'
import SkillSmithing from './components/layout/skills/skillSmithing.vue'
import SkillFarming from './components/layout/skills/skillFarming.vue'
import StoreTheWarehouse from './components/layout/skills/store/storeTheWarehouse.vue'
export default {
  components: { mainTitle, StoreTheWarehouse, SkillCutting, SkillFishing, SkillFireMaking, SkillCooking,
     SkillMining, SkillSmithing, SkillFarming},
  props:{
    skillName:{
        type:String,
        require:true,
    },
    isVisble:{
        type:Boolean,  
        require:true,
    }
  },
  methods: {
    
  },
  watch:{
    skillName(){
        console.log(this.skillName)
    }
  }

}
</script>

<style scoped>
    .maincontent{
        display: flex;
        flex-direction: column;
        width: 85%;
        height: 100%;
        overflow: auto;
    }
    .maincontent::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('./assets/main/background.jpg');
    background-size: cover;
    background-attachment: fixed;
    filter: brightness(0.4);
    z-index: -1;
    }

</style>