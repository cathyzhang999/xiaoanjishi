// shopping Cart related logic

import { computed } from "vue";
import { useStore } from "vuex";
import { toRefs } from "vue";
export const commonCartEffect = (shopId) => {
    const store = useStore();
    // const { cartList } = store.state;
    const cartList = store.state.cartList;    
    const ChangeCartNum = (shopId, goodsId, goodsInfo, num, shopName) => {
        store.commit("ChangeCartNum", {
            shopId,
            goodsId,
            goodsInfo,
            num,
            shopName
        });
    };
    const caculations = computed(() => {        
        let result = {
            sumNum: 0,
            sumPrice: 0,
            goodsList: {},
            purchaseList:[],
            shopName:"",
            isCartAllSelect: true
        };
        result.goodsList = cartList[shopId]?.goodsList;
        result.shopName = cartList[shopId]?.shopName;        
        if (result.goodsList) {
            for (let i in result.goodsList) {
                const goods = result.goodsList[i];
                result.sumNum += goods.count;
                if (goods.check) {
                    result.sumPrice += goods.count * goods.price;
                }
                if (goods.count > 0 && !goods.check) {
                    result.isCartAllSelect = false;
                }
                if(goods.count > 0 && goods.check ){
                    result.purchaseList.push(goods);
                }
            }
        }
        result.sumPrice = result.sumPrice.toFixed(2);
        return result;
    });
    return { ChangeCartNum, cartList, caculations };    
};
