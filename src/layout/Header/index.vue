<template>
  <header class="header">
    <h1 class="header--title">
      <router-link to="/" class="header--title--link">
        Merry Stories
      </router-link>
    </h1>
    <button @click="$store.commit('toggleNav')" class="header--toggle-nav-button">
      <i class="material-icons">{{
        this.$store.state.isNavShown ? 'close' : 'menu'
      }}</i>
    </button>
  </header>
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style lang="scss" scoped>
  .header {
    @include desktop {
      padding: 10px 10px;
      justify-content: center;
    }
    @include mobile {
      padding: 5px 10px;
    }
    @include flex(row);
    background-color: $color-primary;
    align-items: center;
    &--title {
      @include mobile {
        flex: 1;
        font-size: 2.05em;
      }
      @include desktop {
        font-size: 2.75em;
        letter-spacing: 0.01em;
      }
      color: $color-primary-text;
      font-weight: 400;
      
      &--link {
        @include hide-link-styles;
      }
    }
    &--toggle-nav-button {
      @include mobile {
        cursor: pointer;
        background-color: transparent;
        border: 0;
      }
      @include desktop {
        display: none;
      }
      i {
        font-size: 2.5em;
        color: $color-primary-text;
      }
    }
  }
</style>
