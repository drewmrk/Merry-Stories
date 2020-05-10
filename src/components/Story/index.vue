<template>
  <div class="story">
    <Header
      :title="title"
      :isPreview="isPreview"
      :authorName="authorName"
      :authorPicture="authorPicture"
      :published="published"
      :views="views"
      :authorUid="authorUid"
      :url="url"
    />
    <Body v-if="!isPreview" :paragraphs="paragraphs" />
    <Footer v-if="!isPreview" />
  </div>
</template>

<script>
  import Header from './Header'
  import Body from './Body'
  import Footer from './Footer'
  import { db } from '@/database/functions'

  export default {
    name: 'StoryComponent',
    props: [
      'title',
      'authorName',
      'authorPicture',
      'published',
      'isPreview',
      'paragraphs',
      'authorUid',
      'url',
      'views'
    ],
    components: {
      Header,
      Body,
      Footer
    },
    mounted() {
      if (!this.isPreview && this.title !== '') {
        db()
          .collection('stories')
          .doc(
            window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          )
          .update({
            views: db.FieldValue.increment(1)
          })
          .catch(err => {
            console.error('An error occured while updating the view counter.')
            console.error(err)
          })
      }
    },
    data() {
      return {
        db
      }
    }
  }
</script>

<style lang="scss" scoped>
  .story {
    @include mobile {
      width: 95%;
    }
    @include desktop {
      width: 610px;
    }
    @include flex(column);
    margin: 20px auto;
    align-items: center;
  }
</style>
