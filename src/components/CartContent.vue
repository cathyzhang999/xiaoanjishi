<template>
    <div class="cart">
        <template v-for="shop in cartList" :key="shop.shopName">
        <div class="shop" v-if="shop.shopName">
            <p class="shop__name" >{{ shop.shopName }}</p>            
            <div
                class="shop__goods"
                v-for="goods in shop.goodsList"
                :key="goods._id"                 
            >
            <template v-if="goods?.check&goods?.count>0">
                <div class="shop__goods__imgbox">
                    <img class="shop__goods__img" :src="goods.imgUrl" alt="" />
                </div>                
                <div class="shop__goods_info">
                    <div class="shop__goods__name">
                        {{ goods.name }}
                    </div>
                    <div class="shop__goods__price">
                        {{ goods.price }}x{{goods.count}}                        
                    </div>
                </div>
                <div class="shop__goods__totalPrice">
                    <span>¥</span>
                    <span>{{ (goods.price* goods.count).toFixed(2)  }}</span>
                </div>
                </template>
            </div>
            
        </div>
        </template>
    </div>
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
export default {
    name:'CartContent',
    setup() {        
        const store = useStore();
        const { cartList } = toRefs(store.state) || {};        
        return { cartList };    }
}
</script>

<style lang="scss" scoped>
@import "../style/mixins.scss";

.cart {
    position: absolute;
    top: 0.16rem;
    bottom: 0.16rem;
    left: 0.16rem;
    right: 0.16rem;
    overflow-y:scroll ;         
}
.shop {
    display: flex;
    margin-bottom: .16rem;
    flex-direction: column;    
    background: #ffff;
    border-radius: 0.04rem;
    padding: 0 .16rem .16rem .16rem;
    &__name {
        font-size: 0.16rem;
        margin-top: 0.16rem ;
        text-align: left;
    }

    &__goods {
        display: flex;
        flex:1;
        width: 100%;
        margin-top: .16rem;
        // box-sizing: border-box;
        &__imgbox{
            height: 0.46rem;
            width: .56rem;
            margin-right: .16rem;
            @include img_box;
        }
        &__img {
             @include goods_img;
        }
        &__name{
            font-size: .14rem;
            margin-bottom: .06rem;
        }
        &__price{            
            font-size: .14rem;
            color: #E93B3B;
            line-height: .2rem;
            height: .2rem;

        }
        &__totalPrice{
            flex:1;
            font-size: .14rem;
            color: #000000;
            text-align: right;            
            height: .2rem;
            // width:.35rem;
            margin-top: .26rem;
           
        }
    }
}
</style>