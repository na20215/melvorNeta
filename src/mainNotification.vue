<template>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :style="notificationStyle"
      >
          
        <span class="addNum"><img :src="notification.imageUrl"> +{{notification.addCount}}</span> 
        <span class="totalNum">{{ notification.itemQuantity }}</span>
      </div>
  </template>
  
  <script>
  import { useWarehouseStore } from './stores/warehouse';
  
  export default {
    setup() {
      const notificationStore = useWarehouseStore();
      const notifications = notificationStore.notifications;
      return {
        notifications,
      };
    },
  
    computed: {
      notificationStyle() {
        return {

        };
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    display: flex;
    flex-direction: row;
    height: 1rem;
    min-width: 5rem;
    background-color: rgb(27, 32, 40);
    color: white;
    padding: 0.25rem;
    border-radius: 0.15rem;
    gap:1rem;
    align-items: center;
    justify-content: space-between;
    border: 0.1rem  solid rgb(27,158,19);
  }
  img{
    height: 1rem;
    width: 1rem;
  }
  .addNum{
    font-size: 0.6rem;
    color: rgb(40,138,104);
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .totalNum{
    font-size: 0.75rem;
    color: rgb(207,158,96);
  }

  </style>
  