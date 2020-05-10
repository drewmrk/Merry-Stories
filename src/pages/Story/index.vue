<template>
  <div class="page">
    <Hero
      :size="HeroSize.half"
      :title="storyData.title"
      class="hero"
      :style="`--heroColor: ${storyData.heroColor}`"
    />
    <StoryComponent
      :authorName="storyData.authorName"
      :authorPicture="storyData.authorPicture"
      :published="storyData.published"
      :isPreview="false"
      :paragraphs="storyData.paragraphs"
      :authorUid="storyData.authorUid"
      :url="storyData.url"
      :views="storyData.views"
    />
  </div>
</template>

<script>
  import StoryComponent from '@/components/Story'
  import Hero, { HeroSize } from '@/components/Hero'
  import { db } from '@/database/functions'

  export default {
    name: 'Story',
    components: {
      StoryComponent,
      Hero
    },
    data() {
      return {
        HeroSize,
        storyData: []
      }
    },
    firestore() {
      return {
        storyData: db()
          .collection('stories')
          .doc(
            window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: var(--heroColor);
  }
</style>
