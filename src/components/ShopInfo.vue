<template>
    <div class="shop">
        <img :src="item.imgUrl" alt="" class="shop__img" />
        <div :class="{'shop__content':true,'shop__content--border':hideborder? false: true}">
            <div class="shop__content__title">{{ item.name }}</div>
            <div class="shop__content__tags">
                <span class="shop__content__tag">月售:{{ item.sales }}</span>
                <span class="shop__content__tag"
                    >起送:{{ item.expressLimit }}</span
                >
                <span class="shop__content__tag"
                    >基础运费:{{ item.expressPrice }}</span
                >
            </div>
            <div class="shop__content__highlight">
                {{ item.slogan }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShopInfo',
    props: ["item","hideborder"]
};
</script>

<style lang="scss" scoped>
.shop {
    display: flex;
    flex-direction: row;
    margin-top: 0.12rem;
    &__img {
        width: 0.56rem;
        height: 0.56rem;
        margin-right: 0.16rem;
    }
    &__content {
        &--border{
        border-bottom: 0.01rem solid #f1f1f1;
        }
        &__title {
            font-size: 0.16rem;
        }
        &__tags {
            margin: 0.08rem 0;
        }
        &__tag {
            margin-right: 0.16rem;
        }
        &__highlight {
            margin-bottom: 0.12rem;
            color: #e93b3b;
        }
    }
}
</style>
