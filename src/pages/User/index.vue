<template>
  <div class="page">
    <Hero :size="HeroSize.half" title="User" class="hero" />
    <About
      :authorName="userData.name"
      :authorPicture="userData.picture"
      :authorUid="userData.uid"
    />
    <div class="stories">
      <StoryComponent
        v-for="item in userStories"
        :key="item.title"
        :isPreview="true"
        :title="item.title"
        :authorName="item.authorName"
        :authorPicture="item.authorPicture"
        :views="item.views"
        :authorUid="item.authorUid"
        :url="item.url"
      />
    </div>
  </div>
</template>

<script>
  import StoryComponent from '@/components/Story'
  import Hero, { HeroSize } from '@/components/Hero'
  import { db } from '@/database/functions'
  import About from './About'

  export default {
    name: 'User',
    components: {
      Hero,
      StoryComponent,
      About
    },
    data() {
      return {
        db,
        HeroSize,
        userData: [],
        userStories: []
      }
    },
    firestore() {
      return {
        userData: db()
          .collection('users')
          .doc(
            window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          ),
        userStories: db()
          .collection('stories')
          .where(
            'authorUid',
            '==',
            window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          )
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
