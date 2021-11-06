<template lang="pug">
div
  .login.columns.is-mobile.is-centered.is-vcentered
    .column.is-11-mobile.is-6-tablet.is-6-desktop.is-5-widescreen.is-4-fullhd
      .box
        .content.is-flex.is-flex-direction-column.is-align-items-center
          figure.image.is-64x64
            img(src="@/assets/logo.png")
          p.title.is-5 Vue.App
          p.subtitle.is-5.m-1 LogIn
        form(@submit.prevent="logIn()")
          .field
            label.label Email
            .control
              input.input(
                type="email", 
                placeholder="example@gmail.com",
                v-model="userData.email"
                required)
          .field
            label.label Password
            .control
              input.input(
                type="password", 
                placeholder="********",
                minlength="8",
                v-model="userData.password"
                required)
          .buttons.is-flex.is-flex-direction-column.is-centered
            button.button.is-primary.is-small-mobile(type="submit") Log In
            button.button.is-small-mobile.is-ghost(@click="toSignUp()") Sign Up     
  .column.is-11-mobile
    .modal(:class="modalNotification ? 'is-active' : 'is-hidden'")
      .modal-background.is-flex.is-align-items-center
        .modal-content
          .notification.is-danger
            button.delete(@click="toggleNotification()")
            p {{ notification }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LogIn extends Vue {
  // Data
  userData: any = {
    email: "",
    password: "",
  };
  notification = "";
  modalNotification = false;

  // Methods

  toSignUp() {
    this.$router.push({ name: "SignUp" });
  }

  toggleNotification() {
    this.modalNotification = !this.modalNotification;
  }

  async logIn() {
    try {
      await this.$store
        .dispatch("login", {
          email: this.userData.email,
          contraseña: this.userData.password,
        })
        .then((response) => {
          // console.log(response)
          this.$router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          this.notification = err.message;
          this.toggleNotification();
        });
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
</script>

<style lang="scss">
.login {
  height: 100vh;
}
</style>
