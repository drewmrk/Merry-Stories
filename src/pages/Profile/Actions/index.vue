<template>
  <div class="actions">
    <h1 class="actions--title">
      Actions
    </h1>
    <Button
      text="Logout"
      @click.native="logout"
      :type="ButtonType.warning"
      :size="ButtonSize.medium"
      class="button"
    />
    <Button
      text="Delete account"
      @click.native="isDeleteAccountPreviewShown = true"
      :type="ButtonType.error"
      :size="ButtonSize.medium"
      class="button"
    />
    <div v-if="isDeleteAccountPreviewShown" class="delete-account-preview">
      <dialog
        :open="isDeleteAccountPreviewShown"
        class="delete-account-preview--modal"
      >
        <p class="delete-account-preview--modal--warning">
          Are you sure you want to delete your account?
        </p>
        <p class="delete-account-preview--modal--warning">
          Everything will be deleted (stories, profile, views, etc.).
        </p>
        <p class="delete-account-preview--modal--final-warning">
          This operation cannot be undone.
        </p>
        <Button
          text="Go back"
          @click.native="isDeleteAccountPreviewShown = false"
          :type="ButtonType.normal"
          :size="ButtonSize.medium"
          class="delete-account-preview--modal--button"
        />
        <Button
          text="Delete account"
          @click.native="deleteAccount"
          :type="ButtonType.error"
          :size="ButtonSize.medium"
          class="delete-account-preview--modal--button"
        />
        <p v-if="needsLoginToDelete" class="delete-account-preview--modal--message">
          All of your account data has been deleted. To completely delete your
          account, please login again and delete your account from here.
        </p>
      </dialog>
    </div>
  </div>
</template>

<script>
  import Button, { ButtonSize, ButtonType } from '@/components/Button'
  import { logout, db, auth } from '@/database/functions'

  export default {
    name: 'Actions',
    components: {
      Button
    },
    methods: {
      deleteAccount() {
        // Delete stories docs
        db()
          .collection('stories')
          .where('authorUid', '==', auth().currentUser.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete().catch(err => {
                console.error('An error occurred while deleting the stories docs.')
                console.error(err)
              })
            })
          })
        // Delete users doc
        db()
          .collection('users')
          .doc(auth().currentUser.uid)
          .delete()
          .catch(err => {
            console.error('An error occurred while deleting the users doc.')
            console.error(err)
          })
        // Delete user
        auth()
          .currentUser.delete()
          .then(() => {
            setTimeout(() => {
              window.location.replace('/')
            }, 1000)
          })
          .catch(err => {
            this.needsLoginToDelete = true
            console.error(err)
          })
      }
    },
    data() {
      return {
        ButtonSize,
        ButtonType,
        logout,
        db,
        auth,
        isDeleteAccountPreviewShown: false,
        needsLoginToDelete: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .actions {
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
    .button {
      width: 100%;
      margin: 10px 0;
    }
  }
  .delete-account-preview {
    @include flex(column);
    justify-content: center;
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 1000000000;
    top: 0;
    background: rgba($color: #000000, $alpha: 0.5);
    &--modal {
      @include mobile {
        width: 95%;
      }
      @include desktop {
        width: 65%;
      }
      margin: 0 auto;
      padding: 10px 20px;
      border-radius: 20px;
      border: 0;
      &--warning {
        @include mobile {
          font-size: 1.25em;
        }
        @include desktop {
          font-size: 1.5em;
        }
        text-align: center;
        line-height: 170%;
      }
      &--final-warning {
        @include mobile {
          font-size: 1.25em;
        }
        @include desktop {
          font-size: 1.5em;
        }
        text-align: center;
        line-height: 170%;
        font-weight: 700;
      }
      &--message {
        @include mobile {
          font-size: 1.25em;
        }
        @include desktop {
          font-size: 1.5em;
        }
        background-color: $color-error;
        color: $color-error-text;
        line-height: 170%;
        padding: 6px 20px;
        text-align: center;
        border-radius: 20px;
      }
    }
  }
</style>
