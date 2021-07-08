<template>
  
  <AddressTop btnName="保存" title="新建收货地址" @btn-click="rightBtnClick" @back-click="handleBackClick"/>
  <div class="wrapper">
    <div class="newAddress">
      <div class="newAddress__item">
        <div class="newAddress__item__text">所在城市：</div>
        <input
          class="newAddress__item__input"
          type="text" 
          v-model="data.city" 
          placeholder="如北京市"
        />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">小区/大厦/学校：</div>
        <input
          class="newAddress__item__input"
          type="text" 
          v-model="data.department"
          placeholder="如理工大学国防科技园"
        />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">楼号-门牌号：</div>
        <input
          class="newAddress__item__input"
          type="text"
          v-model="data.houseNumber"
          placeholder="A号楼B层"
        />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">收货人：</div>
        <input
          class="newAddress__item__input"
          type="text"
          v-model="data.name"
          placeholder="请填写收货人的姓名"
        />
      </div>
      <div class="newAddress__item">
        <div class="newAddress__item__text">联系电话：</div>
        <input
          class="newAddress__item__input"
          type="text"
          v-model="data.phone"
          placeholder="请填写收货手机号"
        />
      </div>
    </div>
    <Toast v-if="toastData.isShowToast" :message="toastData.toastMessage" />
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import {post} from  "../../utils/request"
import Toast, { useToastEffect } from "../../components/Toast";
import AddressTop from "./AddressTop";

const pageSkipEffect = (showToast) => {
  const router = useRouter();  
  const data=reactive ({    
      city:'',
      department:'',
      houseNumber:'',
      name:'',
      phone:''   
  });
  const handleBackClick = () => {
    router.back();
  };
  const rightBtnClick=async()=>{
    try{
      const result=await post('/api/user/address',{
          city:data.city,
          department:data.department,
          houseNumber:data.houseNumber,
          name:data.name,
          phone:data.phone
      })
      if(result.errno==0){
         showToast("Save success!");
      }      
    }catch(e){
      console.log(e);
      showToast("Create address fail!");
    }
  }

  return { handleBackClick,rightBtnClick,data};
};
export default {
  name: "CreateAddress" ,
  components:{Toast,AddressTop},
  setup() {
    const { toastData, showToast } = useToastEffect();
    const { handleBackClick,rightBtnClick,data } = pageSkipEffect(showToast);
    return { handleBackClick,rightBtnClick,toastData, showToast,data};
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
      flex: 1;
      border: none;
      @include ellipsis;
    }
  }
}
input::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                color: #999;
            }
input::-moz-placeholder {
                /* Firefox 19+ */
                color: #999;
            }
input:-ms-input-placeholder {
                /* IE 10+ */
                color: #999;
            }
input:-moz-placeholder {
                /* Firefox 18- */
                color: #999;
            }
</style>