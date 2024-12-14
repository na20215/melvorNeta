<template>
  <div class="basicUnit">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.basicUnit{
    display: flex;
    flex-direction: row; 
    background-color: rgb(35,42,53);
    border: 0.14rem solid rgb(33,37,43);
    box-sizing: border-box;
    border-radius: 0.2rem;
    gap:1rem;
    padding: 0.75rem;
    cursor: pointer;
}

.basicUnit:hover {
  transform: translateY(-2%); 
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  background-color: rgb(45,82,35);
}
</style>