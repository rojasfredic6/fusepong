<template lang="pug">
.app
  .container.is-flex.is-justify-content-center.is-align-items-center
    .box
      .content.is-flex.is-flex-direction-column.is-align-items-center
        figure.image.is-64x64
          img(src="@/assets/logo.png")
        p.title.is-6 Vue.App
      form
        .field 
          label.label Name
          .control.has-icons-left
            input.input.is-danger(type="text", placeholder="Name")
            span.icon.is-small.is-left
              i.fas.fa-envelope
            p.help.is-danger This input is empty
        .field
          label.label Email
          .control.has-icons-left
            input.input.is-danger(type="email", placeholder="example@gmail.com")
            span.icon.is-small.is-left
              i.fas.fa-envelope
          p.help.is-danger This email is invalid 
        .field
          label.label Password
          .control
            input.input.is-danger(type="password", placeholder="********")
          p.help.is-danger This email is invalid 
        .buttons.is-flex.is-flex-direction-column.is-centered
          button.button.is-primary.is-small Sign Up
          button.button.is-small.is-ghost Go to Log In
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "SignUp"
})
</script>
</script>
