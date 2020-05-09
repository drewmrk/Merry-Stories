<template>
  <div class="requires-login">
    <dialog open class="requires-login--modal">
      <h1 class="requires-login--modal--title">
        Whoops!
      </h1>
      <h2 class="requires-login--modal--subtitle">
        Please login before accessing this page.
      </h2>
      <button @click="login" class="requires-login--modal--button">
        <div class="requires-login--modal--button--content">
          <img
            :src="googleLogo"
            alt="Google"
            class="requires-login--modal--button--content--icon"
          />
          <p class="requires-login--modal--button--content--text">
            Login with Google
          </p>
        </div>
      </button>
    </dialog>
  </div>
</template>

<script>
  import { login } from '@/database/functions'
  import googleLogo from 'super-tiny-icons/images/svg/google.svg'

  export default {
    name: 'RequiresLogin',
    data() {
      return {
        login,
        googleLogo
      }
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
      align-items: center;
      box-shadow: 1px 1px 15px #00000042;
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
      &--button {
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
    }
  }
</style>
