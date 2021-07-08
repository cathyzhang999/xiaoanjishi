<template>
    
    <div class="wrapper">
        <MyTop :user="username" />
        <div class="links">
            <div class="links__item">
                <div class="links__item__icon1 iconfont">&#xe657;</div>
                <div class="links__item__text">我的钱包</div>
                <div class="links__item__btn iconfont">&#xe603;</div>
            </div>
            <div class="links__item">
                <span class="links__item__icon2 iconfont">&#xe607;</span>
                <span class="links__item__text">我的地址</span>
                <router-link to="/myAddress">
                    <span class="links__item__btn iconfont">&#xe603;</span>
                </router-link>
            </div>
            <div class="links__item">
                <span class="links__item__icon3 iconfont">&#xe7bb;</span>
                <span class="links__item__text">客服与帮助</span>
                <span class="links__item__btn iconfont">&#xe603;</span>
            </div>
        </div>
    </div>
    <Docker :currentIndex="3"/>
</template>

<script>
import { ref } from 'vue';
import Docker from "../../components/Docker";
import MyTop from "./MyTop";
import { get } from "../../utils/request";

const handleUserEffect=()=>{
    const username=ref('')
    const getUsername=async()=>{
        try{        
            const result=await get("api/user/address")
            if(result.errno==0&&result?.data){
                username.value=result.data[0].name
            }        
         }catch(ex){
        console.log(ex)
        }    
    }
    getUsername()
    return{getUsername,username}
}
export default {
    name: "My",
    components: { Docker, MyTop },
    setup(){
        const {getUsername,username}=handleUserEffect()
        return{getUsername,username}
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 0rem;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    // overflow-y:scroll;
    padding: 0.18rem 0.18rem 0 0.18rem;
    background: #f5f5f5;
    overflow-y: scroll;
}

.links {
    position: absolute;
    top: 3.37rem;
    // bottom: 0rem;
    left: .18rem;
    right: .18rem;
    height: 1.46rem;
    background: #ffffff;
    box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
    border-radius: 0.08rem;
    // overflow-y: scroll;
    &__item {
        display: flex;
        align-items: center;
        height: 0.49rem;
        line-height: 0.49rem;
        padding-left: 0.21rem;
        padding-right: 0.16rem;
        box-sizing: border-box;
        a{text-decoration:none;} 
        &__text {
            flex: 1;
            font-size: 0.14rem;
            color: #262626;
        }
        &__btn {
            color: #c2c4ca;
            font-size: 0.12rem; 
        }
        &__icon1,
        &__icon2,
        &__icon3 {
            font-size: 0.12rem;
            background: #ed4a47;
            border-radius: 0.03rem;
            color: white;
            height: 0.22rem;
            line-height: 0.22rem;
            width: 0.22rem;
            margin-right: 0.12rem;
        }
        &__icon2 {
            background: #32c5ff;
        }
        &__icon3 {
            background: rgba(144, 19, 254, 0.92);
        }
    }
}
</style>
