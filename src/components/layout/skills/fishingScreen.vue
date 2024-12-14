<template>

  <span v-if= "selectedFish ===''">这里将会显示这个鱼池里要钓的鱼的信息</span>
  <div v-else class="screen">
    <img class="logo" :src="selectedFish.icon">
    <span>{{ selectedFish.name }}</span> 
    <div class="expPart">
        <basic-info-block>
            <img class="action" src="../../../assets/main/xp.svg">
                <template v-slot:count>
                    {{selectedFish.exp}}
                </template>
        </basic-info-block>
        <basic-info-block>
            <img class="action" src="../../../assets/main/mastery_header.svg">
                <template v-slot:count>
                    {{selectedFish.addMasteryExp}}
                </template>
        </basic-info-block>
        <basic-info-block>
            <img class="action" src="../../../assets/main/mastery_pool.svg">
                <template v-slot:count>
                    {{selectedFish.addMasteryPoolExp}}
                </template>
        </basic-info-block>
    </div>
    <p style="font-size: 0.85rem;">钓鱼时间：{{ selectedFish.minTime }} - {{ selectedFish.maxTime }}秒</p>
    <div class="masteryPart">
        <div class="iconPart">
            <img class="masteryIcon" src="../../../assets/main/mastery_header.svg">
            <div class="masteryLevel">{{ selectedFish.masteryLevel }}</div>
        </div>
        <div class="processBarPart">
            <div class="textPart">{{ selectedFish.masteryExp }}/{{maxExp}}</div>
            <basic-exp-bar 
            :bar-width="'90%'"
            :bar-height="'0.3rem'"
            :initial-pos="masteryBarPercentage">
            </basic-exp-bar>
        </div>
    </div>
    <div class="startButton" v-if="!isActived" @click="updateFishName">开始钓鱼</div>
    <div class="stopButton" v-else @click="stopWorking">结束钓鱼</div>
  </div>
</template>

<script>
import { computed } from 'vue';
import basicInfoBlock from '../basicInfoBlock.vue';

import { fishingGrounds } from '../../../data/skillFishing';
import { useSkillStore } from '../../../stores/expPark';
import BasicExpBar from '../BasicExpBar.vue';
export default {
    components:{basicInfoBlock, BasicExpBar},

    props:{
        selectedFish:{
            required:true,
            default:'',
        },
        fishGround:{
            required:true,

        },
        groundIsWorked:{
            required:true,
        }
    },
    setup(props) {
        const SkillStore = useSkillStore();
        const getMasteryExp = SkillStore.getMasteryExp;
        const maxExp = computed(() => SkillStore.getMaxExp(props.selectedFish.masteryLevel));
        const lastMaxExp = computed(() => SkillStore.getMaxExp(props.selectedFish.masteryLevel - 1));
        return{
            getMasteryExp,
            maxExp,
            lastMaxExp
        }
    },
    data(){
        return{
            isActived:false,
        };
        
    },
    methods:{
        updateFishName(){
            this.isActived = true;
            this.$emit('updateFishName', {fishName: this.selectedFish.name});
        },
        stopWorking(){
            this.isActived = false;
            this.$emit('stopWorking')
        }
    },
    computed:{
        theFish(){
            return  fishingGrounds[this.fishGround].fishInGround[this.selectedFish.name]
        },
        masteryBarPercentage(){
            return ((this.selectedFish.masteryExp - this.lastMaxExp) / (this.maxExp - this.lastMaxExp)) * 100 + '%';
        }
    },
    watch:{
        selectedFish(){
            this.isActived = false;
            const averageTime = (this.theFish.maxTime + this.theFish.minTime)/2;
            this.theFish.addMasteryExp = Math.round(this.getMasteryExp(this.theFish.masteryLevel,23,averageTime));
            this.theFish.addMasteryPoolExp = Math.ceil(this.theFish.addMasteryExp/4);
        },
        groundIsWorked(newVal){ 
        if (this.fishGround !== newVal){
            this.isActived = false;
        }
     }

    }

    
}
</script>

<style scoped>
    .screen{
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .expPart{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        width: 50%;
        
    }
    .masteryPart{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2rem;
        padding: 0.5rem 0;
        box-sizing: border-box;
    }
    .iconPart{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 10%;
    }
    .masteryIcon{
        height: 1rem;
        width: 1rem;
    }
    .masteryLevel{
        font-size: 1rem;
        font-weight: 700;
    }
    .processBarPart{
        display: flex;
        flex-direction: column;
        width: 90%;
        height: 2rem;
        gap: 0.4rem;
        align-items: center;
    }
    .textPart{
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 0.7rem;
    }
    .action{
        height: 1.5rem;
        width: 1.5rem;
    }
    .logo{
        position: absolute;
        left: 1rem;
        top: 1rem;
        height: 2rem;
        width: 2rem;
    }
    .startButton{
        margin:0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 0.85rem;
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
        border-radius: 0.25rem;
        width:4.5rem;
        height: 2rem;
        background-color: rgb(92,172,229);
        cursor: pointer;
        transform: all 0.2s ease;
    }
    .startButton:hover{
        background-color: rgb(59,155,224);
    }
    .stopButton{
        margin:0.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 0.85rem;
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
        border-radius: 0.25rem;
        width:4.5rem;
        height: 2rem;
        background-color: rgb(223,70,70);
        cursor: pointer;
        }
</style>