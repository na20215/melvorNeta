<template>
    <div class="dropdown" @mouseleave="isDropdownOpen = false">
      <div class="selected-option" @mouseenter="isDropdownOpen = true">
        <img v-if="selectedOption" :src="selectedOptionIcon">{{ selectedOption || '请选择一个选项' }}
      </div>
      <transition name="fade">
        <ul v-if="isDropdownOpen" class="dropdown-menu">
          <li 
            v-for="option in resourceList" 
            :key="option.name" 
            @click="selectOption(option)"
            >
            <img :src="option.icon">
            <span>{{ option.name }}</span>
          </li>
        </ul>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props:{
        resourceList:{
            type:Array,
            Required:true,
        }     
    },
    data() {
      return {
        selectedOption: null,
        selectedOptionIcon: null,
        isDropdownOpen: false,
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option.name;
        this.selectedOptionIcon = option.icon;
        this.isDropdownOpen = false;
        this.$emit('selected-log', {name:option.name,icon:option.icon})
      },
    },
  };
  </script>
  
  <style scoped>
  .dropdown {
    position: relative;
    width: 12.5rem;
    cursor: pointer;
    background-color: rgb(52,60,74);
    border: 0.1rem solid rgb(35,42,53);
    border-radius: 0.5rem;
  }

  .dropdown:hover {
    position: relative;
    width: 12.5rem;
    cursor: pointer;
    background-color: rgb(45,53,66);
  }
  
  .selected-option {
    display: flex;
    gap:0.5rem;
    align-items: center;
    padding: 0.5rem;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .dropdown-menu li {
    display: flex;
    padding: 0.5rem;
    transition: background-color 0.3s;
    background-color: rgb(52,60,74);
    gap:0.5rem;
    align-items: center;
  }
  
  .dropdown-menu li:hover {
    background-color: rgb(45, 53, 66);
  }

  img{
    height: 1.2rem;
    width: 1.2rem;
  }
  span{
    font-size: 0.75rem;
  }

  .fade-enter-active, .fade-leave-active {
  transition: all 0.1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
  </style>
  