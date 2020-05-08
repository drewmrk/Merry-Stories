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
    @include flex(row);
    background-color: $color-primary;
    align-items: center;
    padding: 5px 10px;
    &--title {
      @include mobile {
        font-size: 2.05em;
      }
      @include desktop {
        font-size: 2.15em;
      }
      color: $color-primary-text;
      font-weight: 400;
      flex: 1;
      &--link {
        @include hide-link-styles;
      }
    }
    &--toggle-nav-button {
      cursor: pointer;
      background-color: transparent;
      border: 0;
      i {
        @include mobile {
          font-size: 2.5em;
        }
        @include desktop {
          font-size: 2.75em;
        }
        color: $color-primary-text;
      }
    }
  }
</style>
