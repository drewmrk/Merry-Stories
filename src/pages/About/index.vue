<template>
  <div class="page">
    <Hero :size="HeroSize.half" title="About" class="hero" />
    <div class="wrapper">
      <p class="text">
        Merry Stories is a website where anyone can write happy and heartwarming
        stories to be cherrished by those that need a little joy in their day.
      </p>
    </div>
  </div>
</template>

<script>
  import Hero, { HeroSize } from '@/components/Hero'

  export default {
    name: 'About',
    components: {
      Hero
    },
    data() {
      return {
        HeroSize
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: $color-success;
  }
  .wrapper {
    @include mobile {
      padding: 5px 15px;
    }
    @include desktop {
      padding: 10px 20px;
    }
    @include flex(column);
    align-items: center;
    margin: 20px 0;
    .text {
      @include mobile {
        font-size: 1.45em;
      }
      @include desktop {
        font-size: 1.5em;
        max-width: 50%;
      }
      line-height: 170%;
    }
  }
</style>
