<template>
  <article class="body">
    <p v-for="item in paragraphs" :key="item.ident" class="body--content">
      {{ item.content }}
    </p>
  </article>
</template>

<script>
  export default {
    name: 'Body',
    props: ['paragraphs']
  }
</script>

<style lang="scss" scoped>
  .body {
    @include flex(column);
    margin: 10px auto;
    width: 100%;
    &--content {
      @include mobile {
        font-size: 1.225em;
      }
      @include desktop {
        font-size: 1.25em;
      }
      margin: 15px 0;
      line-height: 170%;
    }
  }
</style>
