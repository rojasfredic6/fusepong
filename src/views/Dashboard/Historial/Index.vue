<template lang="pug">
p Historial 
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
      this.ListaDeTickets = tickets.data;
    } catch (err: any) {
      throw new Error(`${err.response.data}`);
      
    }
  }
}
</script>
