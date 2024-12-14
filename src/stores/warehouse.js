import { defineStore } from 'pinia';
import { itemList } from '../data/itemList';

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    capacity: 20,
    coin: 0,
    slayerCoin: 0,
    items: new Map(),
    warehouseOrder: [],
    notifications: [],
  }),

  actions: {
    isWarehouseFull() {
      return this.items.size >= this.capacity;
    },

    // 显示通知
    addNotification(itemName, imageUrl, addCount, itemQuantity) {
      const existingNotification = this.notifications.find(notification => notification.itemName === itemName);
      if(existingNotification){
        clearTimeout(existingNotification.timer);
        existingNotification.addCount += addCount;
        existingNotification.itemQuantity = itemQuantity;
        existingNotification.timer = setTimeout(() => {
          this.removeNotification(existingNotification.id);
          console.log(`remove new El: ${this.notifications}`)
        }, 2000);
        return;
      }else{
        const notification = {
          itemName,
          imageUrl,
          addCount,
          itemQuantity,
          id: Date.now(),
          timer: null,
        };
        this.notifications.push(notification);
        // console.log(`add new El: ${this.notifications}`)
        notification.timer = setTimeout(() => {
          this.removeNotification(notification.id);
          // console.log(`remove new El: ${this.notifications}`)
        }, 2000);
      }  
    },

    removeNotification(id) {
      const index = this.notifications.findIndex(notification => notification.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    cumulativeSum(arr){
      let sum = 0;
      let newArr = [];
      for (let i = 0; i < arr.length; i++){
        sum += arr[i];
        newArr[i] = sum; 
      }
      return newArr;
    },
    checkProbability(probability){
      const randomValue = Math.random();
      return randomValue <= probability;
    },
    checkCumulativeProbabilities(probabilityArray,randomValue = Math.random()){
      const cumulativeArr = this.cumulativeSum(probabilityArray);
      for(let i =0; i < cumulativeArr.length; i++){
        if(randomValue * 100 < cumulativeArr[i]) return i;
      }
      return -1;
    },
    addItem(itemId, count) {
      const itemDetails = itemList[itemId];
      if (!itemDetails) {
        console.error('Item not found in item list:', itemId);
        return;
      }

      if (this.isWarehouseFull() && !this.items.has(itemId)) {
        console.log('Warehouse is full. Cannot add new item type.');
        return;
      }

      const currentItem = this.items.get(itemId);
      if (currentItem) {
        currentItem.quantity += count;
      } else {
        const newItem = { quantity: 0, ...itemDetails};
        newItem.quantity += count;
        console.log(itemId)
        this.warehouseOrder.push(itemId);
        this.items.set(itemId, newItem);
      }

      // 调用显示通知
      this.addNotification(itemDetails.name, itemDetails.imageUrl, count, this.items.get(itemId).quantity);
    },

    addAction(rewards){
      Object.keys(rewards).forEach(itemId => {
        const item = rewards[itemId];
        if(this.checkProbability(item.probability)){
          this.addItem(item.name,item.count);
        }
      })
    },

    openChest(chest){
      const probablityArr = chest.map(item => item['probability']);
      const itemId = this.checkCumulativeProbabilities(probablityArr);
      const item = chest[itemId];
      this.addItem(item.name,item.count)
    },

    deleteItem(itemId){
      this.items.delete(itemId);
      const index = this.warehouseOrder.indexOf(itemId);
      this.warehouseOrder.splice(index,1)
    },

    costItem(itemId, count) {
      const targetItem = this.items.get(itemId);
      if (targetItem.count < count) {
        console.log(`Action failed, the number of ${targetItem.name} is not enough`);
        return;
      }
      targetItem.count -= count;
      if (targetItem.count === 0) {
        this.deleteItem(itemId);
      }
    },

    getItemNumber(itemId) {
      const thisItem = this.items.get(itemId);
      return thisItem ? thisItem.count : 0;
    },
    addMoney(num){
      this.coin += num;
    }
  },
});
