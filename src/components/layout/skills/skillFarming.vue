<template>
   <div class="header">
        <farming-block
        v-for="(category,idx) in skillCategories"
        :key="idx"
        :width="'30%'">
            <div class="iconAndCategory">
            <img class="headerIcon" :src="category.icon">
                <div class="categoryDetail">
                    <div>{{ category.name }}</div>
                    <div>{{ category.describe }}</div>
                </div>
            </div>
        </farming-block>
   </div>
   <div class="mainContent"></div>
</template>

<script>
import farmingBlock from './farmingBlock.vue'
export default {
  components: { farmingBlock },
    data(){
        return{
            skillCategories:[
                {
                    name:'农作物',
                    describe:'粮食作物。',
                    numSlot:'19',
                    icon:require('@/assets/bank/tomato.png')
                },
                {
                    name:'草药',
                    describe:'药水的基础材料',
                    numSlot:'16',
                    icon:require('@/assets/bank/herb_barrentoe.png')
                },
                {
                    name:'树木',
                    describe:'极佳的农业经验值来源',
                    numSlot:'6',
                    icon:require('@/assets/woodcutting/oak_tree.svg')
                },
            ],

        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 10rem;
    background-color: rgba(0,0,0,0);
}

.iconAndCategory{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 2rem;
}
.iconAndCategory > .headerIcon{
    width: 3rem;
    height: 3rem;
}

.categoryDetail{
    display: flex;
    flex-direction: column;

}
</style>