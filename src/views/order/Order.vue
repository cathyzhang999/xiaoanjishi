<template>
  <div class="header">我的订单</div>

  <div class="wrapper">
    <div class="myOrders" v-for="item in myOrders" :key="item.shopId">
      <div class="myOrders__title">
        <span class="myOrders__shopName">{{ item.shopName }}</span>
        <span class="myOrders__status">
          {{ item.isCanceled ? "已取消" : "已下单" }}</span
        >
      </div>
      <div class="myOrders__purchaseInfo">
        <template
          class="myOrders__goods"
          v-for="(innerItem, index) in item.purchases"
          :key="index"
        >
            <div class="myOrders__goods__imgbox">
                <img
            :src="innerItem.goods.imgUrl"
            class="myOrders__goods__img"
            v-if="index < 3"
          />
            </div>
          
        </template>
        <div class="myOrders__summary">
          <div class="myOrders__summary__totalPrice">
            ¥{{ item.totalPrice }}
          </div>
          <div class="myOrders__summary__totalSum">共{{ item.totalSum }}件</div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import Docker from "../../components/Docker";
import { get } from "../../utils/request.js";

const getOrderEffect = () => {
  // const myOrders=ref([]);
  const data = reactive({ myOrders: [] });
  const getMyOrderList = async () => {
    const result = await get("/api/order");
    if (result?.errno === 0 && result?.data) {
      data.myOrders = result.data;
    //   console.log(data.myOrders);
      // console.log(data.myOrders[0].goodsList)
      // const orderList=result.data;
      data.myOrders.forEach((order) => {
        let totalSum = 0;
        let totalPrice = 0;
        // console.log(order.goodsList)
        order.purchases.forEach((goods) => {
          totalSum += goods.orderSales;
          totalPrice += goods.orderSales * goods.goods.price;
        });

        order.totalSum = totalSum;
        order.totalPrice = totalPrice.toFixed(1);
      });
      // data.myOrders = result.data;
    }
  };
  getMyOrderList();
  const { myOrders } = toRefs(data);
  return { myOrders };
};
export default {
  name: "Order",
  components: { Docker },
  setup() {
    const { myOrders, totalSum, totalPrice } = getOrderEffect();

    return { myOrders, totalSum, totalPrice };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";

.header {
  height: 0.44rem;
  line-height: 0.44rem;
  width: 100%;
  // margin-bottom: .16rem;
  text-align: center;
  font-size: 0.16rem;
  background: #ffffff;
  color: #333333;
}
.wrapper {
  position: absolute;
  top: 0.44rem;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  overflow-y: scroll;
  padding: 0.18rem 0.18rem 0 0.18rem;
  background: #f5f5f5;
}

.myOrders {
  display: flex;
  margin-bottom: 0.16rem;
  flex-direction: column;
  background: #ffff;
  border-radius: 0.04rem;
  padding: 0 0.16rem 0.16rem 0.16rem;
  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem;
    margin: 0.16rem 0;
    text-align: left;
    font-weight: bold;
  }
  &__status {
    font-size: 0.14rem;
    color: #999999;
    text-align: right;
  }
  &__purchaseInfo {
    display: flex;
  }
  &__goods {
    &__imgbox{
      margin-right: 0.12rem;
      height: 0.4rem;
      width: .46rem;
      @include img_box;
    }  
    &__img {
      @include goods_img;


    }
  }
  &__summary {
    //   display: flex;
    //   flex-direction: column;
    flex: 1;
    height: 0.4rem;
    &__totalPrice {
      font-size: 0.14rem;
      color: #e93b3b;
      text-align: right;
      line-height: 0.2rem;
    }
    &__totalSum {
      font-size: 0.12rem;
      color: #333333;
      text-align: right;
      line-height: 0.14rem;
      margin-top: 0.04rem;
    }
  }
}
</style>
