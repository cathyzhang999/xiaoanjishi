<template>
    <div class="myInfo">
        <div class="myInfo__back"></div>
        <!-- <div class="myInfo__back-2"></div> -->
        <div class="iconfont myInfo__icon">&#xe6b9;</div>
        <div class="myInfo__person">   
                     
            <img class="myInfo__person__portrait" src="../../assets/tt.jpg" alt="">

            <div class="myInfo__person__myname">
                <p class="myInfo__person__name">{{user}}</p>
                
                <div class="myInfo__person__tag">
                    <span class="myInfo__person__star iconfont">&#xe61a;</span>
                    <span class="myInfo__person__starNum">16</span>
                    
                </div>
            </div>
            <p class="myInfo__person__ID">ID: 1069643013</p>
            <div class="myInfo__data">
                <div class="myInfo__data__item">
                    <p class="myInfo__data__name">红包</p>
                    <p class="myInfo__data__num">218</p>
                </div>
                <div class="myInfo__data__item">
                    <p class="myInfo__data__name">优惠券</p>
                    <p class="myInfo__data__num">12张</p>
                </div>
                <div class="myInfo__data__item">
                    <p class="myInfo__data__name">鲜豆</p>
                    <p class="myInfo__data__num">88</p>
                </div>
                <div class="myInfo__data__item">
                    <p class="myInfo__data__name">白条</p>
                    <p class="myInfo__data__num">1000</p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "MyTop",
    props:['user']
};
</script>

<style lang="scss" scoped>
.myInfo {
    // position: absolute;
    // top:0;
    left:0;
    right:0;
    // height: 2.9rem;

    &__back{
        position: absolute;
        top:0;
        left:0;
        right:0;
        height: 2.3rem;
        background-size: 100% 2.3rem;
        background-repeat: no-repeat;
        background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
        border-bottom-left-radius: 90% 40%;
        border-bottom-right-radius: 90% 40%;        
    }

    &__icon{
        color: white;
        font-size: .26rem;
        position: absolute;
        top:.4rem;
        right: .3rem;

    }
    &__person {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0.88rem 0.18rem 0.16rem 0.18rem;
        background: #ffff;        
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.08);
        border-radius: 8px;
        &__portrait {
            width: 0.94rem;
            height: 0.94rem;
            font-size: .94rem;
            position: absolute;
            top: -0.47rem;
            left: 50%;
            transform: translate(-50%,0);
            right: 0;
            border-radius: 50%;
        }
        &__myname{
            display: flex;
        }
        &__name {
            font-size: 0.24rem;
            color: #262628;
            letter-spacing: 0.19px;
            text-align: center;
            line-height: 0.36rem;
            margin-top: 0.59rem;
            margin-left: .5rem;           
        }
        &__tag {          
            font-family: Helvetica;
            font-size: .10rem;
            color: #FFFFFF;
            letter-spacing: -0.36px;
            background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
            border-radius: 100px;
            height: .15rem;
            width:.35rem;
            margin-top: .7rem;
            margin-left: .12rem;
            text-align: center;
        }
        &__star{
            height: .05rem;
            width: .05rem;
            color: #FFC700;
            font-size: .07rem;
            
        }
        &__ID {
            font-size: 0.14rem;
            color: #c1c0c9;
            text-align: center;
            margin-top: 0.2rem;
            margin-bottom: 0.12rem;
        }
    }
    &__data {
        display: flex;
        width: 100%;
        height: .76rem;
        border-top:.01rem solid #F1F1F1;;
        &__item {
            flex: 1;
            text-align: center;
        }
        &__name {
            font-size: 0.12rem;
            color: #c1c0c9;
            height: .17rem;
            line-height: .17rem;
            margin-top: .12rem;
            margin-bottom: .03rem;
        }
        &__num {
            font-size: 0.2rem;
            color: #262628;
            height: .28rem;
            line-height: .28rem;
        }
    }
}
</style>
