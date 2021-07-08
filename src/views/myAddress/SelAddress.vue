<template>
    <AddressTop btnName="新建" title="管理收货地址" @btn-click="rightBtnClick" @back-click="handleBackClick"/>
    <AddressList @selAddr="selAddrClick($event)"/>
</template>

<script>
import { useRouter } from 'vue-router';
import AddressTop from './AddressTop'
import AddressList from './AddressList'
const pageSkipEffect=()=>{
    const router=useRouter()
    const handleBackClick=()=>{
            router.back();
        }
    const rightBtnClick=()=>{
        router.push({name:'CreateAddress'})
    }
    return{handleBackClick,rightBtnClick}
}
const selectAddrEffect=()=>{
    const router=useRouter()
    const selAddrClick=(id)=>{
        router.push({
                   path:'/orders',
                   query:{
                      moneys:this.moneys,
                   }
                });
        router.back()
        const addressId=id
        return addressId
    }
    return{selAddrClick}
}
export default {
    name: "SelAddress",
    components:{AddressTop,AddressList},
    setup() {        
        // const { addressList } = addreeDataEffect();
        const {handleBackClick,rightBtnClick,gotoModify}=pageSkipEffect()
        const {selAddrClick}=selectAddrEffect()   
        return { handleBackClick,rightBtnClick,gotoModify,selAddrClick};
    }
};

</script>

<style lang="scss" scoped>

</style>
