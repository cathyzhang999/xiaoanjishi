<template>
    <div class="position">
        <div class="iconfont position__icon">&#xe606;</div>
        <div class="position__addr">北京理工大学国防科技园2号楼10层</div>
        <div class="iconfont position__icon">&#xeaa5;</div>
    </div>
    <div class="search">
        <span class="iconfont search__icon">&#xe600;</span>
        <input
            type="text"
            class="search__input"
            placeholder=" 山姆会员商店优惠商品"
        />
    </div>
    <div class="banner">
        <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" />
    </div>
    <div class="icons">
        <div class="icons__item" v-for="item in iconItemList" :key="item.id">
            <img
                class="icons__item__img"
                :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
            />
            <p class="icons__item__desc">{{ item.desc }}</p>
        </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
    name: "StaticPart",
    setup() {
        const iconItemList = [
            { id: 1, imgName: "超市", desc: "超市便利" },
            { id: 2, imgName: "菜市场", desc: "菜市场" },
            { id: 3, imgName: "水果店", desc: "水果店" },
            { id: 4, imgName: "鲜花", desc: "鲜花绿植" },
            { id: 5, imgName: "医药健康", desc: "医药健康" },
            { id: 6, imgName: "家居", desc: "家居时尚" },
            { id: 7, imgName: "蛋糕", desc: "烘培蛋糕" },
            { id: 8, imgName: "签到", desc: "签到" },
            { id: 9, imgName: "大牌免运", desc: "大牌免运" },
            { id: 10, imgName: "红包", desc: "红包套餐" }
        ];
        return { iconItemList };
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/variable.scss";
.position {
    display: flex;
    justify-content: space-between;
    height: 0.22rem;
    color: $fontcolor;
    @include content_font;
    margin: 0.16rem 0;
    &__addr {
        font-size: 0.16rem;
        @include ellipsis;
    }
}
.search {
    width: 100%;
    position: relative;
    &__icon {
        height: 0.16rem;
        position: absolute;
        left: 0.16rem;
        top: 0.06rem;
        color:$search-iconColor;
    }
    &__input {
        height: 0.32rem;
        width: 100%;
        font-size: 0.16rem;
        color: #b7b7b7;
        border-radius: 0.16rem;
        border: none;
        background:$input-bgcolor;
        line-height: 0.32rem;
        padding-left: 0.44rem;
        box-sizing: border-box;
    }
}
.search__input {
    // background-image: Url("../../assets/search.png");
    // background-size: 0.16rem 0.16rem;
    // background-repeat: no-repeat;
    // background-position: 0.16rem 0.08rem;
}
.banner {
    width: 100%;
    // height: 0.86rem;
    margin: 0.12rem 0 0.16rem;
//     background-image: Url("http://www.dell-lee.com/imgs/vue3/banner.jpg");
//     background-size: contain;
    &__img{
        width: 100%;
    }
    }
.icons {
    width:100%;
    display: flex;
    flex-direction: row;    
    flex-wrap: wrap;
    width: 100%;
    &__item {
        width: 20%;
        margin-bottom: 0.16rem;
        text-align: center;
        &__img {
            width: 0.4rem;
            margin-bottom: 0.06rem;
        }
        &__desc {
            font-size: 0.12rem;
        }
    }
}
.gap {
    height: 0.1rem;
    margin: 0 -0.18rem;
    background: $bgColor;
}
</style>
