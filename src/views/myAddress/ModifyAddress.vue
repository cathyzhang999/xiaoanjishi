<template> 
  <AddressTop btnName="保存" title="编辑收货地址" @btn-click="rightBtnClick" @back-click="handleBackClick"/>
  <div class="wrapper">
    <div class="newAddress">
      <div class="newAddress__item">
        <div class="newAddress__item__text">所在城市：</div>
        <input class="newAddress__item__input" type="text" v-model="addrById.city" />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">小区/大厦/学校：</div>
        <input class="newAddress__item__input" type="text" v-model="addrById.department" />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">楼号-门牌号：</div>
        <input class="newAddress__item__input" type="text" v-model="addrById.houseNumber" />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">收货人：</div>
        <input
          class="newAddress__item__input"
          type="text"
          v-model="addrById.name"
        />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">联系电话：</div>
        <input class="newAddress__item__input" type="text" v-model="addrById.phone" />
      </div>
    </div>
    <Toast v-if="toastData.isShowToast" :message="toastData.toastMessage" />
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, toRefs } from "vue";
import { post,patch } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";
import {get} from "../../utils/request";
import AddressTop from "./AddressTop";


const addressEffect = (showToast) => {
  const route = useRoute();  
  let addressId = route.params.id;   
  addressId=addressId.slice(1)
  // const index= parseInt(addressId.substr(1))-1; 
  const addrById=ref({})
  // const addrData=reactive({addrById:{}}) 
  const getAddress = async () => {
    try {
      // const result = await get("api/user/address"); 
      const result=await get(`/api/user/address/${addressId}`)
      // console.log(result.data)
      // console.log(addressId)    
      if (result.errno == 0 && result?.data) { 
        addrById.value=result.data
        // console.log(addrById.value)
        // addrData.addrById=result.data  
      }         
     } catch (e) {
      console.log(e);
    }
  };
  getAddress();
  // const { addrById } = toRefs(addrData);  

  const rightBtnClick = async () => {
    const addrValue=addrById.value
    try {
      const result = await patch(`/api/user/address/${addressId}`, {
        _id:addressId,
        city: addrValue.city,
        department: addrValue.department,
        houseNumber: addrValue.houseNumber,
        name: addrValue.name,
        phone: addrValue.phone,
      });
      if (result.errno == 0) {
        showToast("Modify success!");
      }
    } catch (e) {
      console.log(e);
      // showToast("Modify address fail!");
    }
  };
  return { rightBtnClick, getAddress,addrById,addressId };
};

const pageSkipEffect = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return { handleBackClick };
};
export default {
  name: "ModifyAddress",
  components: { Toast,AddressTop },
  setup() {
    const { toastData, showToast } = useToastEffect();
    const { rightBtnClick, getAddress,addrById,addressId  } = addressEffect(showToast);
    const { handleBackClick } = pageSkipEffect();
    return {
      handleBackClick,
      showToast,
      toastData,
      rightBtnClick,
      getAddress,
      addrById,
      addressId
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
@import "../../style/mixins.scss";


.wrapper {
  position: absolute;
  top: 0.44rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: $input-bgcolor;
}
.newAddress {
  background: white;
  margin-top: 0.12rem;
  &__item {
    display: flex;
    height: 0.45rem;
    line-height: 0.45rem;
    font-size: 0.14rem;
    margin: 0 0.18rem;
    border-bottom: 0.01rem solid #f1f1f1;
    color: #666666;

    &__input {
      flex:1;
      border: none;
      @include ellipsis;
      
    }
  }
}
input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #333;
}
input::-moz-placeholder {
  /* Firefox 19+ */
  color: #333;
}
input:-ms-input-placeholder {
  /* IE 10+ */
  color: #333;
}
input:-moz-placeholder {
  /* Firefox 18- */
  color: #333;
}
</style>