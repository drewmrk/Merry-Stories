<template>
  <button @click="login" class="button">
    <div class="button--content">
      <img :src="googleLogo" alt="Google" class="button--content--icon" />
      <p class="button--content--text">
        Login with Google
      </p>
    </div>
  </button>
</template>

<script>
  import googleLogo from 'super-tiny-icons/images/svg/google.svg'
  import { login } from '@/database/functions'

  export default {
    name: 'GoogleButton',
    data() {
      return {
        login,
        googleLogo
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button {
    @include flex(row);
    box-shadow: 1px 1px 15px #00000042;
    margin: 10px 0;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 10px;
    background-color: white;
    border: 0;
    &--content {
      @include flex(row);
      width: 100%;
      align-items: center;
      justify-content: space-between;
      &--icon {
        @include mobile {
          $dims: 25px;
          width: $dims;
          height: $dims;
        }
        @include desktop {
          $dims: 30px;
          width: $dims;
          height: $dims;
        }
        margin: 5px 10px 5px 3px;
      }
      &--text {
        @include mobile {
          font-size: 1.18em;
        }
        @include desktop {
          font-size: 1.2em;
        }
        margin: 5px 10px 5px 3px;
      }
    }
  }
</style>
