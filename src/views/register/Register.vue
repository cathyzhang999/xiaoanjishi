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
                placeholder="input your username"
                v-model="username"
            />
        </div>
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                type="password"
                placeholder="input your password"
                v-model="pwd"
                autocomplete="new-password"
            />
        </div>
        <div class="wrapper__input">
            <input
                class="wrapper__input__content"
                type="password"
                placeholder="confirm your password"
                v-model="rePwd"
            />
        </div>
        <div class="wrapper__input">
            <button class="wrapper__input__btn" @click="handleRegister">
                Register
            </button>
        </div>
        <div class="wrapper__link">
            <span class="wrapper__link__btn" @click="GotoLoginClick"
                >have a account to log in</span
            >
        </div>
        <Toast v-if="toastData.isShowToast" :message="toastData.toastMessage" />
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const handleRegisterEffect = showToast => {
    const router = useRouter();
    const data = reactive({
        username: "",
        pwd: "",
        rePwd: ""
    });
    const handleRegister = async () => {
        const { username, pwd, rePwd } = data;
        if (!username || !pwd) {
            showToast("please enter username and password");
        } else if (pwd != rePwd) {
            showToast("the passwords you entered do not match");
        } else {
            try {
                const result = await post("/api/user/register", {
                    username: data.username,
                    password: data.pwd
                });
                if (result?.errno == 0) {
                    // localStorage.isLogin = true;
                    // localStorage.isRegister = true;
                    router.push({ name: "Login" });
                } else {
                    showToast("regsiter fail");
                }
            } catch (e) {
                showToast("request fail");
            }
        }
    };
    const { username, pwd, rePwd } = toRefs(data);
    return { handleRegister, username, pwd, rePwd };
};

export default {
    name: "Register",
    components: { Toast },
    setup() {
        const router = useRouter();

        const { toastData, showToast } = useToastEffect();
        const { handleRegister, username, pwd, rePwd } = handleRegisterEffect(
            showToast
        );
        const GotoLoginClick = () => {
            router.push({ name: "Login" });
        };

        return {
            handleRegister,
            toastData,
            username,
            pwd,
            rePwd,
            GotoLoginClick
        };
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
            // width: 2.95rem;
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
        // width: 2.95rem;
        text-align: center;
        color: $input-fontcolor;
        &__btn {
            font-size: 0.14rem;
            padding: 0 0.14rem;
            // border-right:1px solid rgba(0,0,0,0.50);
        }
        &__line {
            font-size: 0.14rem;
        }
    }
}
</style>
