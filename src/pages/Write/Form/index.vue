<template>
  <form class="form">
    <fieldset class="form--fieldset">
      <label for="Title" class="form--fieldset--label">
        Title
      </label>
      <input
        id="Title"
        class="form--fieldset--input"
        placeholder="Title"
        v-model="title"
      />
    </fieldset>
    <fieldset v-for="item in paragraphs" :key="item.ident" class="form--fieldset">
      <label :for="item.ident" class="form--fieldset--label">
        Paragraph
      </label>
      <textarea
        :id="item.ident"
        class="form--fieldset--textarea"
        placeholder="Paragraph"
        v-model="item.content"
      />
    </fieldset>
    <fieldset class="form--fieldset">
      <Button
        class="form--fieldset--button"
        @click.native.prevent="
          paragraphs.push({ content: '', ident: Math.random() })
        "
        text="Add paragraph"
      />
      <Button
        class="form--fieldset--button"
        @click.native.prevent="paragraphs.pop()"
        text="Delete last paragraph"
      />
    </fieldset>
    <fieldset v-if="title && paragraphs[0].content" class="form--fieldset">
      <Button
        class="form--fieldset--button"
        :type="ButtonType.success"
        @click.native.prevent="publishStory"
        text="Publish story"
      />
    </fieldset>
    <fieldset v-if="messageContent" class="form--fieldset">
      <p :class="`message ${'message--type--' + messageType}`">
        {{ messageContent }}
      </p>
    </fieldset>
  </form>
</template>

<script>
  import Button, { ButtonType } from '@/components/Button'
  import { db, auth } from '@/database/functions'
  import cryptoRandomString from 'crypto-random-string'
  import randomColor from 'random-color'

  const heroColor = randomColor().hexString()

  const storyURL =
    cryptoRandomString({ length: 10, type: 'url-safe' }) +
    '-' +
    auth().currentUser.uid

  export default {
    name: 'Form',
    components: {
      Button
    },
    methods: {
      publishStory() {
        db()
          .collection('stories')
          .doc(storyURL)
          .set(
            {
              title: this.title,
              paragraphs: this.paragraphs,
              authorName: auth().currentUser.displayName,
              authorPicture: auth().currentUser.photoURL,
              authorUid: auth().currentUser.uid,
              publishedComputer: new Date(),
              published: new Date().toDateString(),
              url: storyURL,
              views: 0,
              heroColor: heroColor
            },
            {
              merge: true
            }
          )
          .then(() => {
            this.title = ''
            this.paragraphs = [{ content: '', ident: 0 }]
            this.messageType = 'success'
            this.messageContent = 'Your story has been successfully published.'
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
          .catch(err => {
            this.messageType = 'error'
            this.messageContent = 'An error occurred while publishing your story.'
            console.error(err)
          })
      }
    },
    data() {
      return {
        ButtonType,
        title: '',
        paragraphs: [
          {
            content: '',
            ident: 0
          }
        ],
        messageType: '',
        messageContent: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    @include mobile {
      width: 95%;
    }
    @include desktop {
      width: 65%;
    }
    @include flex(column);
    align-items: center;
    margin: 40px auto;
    &--fieldset {
      @include flex(column);
      border: 0;
      margin: 20px 0;
      width: 100%;
      &--label {
        @include mobile {
          font-size: 1.3em;
        }
        @include desktop {
          font-size: 1.35em;
        }
        margin: 15px 0;
      }
      &--input,
      &--textarea {
        @include mobile {
          font-size: 1.25em;
        }
        @include desktop {
          font-size: 1.3em;
        }
        width: 100%;
        border-radius: 20px;
        border: 2px solid;
        padding: 6px 20px;
      }
      &--textarea {
        resize: vertical;
        min-height: 250px;
        line-height: 170%;
      }
      &--button {
        width: 100%;
        margin: 15px 0;
      }
      .message {
        @include mobile {
          font-size: 1.2em;
        }
        @include desktop {
          font-size: 1.3em;
        }
        border-radius: 20px;
        padding: 10px 20px;
        text-align: center;
      }
      .message--type--success {
        background-color: $color-success;
      }
      .message--type--error {
        background-color: $color-error;
      }
    }
  }
</style>
