<template>
    <div class="title" :style="{backgroundColor: backgroundColor}">
      <div :style="{display:'flex',flexDirection:'row',alignItems:'center'}">
        <div class="IconBackground" @click="open"><img :src="skillIconPath"></div>
        <span>{{ skillName }}</span>
      </div>
    </div>
</template>

<script>
import { inject } from "vue";
export default {
    setup(){
        const state = inject('state');
        const open = () => {
            state.isVisble = true;
            state.overlays = true;
        }
        return{state, open}
    },
    props:{
    skillName:{
      type:String,
      required:true,
    },
    
  },

    data() {
        return {
          skillIconPath:require('@/assets/woodcutting/woodcutting.svg'),
          backgroundColor:'rgb(53,143,18)',
          skillData: {
            '商店': {
                backgroundColor: 'rgb(254,187,51)',
                icon: require('@/assets/main/shop_header.svg'),
            },
            '仓库': {
                backgroundColor: 'rgb(181,126,59)',
                icon: require('@/assets/main/bank_header.svg'),
            },
            '战斗': {
                backgroundColor: 'rgb(164,164,169)',
                icon: require('@/assets/main/combat_header.svg'),
            },
            '种地': {
                backgroundColor: 'rgb(171,146,26)',
                icon: require('@/assets/farming/farming.svg'),
            },
            '城镇': {
                backgroundColor: 'rgb(101,131,138)',
                icon: require('@/assets/township/township.svg'),
            },
            '伐木': {
                backgroundColor: 'rgb(53,143,18)',
                icon: require('@/assets/woodcutting/woodcutting.svg'),
            },
            '钓鱼': {
                backgroundColor: 'rgb(146,208,241)',
                icon: require('@/assets/fishing/fishing.svg'),
            },
            '生火': {
                backgroundColor: 'rgb(180,102,36)',
                icon: require('@/assets/firemaking/firemaking.svg'),
            },
            '烹饪': {
                backgroundColor: 'rgb(194,182,184)',
                icon: require('@/assets/cooking/cooking.svg'),
            },
            '采矿': {
                backgroundColor: 'rgb(149,133,122)',
                icon: require('@/assets/mining/mining.svg'),
            },
            '锻造': {
                backgroundColor: 'rgb(105,105,111)',
                icon: require('@/assets/smithing/smithing.svg'),
            },
            '扒窃': {
                backgroundColor: 'rgb(131,127,115)',
                icon: require('@/assets/thieving/thieving.svg'),
            },
            '弓匠': {
                backgroundColor: 'rgb(232,113,113)',
                icon: require('@/assets/fletching/fletching.svg'),
            },
            '制造': {
                backgroundColor: 'rgb(148,118,80)',
                icon: require('@/assets/crafting/crafting.svg'),
            },
            '符文锻造': {
                backgroundColor: 'rgb(210,178,166)',
                icon: require('@/assets/runecrafting/runecrafting.svg'),
            },
            '草药学': {
                backgroundColor: 'rgb(69,192,148)',
                icon: require('@/assets/herblore/herblore.svg'),
            },
            '敏捷训练': {
                backgroundColor: 'rgb(44,135,250)',
                icon: require('@/assets/agility/agility.svg'),
            },
            '召唤': {
                backgroundColor: 'rgb(129,135,138)',
                icon: require('@/assets/summoning/summoning.svg'),
            },
            '天文学': {
                backgroundColor: 'rgb(117,186,230)',
                icon: require('@/assets/astrology/astrology.svg'),
            },
            '转换魔法': {
                backgroundColor: 'rgb(141,123,202)',
                icon: require('@/assets/magic/magic.svg'),
            },
        },
        }
    },
    watch:{
      skillName(newskill){
      this.backgroundColor = this.skillData[newskill].backgroundColor;
      this.skillIconPath = this.skillData[newskill].icon;
      }
    },
    methods: {

    },
}
</script>

<style scoped>

.title{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5rem;

}

.IconBackground{
  background-color: white;
  height: 3rem;
  width: 3rem;
  margin: 2rem;
  margin-right:1rem;
  align-content: center;
  text-align: center;
  border-radius: 0.5rem;
  cursor: pointer;
}
.IconBackground > img{
  height: 2rem;
  width: 2rem;
}
</style>