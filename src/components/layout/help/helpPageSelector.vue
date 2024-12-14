<template>
  <cutting-help-page v-if="skillName==='伐木'"></cutting-help-page>
  <fishing-help-page v-if="skillName==='钓鱼'"></fishing-help-page>
  <fire-making-help-page v-if="skillName==='生火'"></fire-making-help-page>
  <cooking-help-page v-if="skillName==='烹饪'"></cooking-help-page>
  <mining-help-page v-if="skillName==='采矿'"></mining-help-page>
  <smithing-help-page v-if="skillName==='锻造'"></smithing-help-page>
  <farming-help-page v-if="skillName==='种地'"></farming-help-page>
</template>

<script>
import CookingHelpPage from './cookingHelpPage.vue'
import cuttingHelpPage from './cuttingHelpPage.vue'
import FarmingHelpPage from './farmingHelpPage.vue'
import FireMakingHelpPage from './fireMakingHelpPage.vue'
import FishingHelpPage from './fishingHelpPage.vue'
import miningHelpPage from './miningHelpPage.vue'
import SmithingHelpPage from './smithingHelpPage.vue'

export default {
  components: { cuttingHelpPage, FishingHelpPage, FireMakingHelpPage, CookingHelpPage, SmithingHelpPage, miningHelpPage, FarmingHelpPage},
props:{
    skillName:{
        type:String,
        require:true,
    },
}
}
</script>

<style scoped>
</style>