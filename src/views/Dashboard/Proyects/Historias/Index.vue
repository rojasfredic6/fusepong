<template lang="pug">
div
  .container.is-fluid
    p.title.mt-2.has-text-centered {{CompanieInfo.nombre}}
    p.subtitle.mt-2.has-text-centered {{HistoriaData.nombreHistoria}}
    .columns.mt-2
      .column.is-8
        p.subtitle.is-4.has-text-centered Tickets
        .box
          .notification.is-success(
            v-for="(t, index) in HistoriaData.tickets")
            button.delete(@click="eliminarTicket(t.id)")
            p {{ t.descripcionTicket }}
            .buttons.is-right
              button.button.is-primary.is-light.is-rounded(
                @click="getComentarios(t.id)"
              ) Ver Comentarios
              button.button.is-primary.is-light.is-rounded(
                @click="[cargarInfoTicket(t.descripcionTicket, t.id, t.estadoTicket),toggleModalEditarTicket()]"
              ) Editar Ticket
          button.button.is-primary.is-rounded.is-fullwidth(
            @click="toggleModalTiquet()"
          ) Agregar Ticket
      .column.is-4
        p.subtitle.is-4.has-text-centered Comentarios
        .box
          p.subtitle.is-5.m-4.has-text-centered(v-if="!comentariosTicket") Da click en "Ver Comentarios" de algun ticket para ver sus comentarios
          .notification.is-info(v-else, v-for="(c,index) in comentariosTicket.comentarios")
            button.delete(@click="eliminarComentario(c.id)")
            p {{ c.comentario}}
          button.button.is-primary.is-rounded.is-fullwidth(
            v-show="addComentario",
            @click="toggleModalComenario"
            ) Agregar Comentario
  .modal.is-active(v-show="modalCrearTiquet")
    .modal-background
    .modal-content
      .box
        p.subtitle.is-2 Crear Ticket
        form(@submit.prevent="crearTicket()")
          .field
            label.label Descripcion Ticket
            .control
              input.input(
                type="textarea", 
                placeholder="Agregar Descripcion", 
                minlength="20", 
                v-model="ticketInfo.descripcionTicket"
                required)
          .buttons.is-right
            button.button.is-primary.is-small.is-right.is-rounded(
              type="submit",
              ) Crear Tiquet
    .modal-close.is-large(@click="toggleModalTiquet()")
  .modal.is-active(v-show="modalEditarTiquet")
    .modal-background
    .modal-content
      .box
        p.subtitle.is-2 Editar Ticket
        form(@submit.prevent="editarTicket()")
          .field
            label.label Descripcion Ticket
            .control
              input.input(
                type="textarea", 
                placeholder="Agregar Descripcion", 
                minlength="20", 
                v-model="ticketInfo.descripcionTicket"
                required)
          .field
            label.label Cambiar Estado
            .control
              .select.is-link.is-light
                select(v-model="ticketInfo.estadoTicket", required)
                  option(value="Activo") Activo
                  option(value="En Proceso") En Proceso
                  option(value="Finalizado") Finalizado
          .buttons.is-right
            button.button.is-primary.is-small.is-right.is-rounded(
              type="submit"
              ) Guardar
    .modal-close.is-large(@click="toggleModalEditarTicket()")
  .modal.is-active(v-show="modalAddComenario")
    .modal-background
    .modal-content
      .box
        p.subtitle.is-2 Agregar Comentario
        form(@submit.prevent="agregarComentario()")
          .field
            label.label Comenario
            .control
              input.input(
                type="textarea", 
                placeholder="Agregar Comentario", 
                v-model="comentarioInfo.comentario"
                required)
          .buttons.is-right
            button.button.is-primary.is-small.is-right.is-rounded(
              type="submit"
              ) Comentar
    .modal-close.is-large(@click="toggleModalComenario()")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getTicketWithComents,
  createTicket,
  deleteTicket,
  editarTicket,
  crearComentario,
  deleteComentario,
} from "@/api/api";

@Component
export default class Historias extends Vue {
  comentariosTicket: any = "";
  modalCrearTiquet = false;
  modalEditarTiquet = false;
  modalAddComenario = false;
  addComentario = false;
  ticketInfo = {
    descripcionTicket: "",
    estadoTicket: "",
    id: "",
  };
  comentarioInfo = {
    ticketId: "",
    comentario: "",
  };
  // Computed
  get HistoriaData() {
    return this.$store.state.historyData;
  }
  get CompanieInfo() {
    return this.$store.state.companieInfo;
  }
  //Hooks
  async created() {
    try {
      const token = this.$store.state.userToken;
      const id = this.$route.params.id;
      await this.$store.dispatch("getHistoryData", {
        id,
        token,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }

  //Methods
  toggleModalTiquet() {
    this.modalCrearTiquet = !this.modalCrearTiquet;
  }

  toggleModalEditarTicket() {
    this.modalEditarTiquet = !this.modalEditarTiquet;
  }

  toggleModalComenario() {
    this.modalAddComenario = !this.modalAddComenario;
  }

  cargarInfoTicket(descripcion: string, id: string, estado: string) {
    this.ticketInfo.descripcionTicket = descripcion;
    this.ticketInfo.id = id;
    this.ticketInfo.estadoTicket = estado;
  }

  async crearTicket() {
    try {
      const user = await this.$store.state.userData.id;
      const token = await this.$store.state.userToken;
      const ticket = await createTicket({
        descripcionTicket: this.ticketInfo.descripcionTicket,
        historia: this.HistoriaData.id,
        estadoTicket: "Activo",
        user: user,
        token,
      });
      const id = this.$route.params.id;
      await this.$store.dispatch("getHistoryData", {
        id,
        token,
      });
      this.toggleModalTiquet();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async editarTicket() {
    const route = this.$route.params.id;
    const token = await this.$store.state.userToken;
    await editarTicket({
      id: this.ticketInfo.id,
      token,
      descripcionTicket: this.ticketInfo.descripcionTicket,
      estadoTicket: this.ticketInfo.estadoTicket,
    });
    await this.$store.dispatch("getHistoryData", {
      id: route,
      token,
    });
    this.toggleModalEditarTicket();
  }

  async eliminarTicket(id: string) {
    const route = this.$route.params.id;
    const token = await this.$store.state.userToken;
    await deleteTicket({ id, token });
    await this.$store.dispatch("getHistoryData", {
      id: route,
      token,
    });
  }

  async getComentarios(id: string) {
    try {
      this.comentarioInfo.ticketId = id;
      const token = await this.$store.state.userToken;
      const ticket = await getTicketWithComents({ token, id });
      this.comentariosTicket = ticket.data[0];
      this.addComentario = true;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async agregarComentario() {
    try {
      const token = await this.$store.state.userToken;
      await crearComentario({
        token,
        ticket: this.comentarioInfo.ticketId,
        comentario: this.comentarioInfo.comentario,
      });
      await this.getComentarios(this.comentarioInfo.ticketId);
      this.toggleModalComenario();
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async eliminarComentario(id: string) {
    try {
      const token = await this.$store.state.userToken;
      await deleteComentario({
        token,
        id,
      });
      await this.getComentarios(this.comentarioInfo.ticketId);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
</script>
