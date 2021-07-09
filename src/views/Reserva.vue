<template>
<div>
    <v-container fluid fill-height class="fondo">
      <v-row>
        <v-col class="white" cols="4">
          <v-form  @submit.prevent="enviarReserva">
            <v-select
              :items="listaRestaurantes"
              :menu-props="{ botton: true, offsetY: true }"
              label="Restaurantes:"
              required
              v-model="reserva.restaurante"
            ></v-select>

            <v-text-field
              v-model="reserva.nombreCliente"
              label="Nombre Cliente:"
              required
            ></v-text-field>

            <v-text-field
              v-model="reserva.fechaReserva"
              label="Fecha de Reserva:"
              type="date"
              required
            ></v-text-field>

            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Hora de Reserva"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>

            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <v-time-picker v-if="modal2" v-model="time" full-width>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(time)">
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>

            <v-text-field
              v-model="reserva.telefonoCliente"
              label="Número de Telefono:"
              required
            ></v-text-field>

            <v-text-field
              v-model="reserva.cantidadPersonas"
              label="Número de Personas:"
              required
            ></v-text-field>

            <v-btn class="mr-4" type="submit" > submit </v-btn>
          </v-form>
        </v-col>
                <v-col cols="8">
             <v-data-table
    :headers="headers"
    :items="reserves"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
</div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions } from "vuex";
export default {
  name: "Reserva",
  data() {
    return {
      time: null,
      menu2: false,
      modal2: false,
      reserves:[],
      headers: [
          { text: 'Restaurante', value:'restaurante' },
          { text: 'Fecha de Reserva', value:'fechaReserva' },
          { text: 'Fecha de Reservación', value:'fechaReservacion' },
          { text: 'Hora de Reservación', value:'horaReserva' },
          { text: 'Nombre de Cliente', value:'nombreCliente' },
          { text: 'Teléfono Cliente',value:'telefonoCliente' },
          { text: 'Cantidad Personas',value:'cantidadPersonas' },
        ],
        datos: []
    };
    
  },
  computed: {
    ...mapState(["reserva", "listaRestaurantes"]),
  },
  methods: {
    ...mapActions(["displayListaRestaurantes"]),
    enviarReserva: function (){
    let reserva = {
      restaurante: this.reserva.restaurante,
      fechaReservacion: new Date().toLocaleDateString(),
      fechaReserva: this.reserva.fechaReserva,
      horaReserva: this.time,
      nombreCliente: this.reserva.nombreCliente,
      telefonoCliente: this.reserva.telefonoCliente,
      cantidadPersonas: this.reserva.cantidadPersonas
    
    };
    firebase.database().ref("enviarReserva").push(reserva);
    }

  },
  mounted() {
    this.displayListaRestaurantes();
    const tablaReservas = firebase.database().ref("enviarReserva");

    tablaReservas.on("value", snapshot =>{
            let data= snapshot.val();
            console.log(data)
            let reservesTemp =[]
            Object.keys(data).forEach(key=>{
                    reservesTemp.push({
                        restaurante: data[key].restaurante,
                        cantidadPersonas: data[key].cantidadPersonas,
                        fechaReserva: data[key].fechaReserva,
                        fechaReservacion: data[key].fechaReservacion,
                        horaReserva: data[key].horaReserva,
                        nombreCliente: data[key].nombreCliente,
                        telefonoCliente: data[key].telefonoCliente
                    })
            })
            this.reserves = reservesTemp
            console.log(this.reserves)
        })
  },
};
</script>

<style>
.white{
    color:white;
}
.fondo{
    background-image: url("https://img.abc-mallorca.com/images/2018/02/el-patio-de-gloria-restaurant-4.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style>
