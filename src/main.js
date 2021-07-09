import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCjgKO4iKBuhyxBFdNkuB1bfOPDRmA_Wrc",
  authDomain: "reserva-tu-mesa-online-498ac.firebaseapp.com",
  projectId: "reserva-tu-mesa-online-498ac",
  databaseURL:"https://reserva-tu-mesa-online-498ac-default-rtdb.firebaseio.com/",
  storageBucket: "reserva-tu-mesa-online-498ac.appspot.com",
  messagingSenderId: "23831760612",
  appId: "1:23831760612:web:bcf66038a3b506fb98e6f1"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
