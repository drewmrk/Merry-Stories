<template>
  <div class="about">
    <img :src="authorPicture" alt="Profile" class="about--picture" />
    <p class="about--name">{{ authorName }}</p>
    <p class="about--uid">{{ authorUid }}</p>
  </div>
</template>

<script>
  export default {
    name: 'About',
    props: ['authorName', 'authorPicture', 'authorUid']
  }
</script>

<style lang="scss" scoped>
  .about {
    @include mobile {
      width: 95%;
    }
    @include desktop {
      width: 65%;
    }
    @include flex(column);
    border-radius: 20px;
    align-items: center;
    margin: 20px auto;
    padding: 10px 20px;
    &--picture {
      @include mobile {
        $dims: 150px;
        width: $dims;
        height: $dims;
      }
      @include desktop {
        $dims: 175px;
        width: $dims;
        height: $dims;
      }
      margin: 10px 0;
      border-radius: 100%;
    }
    &--name {
      @include mobile {
        font-size: 2em;
      }
      @include desktop {
        font-size: 2.1em;
      }
      margin: 10px 0;
    }
    &--uid {
      @include mobile {
        font-size: 1em;
      }
      @include desktop {
        font-size: 0.95em;
      }
      margin: 10px 0;
    }
  }
</style>
