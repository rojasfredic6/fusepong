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
  .columns.is-3.is-variable
    .column
      .box I'm in a box
    .column 2
    .column 3
    .column 4
    .column 5
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
  .block This text is within a 
    strong block 
    .block
      button.button.is-danger Un button
  .block  This text is within a 
    strong second block
    | Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat magni blanditiis aliquam eos corrupti aperiam minus, debitis voluptate rem ea ipsam atque non! Ipsum assumenda voluptate eligendi, sapiente cum quae.
  .block This text is within a
    strong third block.
    | This block has no margin at the bottom
  form.box
    .field
      label.label Email
      .control
        input.input(type="email", placeholder="e.g. alex@example.com")
    .field
      label.label Password
      .control
        input.input(type="password", placeholder="*******")
    button.button.is-primary Sign in
  .box
    article.media
      .media-left
        figure.image.is-64x64
          img(src="https://bulma.io/images/placeholders/128x128.png" alt="Image")
      .media-content
        .content 
          p
            strong John Smith 
            small @johnsmith
            small 31m
            br
            | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eos tempore commodi nostrum quas beatae ex temporibus modi a laborum. Necessitatibus, quaerat ex! Magni debitis dolorum accusantium minima? Libero, hic?
        .level.is-mobile
          .level-left
            a.level-item(aria-label="replay")
              span.icon.is-small
                i.fas.fa-replay(aria-hidden="true")
            a.level-item(aria-label="retweet")
              span.icon.is-small
                i.fas.fa-retweet(aria-hidden="true")
            a.level-item(aria-label="like")
              span.icon.is-small
                i.fas.fa-heart(aria-hidden="true")
</template>

<style lang="scss">
@import "bulma-dracula/src/bulma-dracula.scss";
* {
  // border: 1px tomato solid;
}
</style>
