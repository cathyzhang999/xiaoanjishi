<template>
            <div class="shop" >
            <p class="shop__name">{{ caculations.shopName }}</p>
            <div
                class="shop__goods"
                v-for="goods in caculations.purchaseList"
                :key="goods._id"
            >
                <!-- <template v-if="goods?.count > 0 && goods?.check"> -->
                    <div class="shop__goods__imgbox">
                        <img class="shop__goods__img" :src="goods.imgUrl" alt="" />
                    </div>
                    
                    <div class="shop__goods_info">
                        <div class="shop__goods__name">
                            {{ goods.name }}
                        </div>
                        <div class="shop__goods__price">
                            {{ goods.price }}x{{ goods.count }}
                        </div>
                    </div>
                    <div class="shop__goods__totalPrice">
                        <span>¥</span>
                        <span>{{ (goods.price * goods.count).toFixed(2) }}</span>
                    </div>
                <!-- </template> -->
            </div>
        </div>
</template>

<script>
import { useRoute } from "vue-router";
import { commonCartEffect } from "../../effect/cartEffects";
export default {
    name:"GoodsList",
    setup(){
        const route=useRoute()
        const shopId=route.params.id;
        const { cartList, caculations } = commonCartEffect(shopId);     
        return { cartList, caculations };
    }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

.shop {
    display: flex;
    margin-bottom: 0.16rem;
    flex-direction: column;
    background: #ffff;
    border-radius: 0.04rem;
    padding: 0 0.16rem 0.16rem 0.16rem;
    &__name {
        font-size: 0.16rem;
        margin-top: 0.16rem;
        text-align: left;
    }

    &__goods {
        display: flex;
        flex: 1;
        width: 100%;
        margin-top: 0.16rem;
        // box-sizing: border-box;
        &__imgbox{
            height: 0.46rem;
            width:.56rem;
            margin-right: 0.16rem;
             @include img_box;

        }
        &__img {
             @include goods_img;

        }
        &__name {
            font-size: 0.14rem;
            margin-bottom: 0.06rem;
        }
        &__price {
            font-size: 0.14rem;
            color: #e93b3b;
            line-height: 0.2rem;
            height: 0.2rem;
        }
        &__totalPrice {
            flex: 1;
            font-size: 0.14rem;
            color: #000000;
            text-align: right;
            height: 0.2rem;
            // width:.35rem;
            margin-top: 0.26rem;
        }
    }
}
</style>