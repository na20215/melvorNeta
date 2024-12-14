<template>
        <div class="exp_bar" :style="{width:barWidth, height:barHeight}"> 
            <div    
                class="exp_bar_value" 
                :style="{
                    width:initialPos,
                    backgroundColor:colorOfBar,
                    animationDuration:animationDuration,
                }"
                :class="{'animate': isAnimating}"></div>    
        </div>
</template>

<script>
export default {
    props:{
        barWidth:{
            type:String,
            required:true,
        },
        barHeight:{
            type:String,
            required:false, 
            default:'0.5rem',
        },
        initialPos:{
            type:String,
            required:false,  
            default:'0%'    
        },
        colorOfBar:{
            type:String,
            required:false,
            default:'rgb(92,172,229)',
        },
        animationDuration: {
            type: String,
            required: false,
            default: '5s',
            },
        isAnimating: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
}
</script>

<style scoped>
.exp_bar{
    display: flex;
    width: 100%;
    border-radius: 0.2rem;
    background-color: rgb(45,53,66);
    
}

.exp_bar_value{
    display: flex;
    height: 100%;
    border-radius: 0.2rem;
    background-color: rgb(92,172,229);
}

.animate {
  animation-name: processingBar;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes processingBar {
    from { width: 0% }
    to { width: 100% }
}
</style>