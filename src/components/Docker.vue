<template>
    <div class="docker">
        <div
            :class="{ docker__item: true, 'docker__item--active': index === currentIndex }"
            v-for="(item, index) in dockerLis"
            :key="item.icon"
        >
            <router-link :to="item.to">
                <div class="iconfont docker__icon" v-html="item.icon" />
                <div class="docker__title">{{ item.text }}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Docker",
    props:['currentIndex'],
    setup() {
        const dockerLis = [
            { icon: "&#xe752;", text: "home", to: { name: "Home" } },
            { icon: "&#xe604;", text: "cart", to: { name: "CartList" } },
            { icon: "&#xe619;", text: "order", to: { name: "Order" } },
            { icon: "&#xe609;", text: "my", to: { name: "My" } }
        ];
        return { dockerLis };
    }
};
</script>

<style lang="scss" scoped>
@import "../style/variable.scss";

.docker {
    width: 100%;
    height: 0.49rem;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0rem;
    padding: 0 0.18rem;
    box-sizing: border-box;
    box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;
    color: $fontcolor;
    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 0.49rem;
        margin: 0;
        text-decoration: none;
        a {
            text-decoration: none;
            color: #333;
        }
        &--active {
            a {
                color: #1fa4fc;
            }
        }
    }
}
.docker .docker__item--active {
    color: #1fa4fc;
}
</style>
