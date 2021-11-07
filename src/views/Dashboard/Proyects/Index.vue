<template lang="pug">
div
  .container.is-fluid
    p.title.mt-2.has-text-centered {{CompanieInfo.nombre}}
    .columns.mt-2.is-multiline.is-vcentered
      .column.is-4-desktop(v-for="(p, index) in  CompanieData")
        .box
          p.subtitle.is-4.has-text-centered {{ p.nombreProyecto}}
          .notification.is-link(v-for="(h, index) in p.historias")
            button.delete(@click="deleteHistory(h.id)")
            p.subtitle.is-5(
              @click="toHistory(h.id)"
              style="cursor: pointer") {{ h.nombreHistoria}}
            p {{h.descripcionHistoria}}
          button.button.is-primary.is-rounded.is-fullwidth(
            @click="[selectedProyect(p.id), toggleModalHistoria()]") Agregar Historia
  .modal.is-active(v-show="modalCrearHistoria")
    .modal-background
    .modal-content
      .box
        p.subtitle.is-2 Crear Historia
        form(@submit.prevent="createHistory()")
          .field
            label.label Nombre Historia
            .control
              input.input(
                type="text", 
                placeholder="Agregar Nombre", 
                v-model="historiaData.nombreHistoria"
                required)
          .field
            label.label Descripcion Historia 
            .control
              input.input(
                type="textarea", 
                placeholder="Agregar Descripcion", 
                minlength="20", 
                v-model="historiaData.descripcionHistoria",
                required)
          .field
            label.label Descripcion Ticket Inicial 
            .control
              input.input(
                type="textarea", 
                placeholder="Agregar Descripcion", 
                minlength="20", 
                v-model="historiaData.descripcionTicketInicial"
                required)
          .buttons.is-right
            button.button.is-primary.is-small.is-right.is-rounded(
              type="submit"
              ) Crear Historia
    .modal-close.is-large(@click="toggleModalHistoria()")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { createHistory, createTicket, deleteHistory } from "@/api/api";

@Component
export default class Proyects extends Vue {
  //Data
  historiaData: any = {
    nombreHistoria: "",
    descripcionHistoria: "",
    descripcionTicketInicial: "",
    proyecto: "",
  };

  modalCrearHistoria = false;

  // Computed
  get CompanieData() {
    return this.$store.state.companieProyects;
  }

  get CompanieInfo() {
    return this.$store.state.companieInfo;
  }

  // Methods
  selectedProyect(id: string) {
    this.historiaData.proyecto = id;
  }

  toggleModalHistoria() {
    this.modalCrearHistoria = !this.modalCrearHistoria;
  }

  toHistory(id: string) {
    this.$router.push({ name: "History", params: { id } });
  }

  async createHistory() {
    try {
      const user = await this.$store.state.userData.id;
      const token = await this.$store.state.userToken;
      const historiaCreada = await createHistory({
        idUsuario: user,
        nombreHistoria: this.historiaData.nombreHistoria,
        descripcionHistoria: this.historiaData.descripcionHistoria,
        proyecto: this.historiaData.proyecto,
        token,
      });
      const historiaId = historiaCreada.data.id;
      console.log(historiaId);
      const ticketInicial = await createTicket({
        descripcionTicket: this.historiaData.descripcionTicketInicial,
        historia: historiaId,
        estadoTicket: "Activo",
        user: user,
        token,
      });
      await this.$store.dispatch("getProyects", {
        id: this.CompanieInfo.id,
        token,
      });
      this.toggleModalHistoria();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteHistory(id: string) {
    try {
      const token = this.$store.state.userToken;
      const eliminar = await deleteHistory({
        token,
        id,
      });
      await this.$store.dispatch("getProyects", {
        id: this.CompanieInfo.id,
        token,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
</script>
