<template>
    <Top />
    <div class="wrapper">
        <CartContent :shopId="shopId" />
    </div>
    <Bottom :totalPrice="totalPrice" />
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CartContent from "../../components/CartContent";
import Top from "./Top";
import Bottom from "./Bottom";

const summaryPriceEffect = () => {
    const store = useStore();
    const route = useRoute();
    const shopId = route.params.id;
    const totalPrice = computed(() => {
        // const { cartList } = toRefs(store.state);
        const cartList = store.state.cartList;
        let summary = 0;
        if (cartList) {
            for (let Id in cartList) {
                const goodsList = cartList[Id]?.goodsList;
                if (goodsList) {
                    for (let key in goodsList) {
                        const goods = goodsList[key];
                        if (goods.check) {
                            summary += (goods.price * goods.count).toFixed(2);
                        }
                    }
                }
            }
        }        
        return summary;
    });
    return { shopId, totalPrice };
};
export default {
    name: "OrderAll",
    components: { CartContent, Top, Bottom },
    setup() {
        const { shopId, totalPrice } = summaryPriceEffect();
        return { totalPrice, shopId };
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";

.wrapper {
    // z-index: 9;
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
