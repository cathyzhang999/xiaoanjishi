<template>
  <Top :addr="address" />
  <div class="wrapper">
    <PurchaseList />
  </div>
  <Bottom :totalPrice="caculations.sumPrice" />
  <!-- <Mask v-if="confirmSubmit"/> -->
</template>

<script>
import { useRoute } from "vue-router";
import { commonCartEffect } from "../../effect/cartEffects"
import { get } from "../../utils/request";


import Bottom from "./Bottom.vue";
import Top from "./Top";
import PurchaseList from "./PurchaseList";
import { ref } from 'vue';

const handleAddressEffect=()=>{
    const address=ref({})
    const getAddress=async ()=>{
        try{        
            const result=await get("api/user/address")
            if(result.errno==0&&result?.data){
                address.value=result.data[0]
            }        
         }catch(ex){
        console.log(ex)
        }    
    }
    getAddress()    
    return{getAddress,address}
}
// const summaryPrice=()=>{
//     const store=useStore();
//     const route=useRoute()
//     const shopId=route.params.id;
// }

export default {
    name: "OrderByShop",
    components: { Top, Bottom,PurchaseList},
    setup() {
        const route=useRoute()
        const shopId=route.params.id;
        const { cartList, caculations } = commonCartEffect(shopId);   
        const {getAddress,address} =   handleAddressEffect() 
        return { cartList, caculations,getAddress,address };
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
  z-index: 9;
  position: absolute;
  top: 1.76rem;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  overflow-y: scroll;
  padding: 0.18rem 0.18rem 0 0.18rem;
  background: #f5f5f5;
}
</style>
