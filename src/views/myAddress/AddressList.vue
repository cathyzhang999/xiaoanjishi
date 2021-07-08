<template>
    <div class="myAddress">
        <div class="myAddress__title">
            我的收货地址
        </div>
        <div class="myAddress__item" v-for="item in addressList" :key="item._id" >            
            <div class="myAddress__content"  @click="()=>{selectAddrClick(item._id)}">
                <div class="myAddress__content__person">
                    <div class="myAddress__item__name">{{item.name}}</div>
                    <div class="myAddress__item__phone"> {{item.phone}}</div>
                </div>
                <div class="myAddress__content__address">
                    {{item.city}}市{{item.department}} {{ item.houseNumber}}
                </div>
            </div>
            
            <router-link :to="`/myAddress/modify/:${item._id}`">
            <div class="iconfont myAddress__nextIcon">&#xe603;</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import {get} from "../../utils/request";
import { reactive, toRefs } from 'vue';

const addreeDataEffect = () => {
    const adrList=reactive({addressList:[]})
    const getAddressList = async () => {
        try {
            const result = await get("api/user/address");
            // console.log(result);
            if(result.errno==0&& result?.data?.length){
                adrList.addressList=result.data
            }
        }catch(e){
            console.log('fail')
        }        
    };
    getAddressList();
    const {addressList}=toRefs(adrList)
    return { addressList};    
};


export default {
    name: "AddressList",
    methods:{
        selectAddrClick(id){
            this.$emit('selAddr',id)
        }
    },
    setup() {        
        const { addressList } = addreeDataEffect();              
        return { addressList};
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";

.myAddress {
    position: absolute;
    top: 0.44rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: $input-bgcolor;
    overflow-y: scroll;
    a{
            text-decoration: none;
        }
    &__title {
        height: 0.48rem;
        line-height: 0.48rem;
        font-size: 0.14rem;
        color: #333333;
        margin-left: 0.18rem;
    }
    &__item {
        display: flex;
        align-items:center;
        justify-content:space-between;
        height: 1.04rem;
        margin: 0 0.18rem 0.16rem 0.18rem;
        background: #ffffff;
        border-radius: 0.04rem;
        padding: 0.18rem 0.16rem;
        box-sizing: border-box;
        &__name{
        width: .94rem;
    }
  
    }
    &__content {
        margin-right: 0.3rem;
        // flex-flow:1;
        &__person {
            display:flex;
            font-size: 0.14rem;
            color: #999999;
            height: 0.2rem;
            line-height: 0.2rem;
            margin-bottom: 0.08rem;
        }
        &__address {
            font-size: 14px;
            color: #333333;
            height: 0.4rem;
            line-height: 0.2rem;
        }
    }    
    &__nextIcon {
        align-items: right;
        width:.08rem;
    }
}
</style>