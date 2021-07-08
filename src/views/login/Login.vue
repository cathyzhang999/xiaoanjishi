<template>
    <div class="wrapper">
        <img
            class="wrapper__portrait"
            img
            src="http://www.dell-lee.com/imgs/vue3/user.png"
            alt=""
        />
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                type="text"
                placeholder="input your phone number"
                v-model="data.username"
            />
        </div>
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                type="password"
                placeholder="input your password"
                v-model="data.password"
                autocomplete="new-password"
            />
        </div>
        <div class="wrapper__input">
            <button class="wrapper__input__btn" @click="handleLogin">
                login in
            </button>
        </div>
        <div class="wrapper__link">
            <!-- <router-link :to="{name:'Register'}"> -->
            <span class="wrapper__link__btn" @click="handleRegisterClick"
                >立即注册</span
            >
            <!-- </router-link> -->
            <span class="wrapper__link__line">|</span>
            <span class="wrapper__link__btn">忘记密码</span>
        </div>
        <Toast v-if="toastData.isShowToast" :message="toastData.toastMessage" />
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { post } from "../../utils/request.js";
import Toast, { useToastEffect } from "../../components/Toast";

// axios.defaults.headers.post['content-type']='application/json'
const handleLoginEffect = showToast => {
    const router = useRouter();
    const data = reactive({
        username: "",
        password: ""
    });
    const handleLogin = async () => {
        try {
            const result = await post("/api/user/login", {
                username: data.username,
                password: data.password
            });
            // console.log(result)
            if (result?.errno === 0) {
                localStorage.isLogin = true;
                router.push({ name: "Home" });
            } else {
                showToast("login fail");
            }
        } catch (e) {
            showToast("requesst fail");
        }
    };
    return { data, handleLogin };
};

export default {
    name: "Login",
    components: { Toast },
    setup() {
        const router=useRouter()
        const { toastData, showToast } = useToastEffect();
        const { data, handleLogin } = handleLoginEffect(showToast);

        const handleRegisterClick = () => {
            router.push({ name: "Register" });
        };
        return { data, handleLogin, handleRegisterClick, toastData };
    }
};
</script>

<style lang="scss" scoped>
@import "../../style/variable.scss";
.wrapper {
    // width: 3.75rem;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    margin: 0 0.4rem;
    &__portrait {
        display: block;
        margin: 0rem auto 0.24rem;
        width: 0.66rem;
    }
    &__input {
        margin: 0.16rem 0;
        &__content {
            width: 100%;
            height: 0.48rem;
            box-sizing: border-box;
            font-size: 0.16rem;
            padding-left: 0.16rem;
            background: #f9f9f9;
            border: 0.01rem solid rgba(0, 0, 0, 0.1);
            border-radius: 0.06rem;
            &::placeholder {
                color: $input-fontcolor;
            }
        }
        &__btn {
            width: 100%;
            height: 0.48rem;
            box-sizing: border-box;
            font-size: 0.16rem;
            border: none;
            background: #0091ff;
            box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
            border-radius: 0.04rem;
            color: white;
        }
    }
    &__link {
        width: 100%;
        text-align: center;
        color: $input-fontcolor;
        &__btn {
            font-size: 0.14rem;
            padding: 0 0.14rem;
            // border-right:1px solid rgba(0,0,0,0.50);
        }
        &__line {
            font-size: 0.14rem;
            text-decoration: none;
        }
    }
}
</style>
