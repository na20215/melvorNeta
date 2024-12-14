<template>
    <div class="maintain">
    <div class="cuttingAction">
        <basic-block
        :side-color="'rgb(53,143,18)'">
            <div class="paddingbar"></div>
            <basic-exp-bar
                :bar-height="'2rem'"
                :bar-width="'95%'"
                :initial-pos="'0%'"
                :color-of-bar="'rgb(53,143,18)'"
                :animation-duration="`${Duration}s`"
                :is-animating="isAnimating"
            ></basic-exp-bar>
            <span v-show="isActived.length === 0" style="padding-top: 1rem;">这里将会显示关于你的伐木动作的信息</span>
            <div class="detail" v-show="isActived.length !== 0">
                <div
                v-for="(tree, idx) in isActived"
                :key="idx"
                class="outerEdge">
                    <div class="expPart">
                        <basic-info-block>
                            <img class="action" :src="tree.rewardIcon">
                            <template v-slot:count>
                                {{Object.values(tree.rewards)[0].count}}
                            </template>
                        </basic-info-block>
                        <basic-info-block>
                            <img class="action" src="../../../assets/main/mastery_header.svg">
                            <template v-slot:count>
                                {{tree.masteryGain}}
                            </template>
                        </basic-info-block>
                    </div>
                    <div class="masteryPart">
                        <basic-info-block>
                            <img class="action" src="../../../assets/main/xp.svg">
                            <template v-slot:count>
                                {{tree.exp}}
                            </template>
                        </basic-info-block>
                        <basic-info-block>
                            <img class="action" src="../../../assets/main/mastery_pool.svg">
                            <template v-slot:count>
                                {{tree.masteryPool}}
                            </template>
                        </basic-info-block>
                        <basic-info-block
                            :banner-color="'rgb(81,121,214)'">
                            <img class="action" src="../../../assets/main/timer.svg">
                            <template v-slot:count>
                                {{tree.cutTime}} 秒
                            </template>
                        </basic-info-block>
                    </div>
                </div>
            </div>
        <div class="paddingbar"></div>
        </basic-block>
    </div>
    <div class="trees">
        <div class="helperSturcture"
            v-for="tree in treesData"
            :key="tree.name"
            >
        <cutting-block v-if="skillInfo.level >= tree.unlockLevel" @click="switchActiveState(tree)"
            :tree-data="tree">   

        </cutting-block>
        <basic-block v-else
        :block-width="'100%'"
        :side-color="'rgb(229,103,103)'"
        :inner-height="'98%'"
        :block-height="'264.09px'">
            <span :style="{fontSize:'0.9rem'}">锁定</span>
            <img class="lockedTree" src="../../../assets/woodcutting/woodcutting.svg">
            <span  class="requiredInfo" :style="{fontSize:'0.8rem'}">等级 {{ tree.unlockLevel }}</span>
        </basic-block>
        </div>
    </div>
</div>
</template>

<script>
import BasicInfoBlock from '../basicInfoBlock.vue';
import cuttingBlock from './cuttingBlock.vue'
import BasicBlock from '../basicBlock.vue';
import { useWarehouseStore } from '../../../stores/warehouse.js';
import { useSkillStore } from '../../../stores/expPark.js'
import { treesData } from '../../../data/skillCutting.js';
import { levelList } from '../../../data/levelList.js';

export default {
  components: { cuttingBlock, BasicInfoBlock, BasicBlock },
    setup() {
        const WarehouseStore = useWarehouseStore();
        const SkillStore = useSkillStore();

        const skillInfo = SkillStore.skills['伐木'];
        const getMasteryExp = SkillStore.getMasteryExp;
        const getMaxExp = SkillStore.getMaxExp;
        const addAction = WarehouseStore.addAction;
        const addExp = SkillStore.addExp;
        const addMasteryPool = SkillStore.addMasteryPoolExp;
        return{
            getMasteryExp,
            getMaxExp,
            addAction,
            addExp,
            addMasteryPool,
            skillInfo,
        }
    },
    data() {
        return {
            isActived:[],
            isAnimating: false,
            timer:null,
            DoubleCutting: false,
            treesData: treesData,
        }
    },
    methods: {
        switchActiveState(tree){
            if(this.isActived.length < (this.DoubleCutting? 2 : 1) && tree.isActive === false){
                tree.isActive = true;
                const SkillStore = useSkillStore();
                SkillStore.activeSkill = '伐木';
                this.isActived.push({
                    masteryGain:Math.round(this.getMasteryExp(tree.masteryLevel,Object.keys(treesData).length,tree.cutTime)),
                    masteryPool:Math.ceil(this.getMasteryExp(tree.masteryLevel,Object.keys(treesData).length,tree.cutTime)/4),
                     ...tree});
                return
            }
            if(this.isActived.some(item => item.name === tree.name) && tree.isActive === true){
                tree.isActive = false;
                const index = this.isActived.findIndex(item => item.name === tree.name);
                this.isActived.splice(index,1);
                if(this.isActived.length === 1){
                    this.isActived[0] = {
                        masteryGain:Math.round(this.getMasteryExp(tree.masteryLevel,Object.keys(treesData).length,tree.cutTime)),
                        masteryPool:Math.ceil(this.getMasteryExp(tree.masteryLevel,Object.keys(treesData).length,tree.cutTime)/4),
                         ...Object.values(this.treesData).find(item => item.name === this.isActived[0].name)};
                }
                return
            }
        },
        setTheShorterTreeData(shorterTree, longerTreeCutTime,coefficient){
            shorterTree.cutTime = longerTreeCutTime;
            shorterTree.exp = Math.round(shorterTree.exp * coefficient);
            shorterTree.masteryGain = Math.round(shorterTree.masteryGain * coefficient)
            shorterTree.masteryPool = Math.ceil(shorterTree.masteryPool * coefficient)
            const theCount = Object.values(shorterTree.rewards)[0].count
            Object.values(shorterTree.rewards)[0].count = Math.round(theCount * coefficient);
        },
        addMasteryExp(treeName){
            const targetTree = this.treesData[treeName];
            // console.log(` 看看输出了啥${addExpValue}`)
            const addExpValue = this.isActived.find(item => item.name === treeName);
            targetTree.masteryExp += Math.round(addExpValue.masteryGain);
            if(targetTree.masteryExp >= levelList[targetTree.masteryLevel]){
                targetTree.masteryLevel++;
                addExpValue.masteryGain = Math.round(this.getMasteryExp(targetTree.masteryLevel,Object.keys(treesData).length,targetTree.cutTime));
                addExpValue.masteryPool = Math.ceil(this.getMasteryExp(targetTree.masteryLevel,Object.keys(treesData).length,targetTree.cutTime)/4);
            }
        }
    },
    computed: {
        isActivedLength(){
            return this.isActived.length;
        },
        Duration(){
            return this.isActived[0]?.cutTime * 0.9998;
        },
        activeSkill() {
            const SkillStore = useSkillStore();
            return SkillStore.activeSkill;
    }
    },
    watch:{
        activeSkill(newVal){
            if(newVal !== '伐木'){
                this.isActived = [];
                for (let treeKey in treesData) {
                    treesData[treeKey].isActive = false;
                }
            }
        },
        isActivedLength(newValue){
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.isAnimating = false;
                        this.timer = null;
                    }
                    if (newValue === 0) return;
                    if (newValue === 1) {
                        setTimeout(() => {
                        this.isAnimating = true;
                        }, 0)

                        this.timer = setInterval(() =>{    
                            this.isAnimating = true;
                            this.addAction(this.isActived[0].rewards);
                            this.addExp('伐木',this.isActived[0].exp);
                            this.addMasteryExp(this.isActived[0].name);
                            this.addMasteryPool('伐木',this.isActived[0].masteryPool)
                        }, this.isActived[0].cutTime * 1000)
                    }
                    if (newValue === 2) {
                        const [tree1,tree2] = this.isActived;
                        const shorterTree = tree1.cutTime < tree2.cutTime ? tree1 : tree2;
                        const longerTree = tree1.cutTime > tree2.cutTime ? tree1 : tree2;
                        const coefficient = longerTree.cutTime/shorterTree.cutTime;
                        this.setTheShorterTreeData(shorterTree, longerTree.cutTime, coefficient); 

                        this.timer = setInterval(() =>{
                            this.addAction(shorterTree.rewards);
                            this.addExp('伐木',shorterTree.exp);
                            this.addMasteryExp(shorterTree.masteryGain);
                            this.addMasteryPool('伐木',shorterTree.masteryPool)
                            this.addAction(longerTree.rewards);
                            this.addExp('伐木',longerTree.exp);
                            this.addMasteryExp(longerTree.masteryGain);
                            this.addMasteryPool('伐木',longerTree.masteryPool)
                        }, this.isActived[0].cutTime * 1000)
                    }    
            },
    }
    
}
</script>

<style scoped>
.maintain{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
.cuttingAction{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 20%;
  gap: 2rem; 
  padding: 2rem;
  box-sizing: border-box;
}
.paddingbar{
    min-height: 2rem;
}
.detail{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 2rem;
    gap: 2rem;
}
.outerEdge{
    display: flex;
    flex-direction: row;
}
.expPart{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 1rem;
    gap: 1rem;
}
.masteryPart{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 1rem;
    gap: 1rem;
}
.action{
    height: 2rem;
    width: 2rem;
}
.trees{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 2rem;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
}
.helperSturcture{
    display: flex;
    width: 23%;
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

.lockedTree{
    margin: 1rem;
}

.requiredInfo{
    background-color: rgb(229,103,103);
    line-height: 1rem;
    width: 80%;
    text-align: center;
    border-radius: 0.5rem;
}


</style>
