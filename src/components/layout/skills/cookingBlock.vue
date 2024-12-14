<template>
    <basic-block 
        :side-color="'rgb(194,182,184)'"
        :block-width="'33%'"
        :block-height="blockHeight"
        :inner-height="innerHeight"
        >
        <slot></slot>
    </basic-block>
</template>

<script>
export default {
    props:{
        blockHeight:{
            type:String,
            required:false,
            default:'45rem',
        },
        innerHeight:{
            type:String,
            required:false,
            default:'99.5%',
        }
    }
}
</script>

<style scoped>

</style>
