<template lang="pug">
div
  .container.is-fluid
    p.title.mt-2.has-text-centered Coleccion de Tickets
    .columns.mt-2.is-multiline.is-vcentered
      .column.is-4-desktop(v-for="(p, index) in ListaDeTickets")
        .box
          p.subtitle.is-4.has-text-centered {{ p.historia.nombreHistoria }}
          .notification.is-link(
            style="cursor: pointer",
            @click="toHistoria(p.historia.id)")
            p.subtitle.is-5() {{ p.descripcionTicket }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { historialByUser } from "@/api/api";

@Component
export default class Historial extends Vue {
  // Data
  ListaDeTickets: any = {};

  //Hooks
  async created() {
    try {
      const id = this.$route.params.id;
      const token = await this.$store.state.userToken;
      const tickets = await historialByUser({
        id,
        token,
      });
      this.ListaDeTickets = JSON.parse(JSON.stringify(tickets.data));
    } catch (err: any) {
      throw new Error(`${err.response.data}`);
    }
  }

  toHistoria(id:string){
    this.$router.push({ name:"History", params: { id}})
  }
}
</script>
