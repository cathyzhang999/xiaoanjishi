<template >
    <div class="header">
        我的全部购物车
    </div>
     
    <div class="wrapper">
           <CartContent />
    </div>
    <Docker :currentIndex="1" />
</template>

<script>
import CartContent from "../../components/CartContent";
import Docker from "../../components/Docker";
export default {
    name: "Cart",
    components: { Docker,CartContent },    
};
</script>

<style lang="scss" scoped>

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
.wrapper{
    position: absolute;
    top: 0.44rem;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    // overflow-y:scroll;
    padding: 0.18rem 0.18rem 0 0.18rem;  
    background:  #F5F5F5;
}



</style>
