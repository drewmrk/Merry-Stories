<template>
  <div class="page">
    <Hero
      :style="isLoggedIn ? '--align-items: initial;' : '--align-items: center;'"
      class="welcome-hero hero"
      :title="
        isLoggedIn
          ? 'Welcome back'
          : 'Write happy, cheerful stories for others to enjoy.'
      "
    >
      <GoogleButton v-if="!isLoggedIn" class="google-login-button" />
      <Button
        v-if="isLoggedIn"
        :size="ButtonSize.large"
        text="See stories"
        class="hero--button"
        @click.native="$router.push({ path: '/stories' })"
      />
      <Button
        v-if="isLoggedIn"
        :size="ButtonSize.large"
        text="Write a story"
        class="hero--button"
        @click.native="$router.push({ path: '/write' })"
      />
    </Hero>
    <Hero
      v-if="!isLoggedIn"
      class="free-hero hero"
      title="Merry Stories is, and always will be... free."
    >
      <i class="material-icons">money_off</i>
    </Hero>
    <Hero
      v-if="!isLoggedIn"
      class="unleash-hero hero"
      title="Unleash your inner writer to create heartwarming stories."
    >
      <i class="material-icons">favorite</i>
    </Hero>
    <Hero
      v-if="!isLoggedIn"
      class="question-hero hero"
      title="Questions? Visit the FAQ page to see if your question has been answered."
    >
      <i class="material-icons">help</i>
      <Button
        :size="ButtonSize.large"
        text="Go to the FAQ"
        class="hero--button"
        @click.native="$router.push({ path: '/faq' })"
      />
    </Hero>
  </div>
</template>

<script>
  import { isLoggedIn } from '@/database/variables'
  import Hero from '@/components/Hero'
  import Button, { ButtonSize } from '@/components/Button'
  import { login } from '@/database/functions'
  import GoogleButton from '@/components/Button/Google'

  export default {
    name: 'Home',
    components: {
      Hero,
      Button,
      GoogleButton
    },
    data() {
      return {
        isLoggedIn,
        login,
        ButtonSize
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    @include flex(column);
    justify-content: center;
    width: 100%;
    .hero {
      .hero--button {
        @include mobile {
          width: 100%;
        }
        @include desktop {
          width: 50%;
        }
        margin: 20px auto;
      }
      i {
        @include mobile {
          font-size: 3em;
        }
        @include desktop {
          font-size: 6em;
        }
        text-align: center;
      }
    }
    .welcome-hero {
      align-items: var(--align-items);
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5)
        ),
        no-repeat center / cover url('/img/home/welcome-hero-bg.webp');
      .google-login-button {
        @include mobile {
          zoom: 1.35;
        }
        @include desktop {
          zoom: 1.65;
        }
      }
    }
    .free-hero {
      background-color: darken(
        $color: transparentize($color: $color-success, $amount: 0.15),
        $amount: 5
      );
    }
    .unleash-hero {
      background-color: transparentize($color: $color-error, $amount: 0.25);
    }
    .question-hero {
      background-color: transparentize($color: $color-warning, $amount: 0.25);
    }
  }
</style>
