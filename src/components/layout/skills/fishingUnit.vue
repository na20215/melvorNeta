<template>
  <div class="fishingUnit">
    <basic-unit  @click="update">
      <slot></slot>
    </basic-unit>
  </div>
</template>

<script>
export default {
  props: {
    fishName: {
    type: String,
    required: true
  },
},
  data(){
    return{
  }
  },
  methods: {
    update(){
      this.$emit('updateSelected',this.fishName)
    }
  },

}
</script>

<style>
    .fishingUnit :deep(.basicUnit){
        width: 100%;
        cursor: pointer;
    }


</style>