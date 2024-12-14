<template>
    <basic-block 
        :side-color="'rgb(105,105,111)'"
        :block-width="'99%'"
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
            default:'30rem',
        },
        innerHeight:{
            type:String,
            required:false,
            default:'99%',
        }
    }
}
</script>

<style scoped>

</style>
