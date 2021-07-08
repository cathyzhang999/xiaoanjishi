<template>
    <div class="footer">
        <p class="footer__text">
            <span>实付金额</span>
            <span class="footer__text__totalPrice">¥{{ totalPrice }}</span>
        </p>
        <button class="footer__btn" @click="()=>{submitOrderClick(true)}">提交订单</button>
    </div>
    <div class="mask" v-if="confirmSubmit" @click="()=>{submitOrderClick(false)}">
        <div class="popup" @click.stop>
            <p class="popup__title">确认要离开收银台？</p>
            <p class="popup__prompt">请尽快完成支付，否则将被取消</p>
            <div class="popup__btn">
                <button class="popup__btn__cancle" @click="()=>handleConfirmPay(true)">
                    取消订单
                </button>
                <button class="popup__btn__confirm" @click="()=>handleConfirmPay(false)">
                    确认支付
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref,reactive, watchEffect } from "vue";
import { toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex';
import { post,get } from "../../utils/request.js";
import { commonCartEffect } from "../../effect/cartEffects";
import { userEffect } from "../../effect/userEffect"

const handleSubmitEffect = () => {
    const confirmSubmit = ref(false);
    const submitOrderClick = (isShow) => {
        confirmSubmit.value = isShow;
    };
    return { submitOrderClick, confirmSubmit,};
};

const handlePayEffect = () => {
    const route = useRoute();
    const shopId = route.params.id;
    const router = useRouter();
    const store=useStore()
    const { caculations } = commonCartEffect(shopId);
    // const {address}=userEffect()
    const adrList = reactive({ addressList: [] })
    // const addressList=ref([])
    const addressId=ref('')
    const getAddressList = async () => {
        const index=0
        try {
            const result = await get("api/user/address");
            // console.log(result);
            if (result.errno == 0 && result?.data?.length) {
                addressId.value = result.data[index]._id
                // adrList.addressList=result.data  
            }
        } catch (e) {
            console.log(e)
        }
    };
    watchEffect(()=>{
        getAddressList();
    })    
    // const { addressList } = toRefs(adrList)
    // const addressId=addressList[0]._id;
    // console.log(addressList[0])
    // const { addressList }=userEffect()
    const handleConfirmPay = async (isCanceled) =>  {   
        const purchases = [];
        const purchaseList=caculations.value.purchaseList        
        // const addressId=addressList[0]._id
        // console.log(addressId)        
        for (let key in purchaseList) {
            const goods = purchaseList[key];                     
            purchases.push({ id: goods._id , num: goods.count });
        }        
        try {
            const result = await post("/api/order", {
                addressId:addressId.value,
                shopId,
                shopName: caculations.value.shopName,
                isCanceled,
                goods:purchases
            });
            // console.log(caculations.value.shopName)
            if (result?.errno === 0) {                
                router.push({ name: "Order" });
                store.commit("handleClearCart",{shopId}) ;
            } else {
                console.log(result)
                // showToast("create order fail");
            }
        } catch (e) {
            console.log(e)
            // showToast("request fail");
        }
    };
    const handleCanclePay=()=>{
        confirmSubmit.value = false;
    }
    return { handleConfirmPay,handleCanclePay };
};
export default {
    name: "Bottom",
    props: ["totalPrice"],
    setup() {
        // const { addressList }=userEffect()
        const {
            submitOrderClick,
            confirmSubmit,
            cancleSumbmitClick
        } = handleSubmitEffect();
        const { handleConfirmPay } = handlePayEffect();        
        return {
            submitOrderClick,
            confirmSubmit,
            cancleSumbmitClick,
            handleConfirmPay,
            
        };
    }
};
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.5rem;
    background: white;
    &__text {
        flex: 1;
        height: 0.5rem;
        line-height: 0.5rem;
        margin-left: 0.24rem;
        font-size: 0.14rem;
        &__totalPrice {
            margin-left: 0.07rem;
        }
    }
    &__btn {
        margin-right: 0;
        width: 0.98rem;
        height: 0.5rem;
        background: #4fb0f9;
        border: none;
        color: white;
        font-size: 0.14rem;
    }
}
.mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
}
.popup {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 1.57rem;
    width: 3.01rem;
    background: #ffffff;
    border-radius: 0.04rem;
    &__title {
        font-size: 0.18rem;
        color: #333333;
        height: 0.25rem;
        line-height: 0.25rem;
        margin-top: 0.24rem;
        font-weight: bold;
    }
    &__prompt {
        height: 0.2rem;
        line-height: 0.2rem;
        margin-top: 0.08rem;
        font-size: .14rem;
        color: #666666;
    }
    &__btn {
        display: flex;
        margin-top: 0.24rem;
        :nth-child(1) {
            margin-right: 0.24rem;
        }
        &__cancle,
        &__confirm {
            height: 0.32rem;
            width: 0.8rem;
            border-radius: 0.16rem;
            border: 0.01rem solid #4fb0f9;
            color: #0091ff;
            font-size: 0.14rem;
            background: white;
        }
        &__confirm {
            color: white;
            background: #4fb0f9;
        }
    }
}
</style>
