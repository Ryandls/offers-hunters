import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import VueCompositionAPI from "@vue/composition-api";
import { httpG } from "@/http";
import { ToastPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

//libs
import "@/libs/money";
import "@/libs/moment"

//plugins
Vue.use(ToastPlugin);

import GAuth from "vue-google-oauth2";
const gauthOption = {
  clientId:
    process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};
Vue.use(GAuth, gauthOption);
Vue.use(VueCompositionAPI);

const store = Vue.observable({
  isAuthorization: false,
  userInfo: {},
  promotionId: null,
});
const actions = {
  changeAuthorization(payload) {
    store.isAuthorization = payload;
  },
  saveUserInfo(info) {
    store.userInfo = info;
  },
  saveIdPromotion(id) {
    store.promotionId = id;
  },
};

Vue.prototype.$store = store;
Vue.prototype.$actions = actions;
Vue.prototype.$userInfoHandler = userInfoHandler;

const userInfoHandler = async () => {
  const userInfo = {};

  await httpG
    .get(`oauth2/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${localStorage.AccessToken}`,
      },
    })
    .then((response) => (userInfo.value = response.data))
    .catch((error) => error);

  actions.saveUserInfo(userInfo.value);
};

if (localStorage.AccessToken) {
  store.isAuthorization = true;
  userInfoHandler(localStorage.AccessToken);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
