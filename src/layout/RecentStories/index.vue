<template>
  <div v-if="isLoggedIn" class="recent-stories">
    <i class="material-icons recent-stories--icon">fiber_new</i>
    <ul class="recent-stories--list">
      <li
        v-for="item in recentStories"
        :key="item.title"
        class="recent-stories--list--item"
      >
        <a
          :href="`${'/story/' + item.url}`"
          class="recent-stories--list--item--link"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { isLoggedIn } from '@/database/variables'
  import { db } from '@/database/functions'

  export default {
    name: 'RecentStories',
    data() {
      return {
        db,
        isLoggedIn,
        recentStories: []
      }
    },
    firestore() {
      return {
        recentStories: db()
          .collection('stories')
          .orderBy('publishedComputer')
          .limitToLast(5)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .recent-stories {
    @include mobile {
      overflow-x: auto;
      margin: 0px 10px;
    }
    @include desktop {
      justify-content: center;
    }
    @include flex(row);
    align-items: center;
    border-bottom: 1px solid grey;
    width: 100%;
    background-color: $color-primary;
    &--icon {
      @include mobile {
        font-size: 1.75em;
      }
      @include desktop {
        font-size: 2em;
      }
    }
    &--list {
      @include flex(row);
      list-style-type: none;
      &--item {
        margin: 0px 10px;
        border-bottom: 1.5px solid transparent;
        transition: 0.25s all;
        &:hover {
          border-color: $color-primary-text;
        }
        &--link {
          @include hide-link-styles;
          padding: 10px 20px;
          display: block;
        }
      }
    }
  }
</style>
