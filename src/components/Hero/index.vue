<template>
  <div :class="`hero ${'hero--size--' + size}`">
    <h1 class="hero--title">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Hero',
    props: {
      title: {},
      size: {
        type: String,
        default: 'full'
      }
    }
  }

  export const HeroSize = {
    half: 'half',
    full: 'full'
  }
</script>

<style lang="scss" scoped>
  .hero {
    @include flex(column);
    padding: 10px 20px;
    width: 100%;
    justify-content: center;
    &--title {
      @include mobile {
        font-size: 2.5em;
      }
      @include desktop {
        font-size: 3.5em;
      }
      line-height: 140%;
      margin: 20px 0;
      font-weight: 600;
      text-align: center;
    }
  }
  // Sizes
  .hero--size--half {
    height: 30vh;
  }
  .hero--size--full {
    height: 100vh;
  }
</style>
