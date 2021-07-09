<template>
    <div style="height: 100%" class="d-flex justify-center align-center">
    <v-card flat class="px-8 py-8" :min-width="$vuetify.breakpoint.xs ? '100vw' : '30vw'">
        <h1 class="blue-grey--text text--darken-3 mt-4">Iniciar sesión</h1>
        <v-form v-on:submit.prevent="loginActionFirebase">
            <v-text-field type="email" label="Nombre de usuario" v-model="$store.state.usuarioFirebase"  autofocus/>
            <v-text-field type="password" v-model="$store.state.passwordFirebase" label="Contraseña"/>
            <v-btn type="submit" class="self-center mt-4" elevation="0" color="blue-grey" dark large block>Iniciar</v-btn>
        </v-form>
    </v-card>
    </div>
</template>
<script>
import {mapActions} from "vuex"; 
export default {
    name:"Login",
    data(){
    return{
        usuarioFirebase:"",
        passwordFirebase:"",

    }
    },
    computed: {
    
    },
    methods:{
        ...mapActions(["loginActionFirebase"]),
        
    }
}
</script>
<style>

</style>