<template>
    <!-- <div class="top">
        <div class="iconfont top__backIcon" @click="handleBackClick">&#xe602;</div>
        <div class="top__title">管理收货地址</div>
        
            <div class="top__btn" @click="rightBtnClick">新建</div>
        
    </div> -->
    <AddressTop btnName="新建" title="管理收货地址" @btn-click="rightBtnClick" @back-click="handleBackClick"/>
    <AddressList />
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

export default {
    name: "MyAddress",
    components:{AddressTop,AddressList},
    setup() {        
        // const { addressList } = addreeDataEffect();
        const {handleBackClick,rightBtnClick,gotoModify}=pageSkipEffect()       
        return { handleBackClick,rightBtnClick,gotoModify};
    }
};

</script>

<style lang="scss" scoped>

</style>
