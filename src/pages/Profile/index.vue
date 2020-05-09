<template>
  <div v-if="isLoggedIn" class="page">
    <Hero :size="HeroSize.half" title="Profile" class="hero" />
    <div class="wrapper">
      <About />
      <Actions />
      <Stories />
    </div>
  </div>
  <LoginRequired v-else />
</template>

<script>
  import About from './About'
  import Actions from './Actions'
  import { isLoggedIn } from '@/database/variables'
  import LoginRequired from '@/components/LoginRequired'
  import Hero, { HeroSize } from '@/components/Hero'
  import Stories from './Stories'

  export default {
    name: 'Profile',
    components: {
      About,
      Actions,
      LoginRequired,
      Hero,
      Stories
    },
    data() {
      return {
        HeroSize,
        isLoggedIn
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: darken($color: $color-primary, $amount: 10);
    color: $color-primary-text;
  }
  .wrapper {
    @include flex(column);
    margin: 20px 0;
    align-items: center;
  }
</style>
