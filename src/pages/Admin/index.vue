<template>
  <div v-if="isAdmin" class="page">
    <Hero :size="HeroSize.half" title="Admin" class="hero" />
    <div class="users">
      <ul class="users--list">
        <li v-for="item in users" :key="item.uid" class="users--list--item">
          <div class="about">
            <a :href="'/user/' + item.uid" class="about--name">
              {{ item.name }}
            </a>
          </div>
          <div class="actions">
            <Button
              :size="ButtonSize.small"
              :type="item.isBanned ? ButtonType.success : ButtonType.error"
              :text="item.isBanned ? 'Unban' : 'Ban'"
              class="actions--ban-button"
              @click.native="
                db()
                  .collection('users')
                  .doc(item.uid)
                  .set({ isBanned: !item.isBanned }, { merge: true })
              "
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <NotFound v-else />
</template>

<script>
  import NotFound from '@/pages/NotFound'
  import { isAdmin } from '@/database/variables'
  import Hero, { HeroSize } from '@/components/Hero'
  import { db } from '@/database/functions'
  import Button, { ButtonType, ButtonSize } from '@/components/Button'

  export default {
    name: 'Admin',
    components: {
      NotFound,
      Hero,
      Button
    },
    data() {
      return {
        isAdmin,
        HeroSize,
        db,
        ButtonType,
        ButtonSize,
        users: []
      }
    },
    firestore() {
      return {
        users: db().collection('users')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: $color-error;
    color: $color-error-text;
  }
  .users {
    @include mobile {
      width: 95%;
    }
    @include desktop {
      width: 65%;
    }
    @include flex(column);
    margin: 20px auto;
    align-items: center;
    &--list {
      @include flex(column);
      list-style-type: none;
      width: 100%;
      &--item {
        @include flex(row);
        align-items: center;
        border: 2px solid $color-primary;
        border-radius: 10px;
        margin: 10px 0;
        padding: 10px 10px;
        width: 100%;
        .about {
          @include flex(row);
          align-items: center;
          width: 100%;
          &--name {
            @include hide-link-styles;
            margin: 0px 10px;
            display: block;
            font-size: 1.1em;
          }
        }
        .actions {
          @include flex(row);
          align-items: center;
          &--ban-button {
          }
        }
      }
    }
  }
</style>
