<template lang="pug">
.home
  p Holanda
  .button button
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Home",
  components: {},
})
export default class Home extends Vue {}
</script>
