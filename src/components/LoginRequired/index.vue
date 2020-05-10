<template>
  <div class="requires-login">
    <dialog open class="requires-login--modal">
      <h1 class="requires-login--modal--title">
        Whoops!
      </h1>
      <h2 class="requires-login--modal--subtitle">
        Please login before accessing this page.
      </h2>
      <GoogleButton />
    </dialog>
  </div>
</template>

<script>
  import GoogleButton from '@/components/Button/Google'

  export default {
    name: 'RequiresLogin',
    components: {
      GoogleButton
    }
  }
</script>

<style lang="scss" scoped>
  .requires-login {
    @include flex(column);
    align-items: center;
    margin: 50px 0;
    &--modal {
      @include mobile {
        width: 95%;
      }
      @include desktop {
        width: 65%;
      }
      @include flex(column);
      @include shadow-1;
      align-items: center;
      margin: 0 auto;
      padding: 10px 20px;
      border-radius: 20px;
      border: 0;
      &--title,
      &--subtitle {
        font-weight: 400;
        line-height: 170%;
        text-align: center;
      }
    }
  }
</style>
