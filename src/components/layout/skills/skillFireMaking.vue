<template>
  <div class="fireAMakingContent">
    <fire-making-block class="woodLighting">
        <div class="listOfLog">
            <fire-making-select-list
                :resource-list="getResource()"
                @selected-log="updateSelectedLog"
            ></fire-making-select-list>
        </div>
        <div class="FirstLane">
            <div class="currentLogIcon">
                <div class="img">
                    <img v-if="selectedLog.name!==''" :src="selectedLog.icon" >
                </div>
            </div>
            <div class="currentLogName"></div>
        </div>
        <div class="currentLogMasteryBar"></div>
        <div class="currentLogResource"></div>
        <div class="currentLogExp"></div>
        <div class="LogAction"></div>
    </fire-making-block>
    <fire-making-block class="bonefire" 
    :block-height="'20rem'"
    :inner-height="'99.25%'">
</fire-making-block>
  </div>
</template>

<script>
import fireMakingBlock from './fireMakingBlock.vue'
import FireMakingSelectList from './fireMakingSelectList.vue'
export default {
  components: { fireMakingBlock, FireMakingSelectList },
  data(){
    return{
        selectedLog:{
            name:'',
            icon:'',
        },
        logs: [
                {'普通原木':{
                    name:'普通原木',
                    icon: require('@/assets/bank/logs_normal.png'),
                    requirementLevel:1,
                    exp: 19,
                    burnTime: 2,
                    reward: '普通原木'    
                }},
                {'橡木':{
                    name:'橡木',
                    icon: require('@/assets/bank/logs_oak.png'),
                    requirementLevel:10,
                    exp: 39,
                    burnTime: 2,
                    reward: '橡木'    
                }},
                {'柳木':{
                    name:'柳木',
                    icon: require('@/assets/bank/logs_willow.png'),
                    requirementLevel:25,
                    exp: 52,
                    burnTime: 3,
                    reward: '柳木'    
                }},
                {'柚木':{
                    name:'柚木',
                    icon: require('@/assets/bank/logs_teak.png'),
                    requirementLevel:35,
                    exp: 84,
                    burnTime: 4,
                    reward: '柚木'    
                }},
                {'枫木':{
                    name:'枫木',
                    icon: require('@/assets/bank/logs_maple.png'),
                    requirementLevel:45,
                    exp: 104,
                    burnTime: 5,
                    reward: '枫木'    
                }},
                {'桃花芯木':{
                    name:'桃花芯木',
                    icon: require('@/assets/bank/logs_mahogany.png'),
                    requirementLevel:55,
                    exp: 130,
                    burnTime: 6,
                    reward: '桃花芯木'    
                }},
                {'紫衫木':{
                    name:'紫衫木',
                    icon: require('@/assets/bank/logs_yew.png'),
                    requirementLevel:60,
                    exp: 195,
                    burnTime: 7,
                    reward: '紫衫木'    
                }},
                {'云杉原木':{
                    name:'云杉原木',
                    icon: require('@/assets/bank/logs_spruce.png'),
                    requirementLevel:70,
                    exp: 292,
                    burnTime: 10,
                    reward: '云杉原木'    
                }},
                {'菩提原木':{
                    name:'菩提原木',
                    icon: require('@/assets/bank/logs_linden.png'),
                    requirementLevel:80,
                    exp: 364,
                    burnTime: 15,
                    reward: '菩提原木'    
                }},
                {'接骨木':{
                    name:'接骨木',
                    icon: require('@/assets/bank/logs_elderwood.png'),
                    requirementLevel:85,
                    exp: 583,
                    burnTime: 18,
                    reward: '接骨木'    
                }},
                {'红木':{
                    name:'红木',
                    icon: require('@/assets/bank/logs_redwood.png'),
                    requirementLevel:90,
                    exp: 770,
                    burnTime: 22,
                    reward: '红木'    
                }},
                {'魔法原木':{
                    name:'魔法原木',
                    icon: require('@/assets/bank/logs_magic.png'),
                    requirementLevel:95,
                    exp: 960,
                    burnTime: 25,
                    reward: '魔法原木'    
                }},
            ],
        }
    },
    methods: {
      getResource(){
        return this.logs.map(item => {
            const key = Object.keys(item)[0]; 
            return { name: item[key].name, icon:item[key].icon };
      });  
    },
    updateSelectedLog(data){
        this.selectedLog = data;
    }
    },
}
</script>

<style scoped>
.fireAMakingContent{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 2rem;
    justify-content: space-between;
    
}

.woodLighting{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}
.listOfLog{
    display: flex;
    flex-direction: row;
    width: 95%;
    height:4rem;
    background-color: rgb(52,60,74);
    border-radius: 0.5rem;
    justify-content: center;
    align-items: center;}

.FirstLane{
    display: flex;
    flex-direction: row;
    width: 95%;
    gap: 0.5rem;
    padding:0.5rem;

}
.currentLogIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(52,60,74);
    width: 30%;
    padding: 1.5rem;
    border-radius: 0.5rem;
}
.currentLogIcon > .img{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(45,53,66);
    width: 4rem;
    height:4rem;
    border-radius: 0.5rem;
}

.currentLogIcon > .img > img{
    width: 3rem;
    height:3rem;
}


.currentLogName{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(52,60,74);
    width: 70%;
    border-radius: 0.5rem;
}

.currentLogMasteryBar{
    display: flex;
    flex-direction: row;
    width: 95%;
    height:3rem;
    background-color: rgb(52,60,74);
    border-radius: 0.5rem;
    margin: 0.25rem;
    margin-top: 0;
}

.currentLogResource{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 95%;
    height:6rem;
    background-color: rgb(52,60,74);
    border-radius: 0.5rem;
    margin: 0.25rem;
}

.currentLogExp{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 95%;
    height:6rem;
    background-color: rgb(52,60,74);
    border-radius: 0.5rem;
    margin: 0.25rem;
}

.LogAction{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 95%;
    height:6rem;
    background-color: rgb(52,60,74);
    border-radius: 0.5rem;
    margin: 0.25rem;
}
.bonefire{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: space-between;
}
</style>