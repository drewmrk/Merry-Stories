<template>
  <footer class="footer">
    <h1 class="footer--title">
      <router-link to="/" class="footer--title--link">
        Merry Stories
      </router-link>
    </h1>
    <small class="footer--copyright">
      &copy; Drew Markel {{ new Date().getFullYear() }}
    </small>
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style lang="scss" scoped>
  .footer {
    @include mobile {
      @include flex(column);
    }
    @include desktop {
      @include flex(row);
    }
    background-color: $color-primary;
    align-items: center;
    padding: 4px 10px;
    &--title {
      @include desktop {
        flex: 1;
      }
      color: $color-primary-text;
      font-weight: 400;
      &--link {
        @include hide-link-styles;
      }
    }
    &--copyright {
      @include mobile {
        font-size: 1.05em;
        margin-top: 5px;
      }
      @include desktop {
        font-size: 1.1em;
      }
      color: $color-primary-text;
    }
  }
</style>
