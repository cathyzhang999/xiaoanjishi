<template>
    <div class="main">
        <ul class="category">
            <li
                :class="{
                    category__item: true,
                    'category__item--active': currentTab === item.tab
                }"
                v-for="item in categories"
                :key="item._id"
                @click="() => handleTabClick(item.tab)"
            >
                {{ item.name }}
            </li>
        </ul>
        <div class="goods">
            <div
                class="goods__item"
                v-for="item in contentList"
                :key="item._id"
            >
                <div class="goods__item__imgbox">
                    <img class="goods__item__img" :src="item.imgUrl" />
                </div>

                
                <div class="goods__item__detail">
                    <h4 class="goods__item__title">{{ item.name }}</h4>
                    <p class="goods__item__sales">月售{{ item.sales }}</p>
                    <p class="goods__item__price">
                        <span class="goods__item__yen">&yen;</span
                        >{{ item.price }}
                        <span class="goods__item__origin"
                            >&yen;{{ item.oldPrice }}</span
                        >
                    </p>
                </div>
                <div class="goods__purchase">
                    <span class="iconfont goods__purchase__minus" @click="
                            () => {
                                ChangeCartNum(
                                    shopId,
                                    item._id,
                                    item,
                                    -1,
                                    shopName
                                );
                            }
                        ">-</span>
                    {{getSaleCount(shopId,item._id)}}
                    <!-- {{ cartList?.[shopId]?.goodsList[item._id]?.count || 0 }} -->
                    <span class="iconfont goods__purchase__plus" @click="
                            () => {
                                ChangeCartNum(
                                    shopId,
                                    item._id,
                                    item,
                                    1,
                                    shopName
                                );
                            }
                        ">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect, ref, computed } from "vue";
import { useStore } from "vuex";
import { get } from "../../utils/request";
import { useRoute } from "vue-router";
import axios from "axios";
import { commonCartEffect } from "../../effect/cartEffects";

const categories = [
    { name: "全部商品", tab: "all" },
    { name: "秒杀", tab: "seckill" },
    { name: "新鲜水果", tab: "fruit" }
];

// Tab 切换相关的逻辑
const useTabEffect = () => {
    const currentTab = ref(categories[0].tab);
    // const {  getContentData }=getContentEffect()
    const handleTabClick = tab => {
        // getContentData(tab);
        currentTab.value = tab;
    };
    return { handleTabClick, currentTab };
};
const useCartEffect=()=>{
    const route = useRoute();
    const shopId = route.params.id;
    // console.log(shopId)
    const { ChangeCartNum, cartList } = commonCartEffect();
    const getSaleCount=(shopId,goodsId)=>{
        return cartList?.[shopId]?.goodsList[goodsId]?.count || 0
        // console.log("cartList",cartList)
    }
    return {shopId,ChangeCartNum, cartList,getSaleCount}
}
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
    // const data = reactive({ contentList: [] });
    const contentList = ref([]);
    const getContentData = async () => {
        // const result = await get(`/api/shop/${shopId}/products`, {
        //     params: { tab:currentTab.value }
        // });
        // if (result?.errno === 0 && result?.data) {
        //     // data.contentList = result.data;
        //     contentList.value = result.data;
        // }
        const shop_id=shopId.slice(1)
        axios.defaults.baseURL ="http://localhost:3000";
        axios.defaults.withCredentials=true;
        await axios
            .get(`/api/shop/${shop_id}/goods`, {
                params: { tab: currentTab.value }
            })
            .then(res => {
                if (res.data.errno == 0 && res.data.data) {
                    contentList.value = res.data.data;
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    watchEffect(() => {
        getContentData();
    });
    // const { contentList } = toRefs(data);
    return { contentList };
};

export default {
    name: "Content",
    props: ["shopName"],
    setup() {
        const { handleTabClick, currentTab } = useTabEffect();                
        const {shopId,ChangeCartNum, cartList,getSaleCount}=useCartEffect()
        const { contentList } = useCurrentListEffect(currentTab, shopId);
        return {
            contentList,
            categories,
            handleTabClick,
            currentTab,
            shopId,
            cartList,
            ChangeCartNum,
            getSaleCount
        };
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
@import "../../style/mixins.scss";

.main {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: 0.5rem;
    overflow-y: scroll;
}
.category {
    width: 0.76rem;
    margin-top: 0.04rem;
    height: 100%;
    background-color: $input-bgcolor;
    &__item {
        font-size: 0.14rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        border-radius: 0.02rem;
        background-color: $input-bgcolor;
        &--active {
            background-color: $white;
        }
    }
}
.goods {
    overflow-y: scroll;
    flex: 1;
    margin-left: 0.16rem;
    padding-right: 0.18rem;
    &__item {
        display: flex;
        position: relative;
        padding: 0.12rem 0;
        border-bottom: 0.01rem solid $input-bgcolor;
        &__imgbox{
            height: 0.68rem;
            width:0.76rem;
            @include img_box;

        }
        &__img {
            @include goods_img;

        }
        &__detail {
            margin-left: 0.16rem;
            overflow: hidden;
        }
        &__title {
            font-size: 0.14rem;
            height: 0.22rem;
            line-height: 0.22rem;
            @include ellipsis;
        }
        &__sales {
            height: 0.16rem;
            line-height: 0.16rem;
            margin: 0.06rem 0;
            font-size: 0.12rem;
        }
        &__price {
            height: 0.2rem;
            line-height: 0.2rem;
        }

        &__current {
            color: #e93b3b;
            font-size: .14rem;
        }
        &__yen {
            font-size: 0.1rem;
        }
        &__origin {
            margin-left: 0.06rem;
            font-size: 0.1rem;
            color: #999999;
            text-decoration: line-through;
        }
    }
    &__purchase {
        position: absolute;
        height: 0.2rem;
        line-height: 0.2rem;
        right: 0;
        bottom: 0.12rem;
        font-size: 0.14rem;
        &__minus,
        &__plus {
            display: inline-block;
            height: 0.17rem;
            line-height: 0.14rem;
            width: 0.17rem;
            font-size: 0.2rem;
            @include circle;
        }
        &__minus {
            margin-right: 0.06rem;
            color: #666666;
            border: 0.01rem solid #666666;
        }
        &__plus {
            margin-left: 0.06rem;
            color: $white;
            background-color: #0091ff;
        }
    }
}
</style>
