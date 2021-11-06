<template lang="pug">
div
  .signup.columns.is-mobile.is-centered.is-vcentered 
    .column.is-11-mobile.is-8-tablet.is-6-desktop.is-5-widescreen.is-4-fullhd
      .box
        .content.is-flex.is-flex-direction-column.is-align-items-center
          figure.image.is-64x64
            img(src="@/assets/logo.png")
          p.title.is-5 Vue.App
          p.subtitle.is-5.m-1 SignUp
        form(@submit.prevent="SignUp()")
          .field 
            label.label Name
            .control
              input.input(
                type="text", 
                placeholder="Name", 
                v-model="userData.nombre", 
                required)
          .field
            label.label Email
            .control
              input.input(
                type="email", 
                placeholder="example@gmail.com", 
                v-model="userData.email", 
                required)
          .field
            label.label Password
            .control
              input.input(
                type="password", 
                placeholder="********", 
                v-model="userData.contraseña", 
                required)
          .field.is-flex.is-flex-direction-column.is-align-items-center
            label.label Select your asociated companie 
            .select.is-rounded
              select(v-model="userData.idCompanie", required)
                option(v-for="(companie, index) in companies", :key="index", :value="companie.id") {{companie.nombre}}
          .buttons.is-flex.is-flex-direction-column.is-centered
            button.button.is-primary.is-small(type="submit") Sign Up
            button.button.is-small.is-ghost(@click="LogIn()") Go to Log In
  .column.is-11-mobile
    .modal(:class="modalNotification ? 'is-active' : 'is-hidden'")
      .modal-background.is-flex.is-align-items-center
        .modal-content
          .notification(:class="isCreated ? 'is-success' : 'is-danger'")
            button.delete(@click="toggleNotification()")
            p {{ notification }} 

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SignUp extends Vue {
  // Data
  companies: any = [{ nombre: "" }];
  userData: any = {
    nombre: "",
    idCompanie: "",
    contraseña: "",
    email: "",
  };
  notification = "Texto de notificacion";
  modalNotification = false;
  isCreated = false;

  // Hooks
  async created() {
    try {
      await this.$store.dispatch("getCompanies");
      const listaCompañias = await this.$store.state.companies;
      return (this.companies = listaCompañias);
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  // Methods
  LogIn() {
    this.$router.push({ name: "LogIn" });
  }

  async SignUp() {
    try {
      const data = await this.$store
        .dispatch("signup", {
          nombre: this.userData.nombre,
          contraseña: this.userData.contraseña,
          email: this.userData.email,
          idCompanie: this.userData.idCompanie,
        })
        .then(() => {
          this.notification = "Se ha creado el nuevo usuario";
          this.isCreated = true;
          this.toggleNotification();
          setTimeout(() => {
            this.$router.push({ name: "LogIn" });
          }, 3000);
        })
        .catch((err) => {
          if (err.message.includes("already exists")) {
            this.notification = "El usuario ya existe";
            this.isCreated = false;
            this.toggleNotification();
          } else {
            this.notification = err.message;
            this.isCreated = false;
            this.toggleNotification();
          }
        });
    } catch (err: any) {
      throw new Error(`${err}`);
    }
  }

  toggleNotification() {
    this.modalNotification = !this.modalNotification;
  }
}
</script>

<style lang="stylus">
.signup
  height 100vh
</style>
