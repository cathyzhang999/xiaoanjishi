<template>
    <div class="wrapper">
        <div class="search">
            <div class="iconfont search__backIcon" @click="handleBackClick">
                &#xe602;
            </div>
            <div class="search__content">
                <div class="iconfont search__content__img">&#xe600;</div>
                <input
                    type="text"
                    class="search__content__input"
                    placeholder="请输入商品名称搜索"
                />
            </div>
        </div>
        <ShopInfo :item="item" :hideborder="true" v-show="item.imgUrl" />
        <Content :shopName="item.name" />
    </div>
    <Cart :shopName="item.name" />
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import ShopInfo from "../../components/ShopInfo";
import { get } from "../../utils/request.js";
import Content from './Content.vue';
import Cart from './Cart.vue';


const getShopinfoEffect = () => {
    const route = useRoute();
    // console.log(route.params);
    const data = reactive({ item: {} });
    // const item=reactive({})
    const shopId=route.params.id.slice(1)
    const getDetail = async () => {
        const result = await get(`/api/shop/${shopId}`);
        if (result?.errno == 0 && result?.data) {
            // item=result.data
            data.item = result.data;
        }
    };
    const { item } = toRefs(data);    
    return { item, getDetail };
};
const handleBackEffect = () => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    };
    return { handleBackClick };
};

export default {
    name: "Shop",
    components: { ShopInfo, Content,Cart},
    setup() {
        const { item, getDetail } = getShopinfoEffect();
        getDetail();
        const { handleBackClick } = handleBackEffect();
        // console.log(item);
        return { item, handleBackClick };
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
@import "../../style/mixins.scss";
.wrapper {
    // width:100%;
    padding: 0 0.18rem;
}
.search {
    display: flex;
    margin-top: 0.16rem;
    margin-bottom: 0.16rem;
    width: 100%;

    &__backIcon {
        height: 0.21rem;
        color: #b6b6b6;
        margin-top: 0.05rem;
    }
    &__content {
        display: flex;
        flex: 1;
        width: 100%;
        background: $input-bgcolor;
        border-radius: .16rem;
        // border: none;
        margin-left: 0.16rem;
        &__img {
            height: 0.16rem;
            margin: 0.06rem 0.12rem 0.08rem 0.16rem;
            color: $search-iconColor;
        }
        &__input {
            display: block;
            height: 0.32rem;
            width: 100%;
            background: none;
            border: none;
            outline: none;
            line-height: 0.32rem;
            font-size: 0.14rem;
            color: $fontcolor;
            padding-right: 0.2rem;
            &::placeholder {
                color: $fontcolor;
            }
        }
    }
}



</style>
