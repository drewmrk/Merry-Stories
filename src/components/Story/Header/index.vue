<template>
  <header
    class="header"
    :style="
      isPreview
        ? '--bgColor: #e6e6e6; --padding: 10px 20px;'
        : '--bgColor: transparent; --padding: 0;'
    "
  >
    <h1 v-if="isPreview" class="header--title">
      <a :href="`${'/story/' + url}`" class="header--title--link">{{ title }}</a>
    </h1>
    <div class="header--author">
      <img :src="authorPicture" class="header--author--picture" alt="Author" />
      <p class="header--author--name">
        <a :href="`${'/user/' + authorUid}`" class="header--author--name--link">
          {{ authorName }}
        </a>
      </p>
    </div>
    <div class="header--time">
      <time class="header--time--published">
        {{ published }}
      </time>
    </div>
    <div class="header--extras">
      <p class="header--extras--views">Views: {{ views }}</p>
    </div>
    <div
      v-if="
        (!isPreview && authorUid === auth().currentUser.uid) ||
          (!isPreview && isAdmin)
      "
      class="header--controls"
    >
      <button
        @click.prevent="toggleDeleteStoryPreview"
        class="header--controls--delete-button"
      >
        <i class="material-icons">
          delete
        </i>
      </button>
      <div v-if="isDeletePreviewShown" class="header--controls--delete-preview">
        <p class="header--controls--delete-preview--warning">
          Are you sure you want to delete this story?
        </p>
        <Button
          @click.native.prevent="toggleDeleteStoryPreview"
          :type="ButtonType.normal"
          class="header--controls--delete-preview--button"
          text="No"
        />
        <Button
          @click.native.prevent="deleteStory"
          :type="ButtonType.error"
          class="header--controls--delete-preview--button"
          text="Yes"
        />
      </div>
    </div>
  </header>
</template>

<script>
  import { isAdmin } from '@/database/variables'
  import { db, auth } from '@/database/functions'
  import Button, { ButtonType } from '@/components/Button'

  export default {
    name: 'Header',
    components: {
      Button
    },
    props: [
      'title',
      'isPreview',
      'authorName',
      'authorPicture',
      'published',
      'authorUid',
      'views',
      'url'
    ],
    methods: {
      toggleDeleteStoryPreview() {
        this.isDeletePreviewShown = !this.isDeletePreviewShown
      },
      deleteStory() {
        db()
          .collection('stories')
          .doc(
            window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
          )
          .delete()
          .then(() => {
            window.history.back()
          })
          .catch(err => {
            console.error('An error occurred while deleting this story.')
            console.error(err)
          })
      }
    },
    data() {
      return {
        isAdmin,
        auth,
        ButtonType,
        isDeletePreviewShown: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    @include flex(column);
    background-color: var(--bgColor);
    padding: var(--padding);
    border-radius: 20px;
    width: 100%;
    &--title {
      &--link {
        @include hide-link-styles;
      }
    }
    &--author {
      @include flex(row);
      align-items: center;
      &--picture {
        @include mobile {
          $dims: 26px;
          width: $dims;
          height: $dims;
        }
        @include desktop {
          $dims: 32px;
          width: $dims;
          height: $dims;
        }
        border-radius: 100%;
      }
      &--name {
        @include mobile {
          font-size: 1.18em;
        }
        @include desktop {
          font-size: 1.15em;
        }
        margin-left: 5px;
        &--link {
          @include hide-link-styles;
        }
      }
    }
    &--time {
      @include flex(column);
      &--published {
        @include mobile {
          font-size: 1.18em;
        }
        @include desktop {
          font-size: 1.15em;
        }
      }
    }
    &--extras {
      @include flex(column);
      &--views {
        @include mobile {
          font-size: 1.18em;
        }
        @include desktop {
          font-size: 1.15em;
        }
      }
    }
    &--controls {
      @include flex(column);
      margin: 5px 0;
      &--delete-button {
        border-radius: 10px;
        padding: 8px 8px;
        border: 2px solid $color-error;
        background-color: transparentize($color: $color-error, $amount: 0.5);
        transition: 0.25s all;
        cursor: pointer;
        &:hover {
          background-color: $color-error;
        }
        i {
        }
      }
      &--delete-preview {
        @include flex(column);
        padding: 10px 20px;
        margin: 15px 0;
        &--warning {
          @include mobile {
            font-size: 1.35em;
          }
          @include desktop {
            font-size: 1.425em;
          }
          text-align: center;
          font-weight: 700;
        }
        &--button {
          margin: 10px 0;
        }
      }
    }
  }
</style>
