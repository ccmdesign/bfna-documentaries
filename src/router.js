import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import Analytics from "vue-analytics";
import store from "./store";

import Home from "./views/Home.vue";
import watchView from "./views/Watch.vue";
import documentariesView from "./views/Documentaries.vue";
import AboutUs from "./views/AboutUs.vue";
import documentaryLarge from "./views/documentaryLarge.vue";


Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/watch",
      name: "watch",
      component: watchView,
    },
    {
      path: "/watch/:videoId",
      name: "watchVideoId",
      component: watchView,
    },
    {
      path: "/documentaries",
      name: "documentaries",
      component: documentariesView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutUs,
    },
    {
      path: "/:id",
      name: "documentaryLarge",
      component: documentaryLarge,
    }
  ],
});

router.afterEach(() => {
  store.commit("setMenuVisibility", false);
});

// Vue.use(Analytics, {
//   id: 'UA-132739165-8',
//   router
// })

export default router;
