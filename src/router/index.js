import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from "../views/home/Home.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        // component: Home

        component: () =>
            import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
    },
    {
        path: "/cart",
        name: "CartList",
        component: () =>
            import(/* webpackChunkName: "cart" */ "../views/cart/CartList.vue")
    },
    {
        path: "/order/",
        name: "Order",
        component: () =>
            import(/* webpackChunkName: "order" */ "../views/order/Order.vue")
    },
    {
        path: "/submitOrder/:id",
        name: "OrderByShop",
        component: () =>
            import(
                /* webpackChunkName: "submitOrder" */ "../views/submitOrder/OrderByShop.vue"
            )
    },
    {
        path: "/my",
        name: "My",
        component: () =>
            import(/* webpackChunkName: "my" */ "../views/my/My.vue")
    },
    {
        path: "/myAddress",
        name: "MyAddress",
        component: () =>
            import(/* webpackChunkName: "myAddress" */ "../views/myAddress/MyAddress.vue")
    },
    {
        path: "/selAddress",
        name: "SelAddress",
        component: () =>
            import(/* webpackChunkName: "myAddress" */ "../views/myAddress/SelAddress.vue")
    },
    {
        path: "/myAddress/create",
        name: "CreateAddress",
        component: () =>
            import(/* webpackChunkName: "createAddress" */ "../views/myAddress/CreateAddress.vue")
    },
    {
        path: "/myAddress/modify/:id",
        name: "ModifyAddress",
        component: () =>
            import(/* webpackChunkName: "modifyAddress" */ "../views/myAddress/ModifyAddress.vue")
    },
    {
        path: "/shop/:id",
        name: "Shop",
        component: () =>
            import(/* webpackChunkName: "shop" */ "../views/shop/Shop.vue")
    },

    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
        beforeEnter(to, from, next) {
            const isLogin = localStorage.isLogin;
            if (isLogin) {
                next({ name: "Home" });
            } else {
                next();
            }
        }
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(
                /* webpackChunkName: "register" */ "../views/register/Register.vue"
            ),
        beforeEnter(to, from, next) {
            const { isLogin } = localStorage;
            isLogin ? next({ name: "Home" }) : next();
        }
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.isLogin;
  if(isLogin || to.name==="Login"||to.name==="Register"){
    next()
  }else{
    next({name:'Login'})
  }
  
})

export default router
