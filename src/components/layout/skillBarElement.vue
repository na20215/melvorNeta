<template>
    <div class="skillelement" @click="switchSkillPage" >
        <span class="content" :style="{ color: isSelected? 'rgb(48,199,141)': 'rgb(255,255,255)'}">
            <img :src="iconPath">
            {{ skillName }} <slot name="middle"></slot></span>
            <slot></slot>
        
    </div>
</template>

<script>
export default {
    props:{
        skillName:{
            type:String,
            required:true,
        },
        iconPath:{
            type:String,
            required:true,
        },
        isSelected:{
            type:Boolean,
            required:true,
        },
    },
    methods: {
        switchSkillPage(){
            const combatSkills = ["战斗等级","攻击","力量","防御","生命值","远程","魔法","祝祭","屠杀者"];
            if (combatSkills.includes(this.skillName)) {
                this.$emit('switchNewPage', {name: '战斗'});
            }else{
                this.$emit('switchNewPage',{name: this.skillName});
            }
        }
    },

        
    
}
</script>

<style scoped>
.skillelement{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding:0.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
}
.skillelement:hover{
    background-color:rgb(45,53,66);
}
.skillelement > span{
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    margin:0;
    padding:0;
    padding-inline: 0;
    margin-inline: 0;
}
.skillelement > span > img{
    display: flex;
    margin:0.15rem;
    margin-right: 0.5rem;
    height: 1.75rem;
    width: 1.75rem;
}

.content{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>