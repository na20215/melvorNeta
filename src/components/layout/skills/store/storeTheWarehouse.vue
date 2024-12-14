<template>
  <div class="warehouseContent">
    <basic-block class="guideBar"
       :side-color="'rgb(181,126,59)'" 
        :block-height="'6rem'"
        :innerHeight="'96%'"
    >
        <div class="modePart">
            <div class="sellMode" @click="switchToSellMode">出售模式</div>
            <div class="moveMode" @click="switchToMovingMode">移动模式</div>
        </div>
        <div class="wrap">
        <input class="searchBar" type="text" placeholder="请输入物品名称" v-model="searchBarContent">
        <div class="clearSearch" @click="additem('普通原木',10)">X</div>
        <div class="clearSearch" @click="additem('橡木',5)">A</div>
        <div class="clearSearch" @click="additem('柳木',3)">B</div>
        </div>
    </basic-block>
    <div v-show="mode === 'sellMode'"
        class="sellModeInfo"
    >
    <div class="SdescribePart">现在是出售模式，点击下方仓库物品选中，点击确认售出全部卖出！</div>
        <div class="actionPart">
            <div class="sellMode" @click="comfirmSell">确认出售</div>
            <div> 已选中{{ sellList.size }}种物品
                <div v-show="sellList.size !== 0">
                    售价：
                    <img src="../../../../assets/main/coins.svg" style="height: 1rem; width: 1rem;">
                    {{ sellListWorth }}
                </div>
            </div>
        </div>    
    </div>
    <div v-show="mode === 'movingMode'" 
       class="movingModeInfo"
    >
    <div class="MdescribePart">现在是移动模式，点击下方仓库物品选中，并在下方选择想要移动到的仓库，点击确认全部移动到指定仓库！</div>
        <div class="actionPart">
            <div class="moveMode">目标仓库</div>
            <div class="moveMode" style="background-color: rgb(74,115,212);">确认移动</div>
            <div>已选中{{ movingList.size }}种物品</div>
        </div>
    </div>
    <div class="content">
        <div class="helperclass">
            <div class="categoriesBar"></div>
            <div class="categoriesAndItems">
                <div class="warehouseInfo"></div>
                <div class="warehouse">
                    <item-unit
                        v-for="(key,idx) in warehouseOrder"
                        :key="key"
                        draggable="true"
                        @dragstart="getDragedItemId(key,idx)"
                        @dragover="getcurrentOverItemId(key,idx)"
                        @click="selected(key)"
                        :class="{
                            'isSelected': selectedItem === key,
                            'prepareToSell': sellList.has(key),
                            'prepareToMove': movingList.has(key),
                        }"
                    >   <img class="iconInWarehouse" :src="items.get(key).imageUrl">
                        <template v-slot:count>
                            {{items.get(key).quantity}}
                        </template>
                    </item-unit>
                </div>
            </div>
        </div>
        <div class="itemInfomation">
            <div class="detailGuideBar">
                <div class="itemIcon" :class="{'actived': detailGuideBar === 'icon'}" @click="guideBarSelection('icon')">
                    <img :src="itemInfo.imageUrl" style="width: 1.5rem; height: 1.5rem;">
                </div>
                
                <div class="itemStatic" :class="{'actived': detailGuideBar === 'detail'}" @click="guideBarSelection('detail')">
                    <img src='../../../../assets/main/statistics_header.svg' style="width: 1.5rem; height: 1.5rem;">
                </div>
            </div>
            <div class="itemInfomationContent">
                <div class="empty" v-show="selectedItem === ''">
                    <div>未选择物品</div>
                </div>
                <div class="itemDetail" v-if="selectedItem !== ''">
                    <div class="iconAndInfo">
                        <div class="Icon">
                            <img class="displayPicture" :src="`${items.get(selectedItem).imageUrl}`">
                            <div class="itemNumber">{{ items.get(selectedItem).quantity }}</div>
                        </div>
                        <div class="Info">
                            <div class="name">{{ items.get(selectedItem).name }}</div>
                            <div class="description">这里应该是描述</div>
                            <div class="dataCheck"></div>
                        </div>
                    </div>
                    <div class="optionPart">
                        <div class="upgradePart"></div>
                        <div class="EquipmentPart">
                            <div class="ammoPart"></div>
                        </div>
                        <div class="foodPart"></div>
                    </div>
                    <div class="sellPart">
                        <div class="upperTitle">
                            <div style="font-size: 0.75rem;">出售物品</div>
                            <div class="money">
                                <img src="../../../../assets/main/coins.svg" style="height: 1rem; width: 1rem;">
                                {{ items.get(selectedItem).value }} 
                            </div>
                        </div>
                        <div class="slidebar">
                            <div class="minAndMax">
                                <div class="minAndMaxValue">1</div>
                                <div class="minAndMaxValue">{{items.get(selectedItem).quantity}}</div>
                            </div>
                            <input type="range" min="1" max="100" value="1" step="1">
                        </div>
                        <div class="inputPart"></div>
                        <div class="clickButton"></div>
                        <div class="bottomTitle">
                            <img src="../../../../assets/main/coins.svg" style="height: 1rem; width: 1rem;">
                            {{ sellListWorth }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import basicBlock from '../../basicBlock.vue'
import ItemUnit from './itemUnit.vue';
import { useWarehouseStore } from '../../../../stores/warehouse';
import { computed } from 'vue';
export default {
    components: { basicBlock, ItemUnit },
    setup() {
        const store = useWarehouseStore();
        const items = computed(() => store.items); 
        const warehouseOrder = store.warehouseOrder;
        
        store.warehouseOrder;
        const additem = store.addItem;
        const deleteItem = store.deleteItem;
        const addMoney = store.addMoney;
        return{
            items,
            warehouseOrder,
            additem,
            deleteItem,
            addMoney,
        };
    },
    data() {
        return {
            searchBarContent:'',
            selectedItem: '',
            draggingItemInfo: [],
            targetItemInfo: [],
            sellList: new Set(),
            sellListWorth: 0,
            movingList:new Set(),
            mode:'normalMode',
            detailGuideBar:'icon',
        }
    },
    methods: {
        clearSearchBarContent(){
            this.searchBarContent = '';
        },
        // addthisItem(item,count){
        //     this.additem(item,count);
        //     console.log(this.warehouseOrder);
        //     console.log(this.items.get(this.warehouseOrder[0]))
        // },
        getDragedItemId(key,idx){
            this.draggingItemInfo = [idx,key];
        },
        getcurrentOverItemId(key,idx){
            if(key !== this.draggingItemInfo[1]){
                this.targetItemInfo = [idx,key];
                this.warehouseOrder.splice(this.draggingItemInfo[0],1);
                this.warehouseOrder.splice(idx,0,this.draggingItemInfo[1]);
                this.draggingItemInfo[0] = idx
               
            }
            
        },
        switchToSellMode(){
            if(this.mode !== 'sellMode'){
                this.mode = 'sellMode'
                this.movingList = new Set();
                this.selectedItem = '';
            }else{
                this.mode = 'normalMode'
                this.sellList = new Set()
                this.sellListWorth = 0;
            }
        },
        comfirmSell(){
            if(this.sellList.size !== 0){
                this.sellList.forEach(item => {
                const theItem = this.items.get(item);
                this.addMoney(theItem.quantity * theItem.value)
                this.deleteItem(item);
            })
            this.sellList = new Set();
            this.sellListWorth = 0;
            this.mode = 'normalMode';
            }
            
        },

        switchToMovingMode(){
            if(this.mode !== 'movingMode'){
                this.mode = 'movingMode'
                this.sellList = new Set()
                this.selectedItem = ''
            }else{
                this.mode = 'normalMode'
                this.movingList = new Set();
            }

        },


        selected(item){
            if(this.mode === 'normalMode'){
                if(this.selectedItem !== item){
                    this.selectedItem = item;
                }else{
                    this.selectedItem = '';
                }
            }
            if(this.mode === 'sellMode'){
                if(this.sellList.has(item)){
                    this.sellList.delete(item)
                    const removedItem = this.items.get(item);
                    this.sellListWorth -= removedItem.quantity * removedItem.value;

                }else{
                    this.sellList.add(item);
                    const addedItem = this.items.get(item);
                    this.sellListWorth += addedItem.quantity * addedItem.value;
                }
            }
            if(this.mode === 'movingMode'){
                if(this.movingList.has(item)){
                    this.movingList.delete(item)
                }else{
                    this.movingList.add(item);
                }
            }
        },
        guideBarSelection(info){
            this.detailGuideBar = info;
        }
    },
    computed:{
        itemInfo(){
            if(this.selectedItem !== ''){
                return this.items.get(this.selectedItem);
            }else{
                return {name: 'unselected',imageUrl: require('@/assets/main/question.svg')};
            }
            
        }
    }
}
</script>

<style scoped>
.warehouseContent{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 2rem;
    width: 100%;
    height: 100%;
    gap:1rem;
}
.guideBar{
    width: 100%;
    
}

.guideBar :deep(.inner_block){
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem;
    width: 100%;
}
.modePart{
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}

.sellMode{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.25rem;
    background-color: rgb(229,103,103);
    cursor:pointer;
}
.moveMode{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border-radius: 0.25rem;
    background-color: rgb(108,117,125);
    cursor:pointer;
}
.wrap{
    display: flex;
    flex-direction: row;
    height: 2.5rem;
    width: 40rem;
    gap:0;
}

.searchBar{
    all: unset;
    line-height: 2.5rem;
    padding: 0rem 0.4rem;
    width: 93.75%;
    border: 0.1rem solid white;
    border-radius: 0.25rem 0 0 0.25rem;
    transition: all 0.2s ease; 
}


.searchBar:focus{
    box-shadow: 0 0 0 0.25rem rgb(46, 61, 94);
}

.clearSearch{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    height: 100%;
    width: 6.25%;
    background-color: rgb(229,103,103);
    transform: translateX(-0.1rem);
    border-radius: 0 0.25rem 0.25rem 0; 
    cursor: pointer;
    transition: all 0.2s ease; 
}
.clearSearch:hover{
    background-color: rgb(223,70,70);
}
.clearSearch:focus{
    box-shadow: 0 0 0 0.25rem rgb(134,64,89);
}
.sellModeInfo{
    display:flex;
    flex-direction:column;
    border-radius: 0.25rem 0.25rem 0 0;
    height: 15rem;
    width: 100%;
    background-color: rgb(35,42,53);
    box-sizing: border-box;
}
.SdescribePart{
    display: flex;
    width: 100%;
    flex:1;
    border-radius: 0.25rem 0.25rem 0 0;
    align-items: center;
    color: rgb(119,54,54);
    font-weight: 300;
    padding: 0 1rem;    
    background-color: rgb(250,225,225);
    box-sizing: border-box;
}
.movingModeInfo{
    display:flex;
    flex-direction:column;
    border-radius: 0.25rem 0.25rem 0 0;
    height: 15rem;
    width: 100%;
    background-color: rgb(35,42,53);
    box-sizing: border-box;
}
.MdescribePart{
    display: flex;
    width: 100%;
    flex:1;
    border-radius: 0.25rem 0.25rem 0 0;
    align-items: center;
    color: rgb(56,61,65);
    font-weight: 300;
    padding: 0 1rem;
    background-color: rgb(226,227,229);
    box-sizing: border-box;
}

.actionPart{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    flex:2;
    box-sizing: border-box;
    padding: 0 1rem;
    gap:2rem;
}
.content{
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0.5rem;
    height: 60rem;
    padding: 0.5rem 0 ;
}
.helperclass{
    display: flex;
    flex: 2;
    flex-direction: column;
}
.categoriesBar{
    z-index: 2;
    display: grid;
    position: sticky;
    top: 0;
    height: 4rem;
    background-color: rgb(55,62,73);
}
.categoriesAndItems{
    display: flex;
    flex-direction: column;;
    background-color: rgb(35,42,53);

}

.warehouseInfo{
    display: flex;
    width: 100%;
    height: 2.5rem;
    background-color: rgb(52,58,64);
}
.warehouse{
    display: grid;
    min-height: 20rem;
    box-sizing: border-box;
    padding: 1.5rem 1rem;
    grid-template-columns: repeat(auto-fill,minmax(3rem, 1fr));
    grid-auto-rows: 3rem;
    gap: 1rem;
}
.isSelected::after {
    z-index: -1;
    border: 0.25rem solid rgb(70,195,123);
    border-radius: 0;
}
.prepareToSell::after{
    z-index: -1;
    border: 0.25rem solid rgb(243,183,96);
    border-radius: 0;
}
.prepareToMove::after{
    z-index: -1;
    border: 0.25rem solid rgb(92,172,229);
    border-radius: 0;
}
.iconInWarehouse{
    height: 1.75rem;
    width: 1.75rem;
}

.itemInfomation{
    display: flex;
    top: 0;
    flex: 1;
    flex-direction: column;
    height: 100%;
    background-color: rgb(35,42,53);
}
.detailGuideBar{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    background-color: rgb(55,62,73);
}
.itemInfomationContent{
    display: flex;
    flex: 20;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    gap:0.25rem;
}
.empty{
    width: 100%;
    height: 2.5rem;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    background-color: rgb(52,60,74);
}
.itemIcon{
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding:0.75rem;
    width: 3.5rem;
    height: 100%;
    cursor: pointer;
}
.itemStatic{
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding:0.75rem;
    width: 3.5rem;
    height: 100%;
    cursor: pointer;
}
.actived{
    background-color: rgb(45,53,66);
}
.itemDetail{
    display: flex;
    flex-direction: column;
    gap:0.25rem;
}
.iconAndInfo{
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    gap: 0.5rem;
    height: 10rem;
    width: 100%;
}
.Icon{
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0.25rem;
    height: 100%;
    width: 10rem;
    background-color: rgb(52,60,74);
}
.displayPicture{
    position: absolute;
    height: 8rem;
    width: 8rem;
}
.itemNumber{
    position: absolute;
    z-index: 2;
    border-radius: 0.5rem;
    padding:0 0.4rem;
    background-color: grey;
    font-size: 0.75rem;
    margin-bottom: -8rem;
}
.Info{
    display: flex;
    flex-direction: column;
    border-radius: 0.25rem;
    height: 100%;
    width: 20rem;
    background-color: rgb(52,60,74);
    box-sizing:border-box;
    padding: 0.75rem;
    gap:0.5rem;
}
.name{
    font-size: 1rem;
    font-weight:1200;
}
.description{
    font-size: 0.85rem;
    color: rgb(70,192,123);
}
.dataCheck{
    color: lightblue;
}
/* .optionPart{

}
.upgradePart{

}
.EquipmentPart{

}
.ammoPart{

}
.foodPart{

}*/

.sellPart{
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 0.25rem;
    height: 15rem;
    width: 100%;
    background-color: rgb(52,60,74);
    border-radius: 0.25rem;
}

.upperTitle{
    display: flex;
    flex: 3;
    flex-direction: row;
    background-color: rgb(67,77,91);
    width: 100%;
    height: 2rem;
    border-radius: 0.25rem 0.25rem 0 0;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 0.5rem;
    align-items: center;
}

.slidebar{
    display: flex;
    flex: 9;
    flex-direction: column;
    width: 95%;
    transform: translateX(2.5%);
    gap: 0.75rem;
    margin-top: 1rem;
    
}
.minAndMax{
    display: flex;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 0.9rem;
    font-weight: 500;
}
.minAndMaxValue{
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 0.25rem;
    padding:0 0.25rem;
}

.inputPart{
    display: flex;
    flex-direction: row;
    flex: 6;
}

.clickButton{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 4;
}

.bottomTitle{
    display: flex;
    flex: 3;
    border-radius: 0.25rem;
    flex-direction: row;
    background-color: rgb(67,77,91);
    width: 100%;
    height: 2rem;
    align-items: center;
    justify-content: center;
    gap:0.25rem;
}
.money{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:0.25rem;
    font-size: 0.9rem;
}
</style>