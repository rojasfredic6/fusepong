<template lang="pug">
.container.is-fluid
  p.title.mt-2.has-text-centered {{CompanieInfo.nombre}}
  p.subtitle.mt-2.has-text-centered Titulos de la Historia
  p.subtitle.is-6.mt-2.has-text-centered Titulos del Proyecto
  .columns.mt-2
    .column.is-8
      p.subtitle.is-4.has-text-centered Tiquets
      .box
        .notification(v-for="t in 3")
          button.delete
          p Notificacion de Tiquet
        button.button.is-primary.is-rounded.is-fullwidth Agregar Tiquet
    .column.is-4
      p.subtitle.is-4.has-text-centered Comentarios
      .box
        .notification
          button.delete
          p Notificacion de Tiquet
        button.button.is-primary.is-rounded.is-fullwidth Agregar Comentario
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class Historias extends Vue {
  get CompanieInfo(){
    return this.$store.state.companieInfo
  }
}
</script>