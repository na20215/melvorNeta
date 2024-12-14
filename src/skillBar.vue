<template>
  <div class="skillBar">  
    <skill-bar-title></skill-bar-title>
    <div class="skillBarContent">
        <skill-bar-element
            :skill-name="'商店'"
            :icon-path="require(`./assets/main/shop_header.svg`)"
            :is-selected="SelectedSkill==='商店'"
            @switch-new-page="updateSkillPage"
        >
        <div class="coin"><img src="./assets/main/coins.svg" style="height: 0.85rem; width: 0.85rem;">{{coins}}</div>
        </skill-bar-element>
        <skill-bar-element
            :skill-name="'仓库'"
            :icon-path="require(`./assets/main/bank_header.svg`)"
            :is-selected="SelectedSkill==='仓库'"
            @switch-new-page="updateSkillPage"
        >
            <span :style="{ fontSize:'0.75rem'}">{{size}}/{{capacity}}</span>
        </skill-bar-element>
        <div class="subtitle">
            <span>战斗</span>
            <i :class="combatSkillsIsVisble ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="toggleCombatSkills" ></i>
        </div>
        <skill-bar-element
            :skill-name="'战斗等级'"
            :icon-path="require(`./assets/combat/combat.svg`)"
            :is-selected="SelectedSkill==='战斗等级'"
            @switch-new-page="updateSkillPage"
        >
        <template v-slot:middle>
            {{combatLevel}}
        </template>
        </skill-bar-element>
        <skill-bar-element :style="{display: combatSkillsIsVisble? 'flex' :'none'}"
            v-for="skill in combatSkills"
            :key="skill.name"
            :skill-name="skill.name"
            :icon-path="require(`${skill.imagePath}`)"
            :is-selected="SelectedSkill===skill.name"
            @switch-new-page="updateSkillPage"
        >        
        <template v-slot:middle>
            <span v-if="skill.name === '生命值'" style=" font-size:0.8rem; color:red;">(100)</span>
            <span v-else-if="skill.name === '屠杀者'" style=" font-size:0.8rem; color:green;">50</span>
        </template>
            <span :style="{ fontSize:'0.8rem'}">({{currentLevel(skill.name)}}/99)</span>
        </skill-bar-element>
        <div class="subtitle">
            <span>被动</span>
            <i :class="passiveSkillsIsVisble ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="togglePassiveSkills " ></i>
        </div>
        <skill-bar-element :style="{display: passiveSkillsIsVisble? 'flex' :'none'}"
        v-for="skill in passiveSkills"
            :key="skill.name"
            :skill-name="skill.name"
            :icon-path="require(`${skill.imagePath}`)"
            :is-selected="SelectedSkill===skill.name"
            @switch-new-page="updateSkillPage"
        >   
            <span :style="{ fontSize:'0.8rem'}">({{currentLevel(skill.name)}}/99)</span>
        </skill-bar-element>
        <div class="subtitle">
            <span>非战斗</span>
            <i :class="nonCombatSkillsIsVisble ? 'fas fa-eye' : 'fas fa-eye-slash'" @click="toggleNoncombatSkills"></i>
        </div>
        <skill-bar-element :style="{display: nonCombatSkillsIsVisble? 'flex' :'none'}"
        v-for="skill in noncombatSkills"
            :key="skill.name"
            :skill-name="skill.name"
            :icon-path="require(`${skill.imagePath}`)"
            :is-selected="SelectedSkill===skill.name"
            @switch-new-page="updateSkillPage"
        >
            <span :style="{ fontSize:'0.8rem'}">({{currentLevel(skill.name)}}/99)</span>
        </skill-bar-element>
        <div style="display: flex; margin-bottom: 10rem;"></div>
    </div>

</div>
</template>

<script>
import { useSkillStore } from './stores/expPark';
import { useWarehouseStore } from './stores/warehouse';
import skillBarElement from './components/layout/skillBarElement.vue';
import skillBarTitle from './components/layout/skillBarTitle.vue';
import { computed } from 'vue';
export default {
    components:{skillBarTitle, skillBarElement},
    setup() {
            const skillStore = useSkillStore();
            const warehouseStore = useWarehouseStore();
            const combatLevel = skillStore.calCombatLevel;
            const currentLevel = (skillName) => {
                    return skillStore.skills[skillName]?.level ?? 0;
            };
            const coins = computed(() =>warehouseStore.coin);
            const capacity = warehouseStore.capacity;
            const size = computed(() => warehouseStore.items.size);
             return {
                combatLevel,
                currentLevel,
                coins,
                capacity,
                size
            };
    },
    data() {
        return {
            SelectedSkill: '',
            combatSkillsIsVisble: true,
            passiveSkillsIsVisble: true,
            nonCombatSkillsIsVisble: true,
            store:{ name: "商店", imagePath: "./assets/attack/attack.svg" },
            warehouse:{ name: "仓库", imagePath: "./assets/strength/strength.svg" },
            combatSkills: [
            { name: "攻击", imagePath: "./assets/attack/attack.svg" },
            { name: "力量", imagePath: "./assets/strength/strength.svg" },
            { name: "防御", imagePath: "./assets/defence/defence.svg" },
            { name: "生命值", imagePath: "./assets/hitpoints/hitpoints.svg" },
            { name: "远程", imagePath: "./assets/ranged/ranged.svg" },
            { name: "魔法", imagePath: "./assets/magic/magic.svg" },
            { name: "祝祭", imagePath: "./assets/prayer/prayer.svg" },
            { name: "屠杀者", imagePath: "./assets/slayer/slayer.svg" }
            ],
            passiveSkills:[
            { name: "种地", imagePath: "./assets/farming/farming.svg" },
            { name: "城镇", imagePath: "./assets/township/township.svg" },
            ],
            noncombatSkills: [
            { name: "伐木", imagePath: "./assets/woodcutting/woodcutting.svg" },
            { name: "钓鱼", imagePath: "./assets/fishing/fishing.svg" },
            { name: "生火", imagePath: "./assets/firemaking/firemaking.svg" },
            { name: "烹饪", imagePath: "./assets/cooking/cooking.svg" },
            { name: "采矿", imagePath: "./assets/mining/mining.svg" },
            { name: "锻造", imagePath: "./assets/smithing/smithing.svg" },
            { name: "扒窃", imagePath: "./assets/thieving/thieving.svg" },
            { name: "弓匠", imagePath: "./assets/fletching/fletching.svg" },
            { name: "制造", imagePath: "./assets/crafting/crafting.svg" },
            { name: "符文锻造", imagePath: "./assets/runecrafting/runecrafting.svg" },
            { name: "草药学", imagePath: "./assets/herblore/herblore.svg" },
            { name: "敏捷训练", imagePath: "./assets/agility/agility.svg" },
            { name: "召唤", imagePath: "./assets/summoning/summoning.svg" },
            { name: "天文学", imagePath: "./assets/astrology/astrology.svg" },
            { name: "转换魔法", imagePath: "./assets/magic/magic.svg" }
            ]
        
        }
    },
    methods: {
        updateSkillPage(newSkillPage){
            this.SelectedSkill = newSkillPage.name;
            this.$emit('updatePage',{name: this.SelectedSkill});
        },
        toggleCombatSkills(){
            this.combatSkillsIsVisble= !this.combatSkillsIsVisble;
        },
        togglePassiveSkills(){
            this.passiveSkillsIsVisble= !this.passiveSkillsIsVisble;
        },
        
        toggleNoncombatSkills(){
            this.nonCombatSkillsIsVisble= !this.nonCombatSkillsIsVisble;
        },
    },
}
</script>

<style scoped>
    .skillBar{
        display: flex;
        flex-direction: column;
        width: 15%;
        height: 100%;
        background-color:rgb(35,42,53);
        padding: 0;
    }

    .skillBarContent{
        display: flex;
        flex-direction: column;
        overflow: auto;
        height: 100%;
        width: 100%;       
    }

    .coin{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 0.25rem;
        box-sizing: border-box;
        padding: 0.2rem;
        color: rgb(48,199,141);
        font-size: 0.75rem;
        background-color: rgb(52,58,64);
        border-radius: 0.2rem;
        height: 1rem;
    }

    /* 设置滚动条的宽度 */
.skillBarContent::-webkit-scrollbar {
    width: 0.5rem; /* 控制滚动条的宽度 */
    padding: 0.25rem;
}

/* 设置滚动条轨道的样式（背景） */
.skillBarContent::-webkit-scrollbar-track {
    background: transparent; /* 轨道背景透明 */
}

/* 设置滚动条滑块（滚动条本身）的样式 */
.skillBarContent::-webkit-scrollbar-thumb {
    background-color: rgba(169, 169, 169, 0.5);
    border-radius: 10px; /* 圆角效果 */
    border: 2px solid transparent;
}

/* 设置滚动条上下箭头的样式 */
.skillBarContent::-webkit-scrollbar-button {
    display: none;
}

.subtitle{
    display: flex;
    flex-direction: row;
    align-items: center;
    vertical-align: sub;
    gap: 0.75rem;
    width: 100%;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.6);
    padding:0.25rem 1.25rem;
    box-sizing: border-box;
    margin-top: 1.5rem;
}

i{
    display: flex;
    margin-top: 0.15rem;
    font-size: 0.75rem;
    color: white;
}


</style>