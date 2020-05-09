<template>
  <div v-if="isLoggedIn && !isBanned" class="page">
    <Hero :size="HeroSize.half" title="Write" class="hero" />
    <Form />
  </div>
  <LoginRequired v-else />
</template>

<script>
  import LoginRequired from '@/components/LoginRequired'
  import { isLoggedIn, isBanned } from '@/database/variables'
  import Hero, { HeroSize } from '@/components/Hero'
  import Form from './Form'

  export default {
    name: 'Write',
    components: {
      LoginRequired,
      Hero,
      Form
    },
    data() {
      return {
        isLoggedIn,
        isBanned,
        HeroSize
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: darken($color: $color-primary, $amount: 10);
    color: $color-primary-text;
  }
</style>
