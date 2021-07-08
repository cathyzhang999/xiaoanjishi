<template>
<div class="top">
    
        <div class="iconfont top__backIcon" @click="handleBackClick">&#xe602;</div>
    
        <div class="top__title">{{title}}</div>
        <!-- <router-link :to="{name: 'CreateAddress' }"> -->
            <div class="top__btn" @click="rightBtnClick">{{btnName}}</div>
        <!-- </router-link> -->
    </div>
</template>

<script>

export default {
    name:'AddressTop',
    props:['btnName','title'],
    methods:{
        rightBtnClick(){
            this.$emit("btnClick")
        },
        handleBackClick(){
            this.$emit('backClick')
        }
    }

}    
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    height: 0.44rem;
    line-height: 0.44rem;
    background-color: white;
    padding: 0 0.18rem;
    a {
            text-decoration: none;
            color: #333;
        }
    
    &__backIcon {
        width: 0.16rem;
        font-size: 0.16rem;
    }
    &__title {
        flex: 1;
        font-size: 0.16rem;
        color: #333333;
        text-align: center;
    }
    &__btn {
        font-size: 0.14rem;
        color: #333333;
        
    }
}

</style>