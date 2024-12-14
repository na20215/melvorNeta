<template>
    <basic-block 
        :side-color="'rgb(180,102,36)'"
        :block-width="'49%'"
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
            default:'37rem',
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
