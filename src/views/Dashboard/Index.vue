<template lang="pug">
div
  nav.navbar.is-transparent(role="navigation", aria-label="main navigation").has-shadow
    .navbar-brand
      .navbar-item
        img(src="@/assets/logo.png", alt="logo", width="28", height="28")
      p.title.m-2.has-text-dark Vue.app
    .navbar-end
      .navbar-item.has-dropdown.is-hoverable
        a.navbar-link.has-text-dark {{user}}
        .navbar-dropdown
          a.navbar-item.has-text-dark Historial
          hr.navbar-divider
          .navbar-item
            a.has-text-dark Sign Out
  section
    router-view 
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Dashboard extends Vue {
  // Data

  // Computed
  get user(): string {
    return this.$store.state.userData.email;
  }

  // Hooks
  async created() {
    try {
      const companie = await this.$store.state.userData.idCompanie;
      const token = this.$store.state.userToken;
      await this.$store
        .dispatch("getProyects", {
          id: companie,
          token,
        })
        .then(() => {
          const id = this.$store.state.userData.idCompanie;
          this.$store.dispatch("getCompanies", {
            id,
          });
        });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
</script>
