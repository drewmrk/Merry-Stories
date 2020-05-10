<template>
  <button :class="`button ${'button--type--' + type} ${'button--size--' + size}`">
    {{ text }}
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'normal'
      },
      size: {
        type: String,
        default: 'medium'
      },
      text: {
        type: String,
        required: true
      }
    }
  }

  export const ButtonType = {
    normal: 'normal',
    success: 'success',
    warning: 'warning',
    error: 'error'
  }

  export const ButtonSize = {
    small: 'small',
    medium: 'medium',
    large: 'large'
  }
</script>

<style lang="scss" scoped>
  .button {
    @include shadow-2;
    padding: 6px 20px;
    border-radius: 6.5px;
    transition: 0.25s all;
    border: 2.5px solid;
    cursor: pointer;
    font-weight: 700;
  }
  // Types
  .button--type--normal {
    background-color: $color-primary;
    color: $color-primary-text;
    border: 0;
    &:hover {
      @include shadow-3;
      background-color: $color-primary;
      color: $color-primary-text;
    }
  }
  .button--type--success {
    background-color: transparentize($color: $color-success, $amount: 0.5);
    border-color: $color-success;
    color: $color-primary-text;
    &:hover {
      background-color: $color-success;
      color: $color-success-text;
    }
  }
  .button--type--warning {
    background-color: transparentize($color: $color-warning, $amount: 0.5);
    border-color: $color-warning;
    color: $color-warning-text;
    &:hover {
      background-color: $color-warning;
      color: $color-warning-text;
    }
  }
  .button--type--error {
    background-color: transparentize($color: $color-error, $amount: 0.5);
    border-color: $color-error;
    color: $color-warning-text;
    &:hover {
      background-color: $color-error;
      color: $color-error-text;
    }
  }
  // Sizes
  .button--size--small {
    @include mobile {
      font-size: 1em;
    }
    @include desktop {
      font-size: 1.15em;
    }
  }
  .button--size--medium {
    @include mobile {
      font-size: 1.25em;
    }
    @include desktop {
      font-size: 1.35em;
    }
  }
  .button--size--large {
    @include mobile {
      font-size: 1.7em;
    }
    @include desktop {
      font-size: 1.8em;
    }
  }
</style>
