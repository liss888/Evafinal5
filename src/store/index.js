import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "../router"
import axios from "axios";
//import auth from "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reserva: {
      restaurante: "",
      fechaReservacion: "",
      fechaReserva: "",
      horaReserva: "",
      nombreCliente: "",
      telefonoCliente: "",
      cantidadPersonas: "",
    },
    listaRestaurantes: [],
    login: false,
    logged: false,
    token: "",
    usuarioFirebase: "",
    passwordFirebase: ""
  },

  mutations: {

    loginFirebase(state) {
      firebase.auth().signInWithEmailAndPassword(state.usuarioFirebase, state.passwordFirebase)
        .then(user => {
          alert("El usuario " + user.user.email + " está conectado")
          state.logged = true;
          router.push("/reserva")
          state.login = true
        })
        .catch(error => {
          alert("Ups algo salió mal" + error.message)
        })
    },

    cargarListaDeRestaurantes(state, posts) {
      
      state.listaRestaurantes = posts
    },
  },

  actions: {

    loginActionFirebase(context, body) {
      context.commit("loginFirebase", body)
    },

    displayListaRestaurantes: async function(context) {
      const posts = await axios.get("https://mocki.io/v1/3fd2739c-05de-4bf0-a4a7-f451a7a35611");
      const datarestaurantes = posts.data.results.map((options) => {
          return {
              restaurante: options.name,
              text: options.name,
              value: options.name,
          };
      });
      context.commit("cargarListaDeRestaurantes", datarestaurantes);
  }
    
  },

})

