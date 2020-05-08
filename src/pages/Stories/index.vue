<template>
  <div v-if="isLoggedIn" class="page">
    <Hero :size="HeroSize.half" title="Recently published stories" class="hero" />
    <StoryComponent
      v-for="item in storiesData"
      :key="item.title"
      :title="item.title"
      :authorName="item.authorName"
      :authorPicture="item.authorPicture"
      :published="item.published"
      :isPreview="true"
      :authorUid="item.authorUid"
      :url="item.url"
      :views="item.views"
    />
  </div>
  <NotFound v-else />
</template>

<script>
  import Hero, { HeroSize } from '@/components/Hero'
  import { isLoggedIn } from '@/database/variables'
  import StoryComponent from '@/components/Story'
  import NotFound from '@/pages/NotFound'
  import { db } from '@/database/functions'

  export default {
    name: 'Stories',
    components: {
      Hero,
      NotFound,
      StoryComponent
    },
    data() {
      return {
        isLoggedIn,
        HeroSize,
        db,
        storiesData: []
      }
    },
    firestore() {
      return {
        storiesData: db()
          .collection('stories')
          .orderBy('publishedComputer')
          .limitToLast(15)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: darken($color: $color-primary, $amount: 10);
    color: $color-primary-text;
  }
</style>
