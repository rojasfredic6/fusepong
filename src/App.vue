<template lang="pug">
.app.section
  .container 
    h1.title Hello World
    p.subtitle My first website with 
      strong Bulma
    button.button.is-primary.is-small Un Button
    button.button.is-link.is-medium Un Button
    button.button.is-info.is-large Un Button
    button.button.is-succes.is-outlined Un Button
    button.button.is-warning.is-loading Un Button
    button.button.is-danger.is-inverted(disabled) Un Button
  .columns.is-mobile.is-3.is-multiline.is-centered
    .column.is-1.is-3-desktop 
      .box I'm in a box
    .column.is-2 2
    .column.is-3 3
    .column.is-4 4
    .column.is-5 5
  .columns.is-mobile
    .column.is-half.is-offset-one-quarter uno
  .columns.is-mobile
    .column.is-three-fifths.is-offset-one-fifth dos
  .columns.is-mobile
    .column.is-4.is-offset-8 tres
  .columns.is-mobile 
    .column.is-11.is-offset-1 cuatro
  .columns
    .column.is-narrow
      .box(style="width: 200px")
      .title.is-5 Narrow Column
      .subtitle This column is only 200px wide
    .column
      .box
      .title.is-5 Flexible column
      .subtitle This column will take up the remaining space available 
</template>

<style lang="scss">
@import "bulma-dracula/src/bulma-dracula.scss";
* {
  border: 1px tomato solid;
}
</style>
