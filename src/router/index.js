import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
        path: "",
        name: "First",
        component: () =>
            import ("../views/Nav.vue"),
        children: [{
                path: "/Home",
                name: "Home",
                component: () =>
                    import ("../views/Home.vue"),
            },
            {
                path: "/My",
                name: "My",
                component: () =>
                    import ("../views/My.vue"),
            },
        ]
    },

    {
        path: "/Login",
        name: "Login",
        component: () =>
            import ("../views/Login.vue"),
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;