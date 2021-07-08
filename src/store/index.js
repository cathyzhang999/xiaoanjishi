import Vuex from "vuex";
import { createStore } from "vuex";

const setLocalCartList = state => {
    const { cartList } = state;
    const cartListString = JSON.stringify(cartList);
    localStorage.cartList = cartListString;
};

const getLocalCartList = () => {
    const cartListString = localStorage.cartList;
    try {
        return JSON.parse(cartListString);
    } catch (e) {
        return {};
    }
};

export default createStore({
    state: {
        cartList: getLocalCartList()
    },
    mutations: {
        ChangeCartNum(state, payload) {
            const { shopId, goodsId, goodsInfo, shopName } = payload;
            let shopInfo = state.cartList[shopId];
            if (!shopInfo) {
                shopInfo = {};
                shopInfo.goodsList = {};
                shopInfo.shopName = shopName;
            }
            let goods = shopInfo.goodsList[goodsId];
            if (!goods) {
                goods = goodsInfo;
                goods.count = 0;
            }
            shopInfo.shopName = shopName;
            goods.count = goods.count + payload.num;
            if (goods.count < 0) {
                goods.count = 0;
            }
            // if (goods.count <=0) {
            //     goods={}
            //     // console.log(goods)
            // }
            if (payload.num > 0) {
                goods.check = true;
            }
            shopInfo.goodsList[goodsId] = goods;
            state.cartList[shopId] = shopInfo;
            // console.log(state.cartList[shopId]);
            setLocalCartList(state);
        },
        changCartChecked(state, payload) {
            const { shopId, goodsId } = payload;
            let goods = state.cartList[shopId]?.goodsList?.[goodsId];
            goods.check = !goods.check;
            setLocalCartList(state);
            // state.cartList[shopId][goodsId].check = goods.check;
        },
        handleClearCart(state, payload) {
            const { shopId } = payload;
            state.cartList[shopId].goodsList = {};
            state.cartList[shopId].shopName = "";
            // state.cartList[shopId]={};
            setLocalCartList(state);
        },
        handleCartSelectAll(state, payload) {
            const { shopId } = payload;
            let goodsList = state.cartList[shopId]?.goodsList;
            if (goodsList) {
                for (let key in goodsList) {
                    const goods = goodsList[key];
                    goods.check = true;
                }
            }
            setLocalCartList(state);
        }
    },
    actions: {},
    modules: {}
});
