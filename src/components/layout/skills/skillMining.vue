<template>
    <div class="ores">
        <mining-block
            v-for="ore in ores"
            :key="ore.name"
            :inner-height="'99%'">   
                <div class="oresContent">
                    <span :style="{fontSize:'0.7rem'}">采矿</span>
                    <span :style="{fontSize:'0.9rem'}">{{ ore.name }}</span>
                    <span :style="{fontSize:'0.7rem'}">{{ ore.Exp }} 技能经验值/{{ ore.time }}秒</span>
                    <span><img v-if="ore.health" :src="ore.icon">
                          <img v-else src="../../../assets/mining/rock_empty.svg">
                    </span>
                    <basic-exp-bar
                    :bar-width="'90%'"
                    :bar-height="'1.5rem'"
                    :initial-pos="'0%'"
                    ></basic-exp-bar>
                    <div class="mastery_part">
                        <div class="iconPart">
                            <img src="../../../assets/main/mastery_header.svg">
                            <span>1</span>
                        </div>
                        <div class="mastery_exp_info">
                            <span :style="{fontSize:'0.75rem',marginBottom:'0.4rem'}">0/1000</span>
                            <basic-exp-bar
                                :bar-width="'100%'"
                                :initial-pos="'0%'"
                            ></basic-exp-bar>
                        </div>
                    </div>
                </div>
            </mining-block>
    </div>
</template>

<script>
import miningBlock from './miningBlock.vue'
export default {
  components: { miningBlock },
    data(){
        return{
            ores:{
            '铜矿':{
                name:'铜矿',
                icon:require('@/assets/mining/rock_copper.svg'),
                level:1,
                health:10,
                timeRespawn:5,
                time:3,
                Exp:7,
                reward:'铜矿石',
            },
            '锡矿':{
                name:'锡矿',
                icon:require('@/assets/mining/rock_tin.svg'),
                level:1,
                health:10,
                timeRespawn:5,
                time:3,
                Exp:7,
                reward:'锡矿石',
            },
            '铁矿':{
                name:'铁矿',
                icon:require('@/assets/mining/rock_iron.svg'),
                level:15,
                health:10,
                timeRespawn:10,
                time:3,
                Exp:14,
                reward:'铁矿石',
            },
            '煤矿':{
                name:'煤矿',
                icon:require('@/assets/mining/rock_coal.svg'),
                level:30,
                health:10,
                timeRespawn:10,
                time:3,
                Exp:18,
                reward:'煤',
            },
            '银矿':{
                name:'银矿',
                icon:require('@/assets/mining/rock_silver.svg'),
                level:30,
                health:10,
                timeRespawn:15,
                time:3,
                Exp:25,
                reward:'银矿石',
            },
            '金矿':{
                name:'金矿',
                icon:require('@/assets/mining/rock_gold.svg'),
                level:40,
                health:10,
                timeRespawn:15,
                time:3,
                Exp:28,
                reward:'金矿石',
            },
            '秘银矿':{
                name:'秘银矿',
                icon:require('@/assets/mining/rock_mithril.svg'),
                level:50,
                health:10,
                timeRespawn:20,
                time:3,
                Exp:65,
                reward:'秘银矿石',
            },
            '精金矿':{
                name:'精金矿',
                icon:require('@/assets/mining/rock_adamantite.svg'),
                level:70,
                health:10,
                timeRespawn:30,
                time:3,
                Exp:71,
                reward:'精金石',
            },
            '符文矿':{
                name:'符文矿',
                icon:require('@/assets/mining/rock_runite.svg'),
                level:80,
                health:10,
                timeRespawn:60,
                time:3,
                Exp:86,
                reward:'符文矿石',
            },
            '龙岩矿':{
                name:'龙岩矿',
                icon:require('@/assets/mining/rock_dragonite.svg'),
                level:95,
                health:10,
                timeRespawn:120,
                time:3,
                Exp:101,
                reward:'龙岩矿石',
            },
            }
        }
    }
}
</script>

<style scoped>
.ores{
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;
}
.oresContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 2rem;
    padding-bottom: 1rem;
    width:100%;
    gap: 0.5rem;
}

.oresContent img{
    height: 4rem;
    width: 4rem;
}
.mastery_part{
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.mastery_part > .iconPart{
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    justify-content: center;
    align-items: center;
    width:12%;
}
.mastery_part > .mastery_exp_info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:70%;
}
.mastery_part img{
    height: 1.5rem;
    width: 1.5rem;
    
}
</style>