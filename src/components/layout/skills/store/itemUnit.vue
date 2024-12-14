<template>
        <div class="itemUnit">
            <slot></slot>
            <div class="countPart"><slot name="count"></slot></div>
        </div>
        

</template>

<script>
export default {

}
</script>

<style scoped>

.itemUnit{
    z-index: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    background: radial-gradient(circle, rgb(100, 100, 100) 0%, rgb(66, 66, 66) 100%);
    cursor: pointer;
}

.itemUnit::after{
    content: '';
    z-index: -1;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    border: 0.15rem solid white;
    border-radius: 0.25rem;
    border-image: linear-gradient(to top right, rgb(60,60,60), rgb(220,220,220)) 1;
    background: radial-gradient(circle, rgb(100, 100, 100) 0%, rgb(66, 66, 66) 100%);
    mask: 
    linear-gradient(#fff, #fff) content-box, 
    linear-gradient(#fff, #fff) border-box;

}

.countPart{
    position: absolute;
    bottom: -0.6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: white;
    font-size: 0.65rem;
    line-height: 0.8rem;
    font-weight: 600;
    background-color: rgb(108,117,125);
    padding: 0 0.25rem;
    border-radius: 0.4rem;
 }
</style>