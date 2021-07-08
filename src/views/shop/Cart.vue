<template>
  <div class="mask" v-if="showCartContent" @click="handleShowCartClick"></div>
  <div class="cart">
    <div class="goods" v-if="showCartContent">
      <div class="goods__header" v-if="caculations.sumNum>0">
        <div
          class="goods__header__all"
          @click="
            () => {
              handleCartSelectAll(shopId);
            }
          "
        >
          <span
            class="goods__header__check iconfont"
            v-html="caculations.isCartAllSelect ? '&#xe710;' : '&#xe70f;'"
          ></span>
          <span class="goods__header__text">全选</span>
        </div>

        <div
          class="goods__header__clear"
          @click="
            () => {
              handleClearCart(shopId);
            }
          "
        >
          清空购物车
        </div>
      </div>
      <div class="goods__shopName" v-if="caculations.sumNum > 0">
        店铺名称：{{ shopName }}
      </div>
      <template v-for="item in caculations.goodsList" :key="item._id">
        <div class="goods__item" v-if="item.count > 0">
          <div
            class="goods__item__check iconfont"
            v-html="item.check ? '&#xe710;' : '&#xe70f;'"
            @click="
              () => {
                changCartChecked(shopId, item._id);
              }
            "
          />
          <div class="goods__item__imgbox">
            <img class="goods__item__img" :src="item.imgUrl" />
          </div>
          
          <div class="goods__item__detail">
            <h4 class="goods__item__title">{{ item.name }}</h4>
            <p class="goods__item__price">
              <span class="goods__item__yen">&yen;</span>{{ item.price }}
              <span class="goods__item__origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="goods__purchase">
            <span
              class="iconfont goods__purchase__minus"
              @click="
                () => {
                  ChangeCartNum(shopId, item._id, item, -1);
                }
              "
              >-</span
            >
            {{ item.count || 0 }}
            <span
              class="iconfont goods__purchase__plus"
              @click="
                () => {
                  ChangeCartNum(shopId, item._id, item, 1);
                }
              "
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="summary">
      <img
        class="summary__img"
        src="http://www.dell-lee.com/imgs/vue3/basket.png"
        @click="handleShowCartClick"
      />
      <span class="summary__tag" v-if="caculations.sumNum > 0">{{
        caculations.sumNum
      }}</span>
      <div class="summary__total" v-if="caculations.sumNum > 0">
        <span class="summary__total__title">总计：</span>
        <span class="summary__total__price">¥{{ caculations.sumPrice }}</span>
      </div>
      <div class="summary__empty" v-if="caculations.sumNum == 0">
        购物车是空的
      </div>
      <!-- <router-link :to="{name: 'Order' }"> -->
      <router-link :to="{ path: `/submitOrder/${shopId}` }">
        <button class="summary__btn" v-show="caculations.sumPrice > 0">
          去结算
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { commonCartEffect } from "../../effect/cartEffects";

const useCartEffect = (shopId) => {
  const store = useStore();
  const changCartChecked = (shopId, goodsId) => {
    store.commit("changCartChecked", { shopId, goodsId });
  };
  const handleClearCart = (shopId) => {
    store.commit("handleClearCart", { shopId });
  };
  const handleCartSelectAll = (shopId) => {
    store.commit("handleCartSelectAll", { shopId });
  };
  return {
    changCartChecked,
    handleClearCart,
    handleCartSelectAll,
  };
};
const toggleShowCart = () => {
  const showCartContent = ref(false);
  const handleShowCartClick = () => {
    showCartContent.value = !showCartContent.value;
  };
  return { showCartContent, handleShowCartClick };
};

export default {
  name: "Cart",
  props: ["shopName"],
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { showCartContent, handleShowCartClick } = toggleShowCart();
    const { ChangeCartNum, cartList, caculations } = commonCartEffect(shopId);
    const {
      changCartChecked,
      handleClearCart,
      handleCartSelectAll,
    } = useCartEffect(shopId);

    return {
      caculations,
      cartList,
      ChangeCartNum,
      changCartChecked,
      shopId,
      handleClearCart,
      handleCartSelectAll,
      showCartContent,
      handleShowCartClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
@import "../../style/mixins.scss";
.mask {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  height: 100%;
  background: black;
  opacity: 0.5;
}
.cart {
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
}
.goods {
  overflow-y: scroll;
  flex: 1;
  &__header {
    display: flex;
    height: 0.52rem;
    border-bottom: 0.01rem solid $bgColor;
    &__all {
      flex: 1;
      padding-left: 0.16rem;
      line-height: 0.52rem;
    }
    &__check {
      // display: inline-block;
      vertical-align: top;
      color: #0091ff;
      font-size: 0.2rem;
      line-height: 0.52rem;
    }
    &__text {
      color: $fontcolor;
      margin-left: 0.09rem;
      font-size: 0.14rem;
      line-height: 0.52rem;
    }
    &__clear {
      width: 0.7rem;
      line-height: 0.52rem;
    }
  }
  &__shopName {
    margin: 0.1rem 0.16rem;
    color: #0091ff;
    font-weight: bold;
  }
  &__item {
    display: flex;
    position: relative;
    padding: 0.12rem 0.16rem;
    // padding:0 .16rem;
    border-bottom: 0.01rem solid $input-bgcolor;
    &__check {
      color: #0091ff;
      font-size: 0.2rem;
      line-height: 0.5rem;
      // margin-left: .18rem;
      margin-right: 0.16rem;
      // margin-top:.1rem ;
    }
    &__imgbox {
      height: 0.46rem;
      width:.5rem;
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
    right: 0.18rem;
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
.summary {
  width: 100%;
  height: 0.5rem;
  display: flex;
  background: $white;
  box-shadow: 0 -1rem 1rem 0 $bgColor;
  box-sizing: border-box;
  &__img {
    width: 0.28rem;
    height: 0.26rem;
    margin-left: 0.24rem;
    margin-top: 0.11rem;
  }
  &__tag {
    position: absolute;
    left: 0.43rem;
    bottom: 0.32rem;
    min-width: 0.2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    border-radius: 0.1rem;
    text-align: center;
    background: $highLight;
    font-size: 0.14rem;
    color: $white;
    transform: scale(0.6);
    // transform-origin: left center;
  }
  &__total {
    height: 0.5rem;
    line-height: 0.5rem;
    margin-left: 0.32rem;
    flex: 1;
    &__title {
      font-size: 0.12rem;
    }
    &__price {
      font-size: 0.18rem;
      color: $highLight;
    }
  }
  &__empty {
    flex: 1;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-left: 0.32rem;
  }
  &__btn {
    margin-right: 0;
    width: 0.98rem;

    height: 0.5rem;
    background: #4fb0f9;
    border: none;
    color: $white;
    font-size: 0.14rem;
  }
}
</style>
