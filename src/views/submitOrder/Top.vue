<template>
    <div class="top">
        <div class="header">
            <p class="iconfont header__backIcon" @click="handleBackClick">
                &#xe602;
            </p>
            确认订单
        </div>
        <div class="address">
            <div class="address__info">
                <p class="address__title">收货地址</p>
                <p class="address__addr">{{addr.city}}{{addr.department}}{{addr.houseNumber}}
</p>
                <p class="address__person">
                    <span class="address__person__name">{{addr.name}}</span>  
                    <span class="address__person__telephone">&nbsp;&nbsp;  {{addr.phone}}</span>
                </p>
            </div>
            <router-link :to="{path:'/selAddress'}" >
                <div class="iconfont address__btn">&#xe603;</div>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router';
const handleBackEffect = () => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    };
    return { handleBackClick };
};
export default {
    name:'Top',
    props:['addr'],
    setup(){
        const {handleBackClick}=handleBackEffect()
        return {handleBackClick}
    }
}
</script>

<style lang="scss" scoped>
.top {
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(
        0deg,
        rgba(0, 145, 255, 0) 4%,
        #0091ff 50%
    );
    background-repeat: no-repeat;
    background-color: #f5f5f5;
}
.header {
    top: 0;
    height: 0.65rem;
    line-height: 0.65rem;
    padding: 0 0.18rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
    &__backIcon {
        position: absolute;
        color: #ffffff;
        font-size: 0.22rem;
    }
}

.address {
    display: flex;
    background: #ffffff;
    border-radius: 0.04rem;
    padding: 0.16rem;
    box-sizing: border-box;
    // margin-bottom: 0.16rem;
    margin: 0 0.18rem;
    height: 1.1rem;
    a{
        text-decoration: none;
    }
    &__info {
        flex: 1;
    }
    &__title {
        font-size: 0.16rem;
        color: #333333;
        height: 0.22rem;
    }
    &__addr {
        font-size: 0.14rem;
        color: #333333;
        margin-top: 0.14rem;
        margin-bottom: 0.06rem;
        height: 0.2rem;
    }
    &__person {
        font-size: 0.12rem;
        color: #666666;
        height: 0.2rem;
    }
    &__btn {
    color: #6666;
    height: 0.16rem;
    width: 0.1rem;
    line-height: 0.8rem;
    
}
}
</style>