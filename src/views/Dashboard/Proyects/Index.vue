<template lang="pug">
.container.is-fluid
  p.title.mt-2.has-text-centered {{CompanieInfo.nombre}}
  .columns.mt-2.is-multiline.is-vcentered
    .column.is-4-desktop(v-for="(p, index) in  CompanieData")
      .box
        p.subtitle.is-4.has-text-centered {{ p.nombreProyecto}}
        .notification(v-for="(h, index) in p.historias", @click="toHistory()")
          button.delete
          p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas eaque expedita nesciunt quos doloremque deleniti necessitatibus, amet qui suscipit odit quasi maxime sequi voluptatum repellat similique ex voluptatem reprehenderit eveniet?
        button.button.is-primary.is-rounded.is-fullwidth Agregar Historia
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class Proyects extends Vue {
  // Computed 
  get CompanieData(){
    return this.$store.state.companieProyects
  }

  get CompanieInfo(){
    return this.$store.state.companieInfo
  }

  toHistory(){
    this.$router.push({ name: 'History'})
  }
}
</script>

