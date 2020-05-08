<template>
  <div class="page">
    <Hero title="Whoops! We couldn't find that page." class="hero" />
  </div>
</template>

<script>
  import Hero from '@/components/Hero'

  export default {
    name: 'NotFound',
    components: {
      Hero
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: $color-error;
  }
</style>
