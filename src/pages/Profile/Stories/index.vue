<template>
  <div class="stories">
    <h1 class="stories--title">
      Stories
    </h1>
    <StoryComponent
      v-for="item in stories"
      :key="item.title"
      :title="item.title"
      :isPreview="true"
      :authorName="item.authorName"
      :authorPicture="item.authorPicture"
      :published="item.published"
      :views="item.views"
      :authorUid="item.authorUid"
      :url="item.url"
    />
  </div>
</template>

<script>
  import StoryComponent from '@/components/Story'
  import { db, auth } from '@/database/functions'

  export default {
    name: 'Stories',
    components: {
      StoryComponent
    },
    data() {
      return {
        db,
        auth,
        stories: []
      }
    },
    firestore() {
      return {
        stories: db()
          .collection('stories')
          .where('authorUid', '==', auth().currentUser.uid)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stories {
    @include mobile {
      width: 95%;
    }
    @include desktop {
      width: 65%;
    }
    @include flex(column);
    border-radius: 20px;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 20px;
    &--title {
      text-align: center;
      font-weight: 400;
      margin: 15px 0;
    }
  }
</style>
