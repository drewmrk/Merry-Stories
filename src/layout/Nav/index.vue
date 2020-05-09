<template>
  <nav v-show="$store.state.isNavShown" class="nav">
    <ul class="nav--list">
      <li v-for="item in navItems" :key="item.ident" class="nav--list--item">
        <router-link
          v-if="item.name"
          @click.native="$store.commit('toggleNav')"
          :to="item.link"
          class="nav--list--item--link"
        >
          {{ item.name }}
        </router-link>
      </li>
      <Button
        class="nav--list--auth-button"
        :text="isLoggedIn ? 'Logout' : 'Login'"
        @click.native="isLoggedIn ? logout() : login()"
        :type="isLoggedIn ? ButtonType.warning : ButtonType.success"
      />
    </ul>
  </nav>
</template>

<script>
  import { isLoggedIn } from '@/database/variables'
  import Button, { ButtonType } from '@/components/Button'
  import { login, logout } from '@/database/functions'

  export default {
    name: 'Nav',
    components: {
      Button
    },
    data() {
      return {
        ButtonType,
        isLoggedIn,
        login,
        logout,

        navItems: [
          {
            name: 'Home',
            link: '/',
            ident: Math.random()
          },
          {
            name: 'About',
            link: '/about',
            ident: Math.random()
          },
          {
            name: 'FAQ',
            link: '/faq',
            ident: Math.random()
          },
          isLoggedIn
            ? {
                name: 'Profile',
                link: '/profile',
                ident: Math.random()
              }
            : {
                name: '',
                link: '',
                ident: Math.random()
              },
          isLoggedIn
            ? {
                name: 'Write',
                link: '/write',
                ident: Math.random()
              }
            : {
                name: '',
                link: '',
                ident: Math.random()
              },
          isLoggedIn
            ? {
                name: 'Stories',
                link: '/stories',
                ident: Math.random()
              }
            : {
                name: '',
                link: '',
                ident: Math.random()
              }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    @include mobile {
      width: 100%;
      position: absolute;
    }
    @include desktop {
      width: 30%;
      position: fixed;
      height: 100vh;
      right: 0;
    }
    @include flex(column);
    background-color: $color-secondary;
    align-items: center;
    &--list {
      list-style-type: none;
      width: 100%;
      &--item {
        @include mobile {
          font-size: 1.25em;
          text-align: left;
        }
        @include desktop {
          text-align: center;
          font-size: 1.75em;
        }
        color: $color-secondary-text;
        width: 100%;
        margin: 20px 0px;
        transition: 0.25s all;
        &:empty {
          display: none;
        }
        &:hover {
          background-color: $color-secondary-text;
          color: $color-secondary;
        }
        &--link {
          @include hide-link-styles;
          width: 100%;
          display: block;
          padding: 10px 20px;
        }
      }
      &--auth-button {
        @include mobile {
          text-align: left;
        }
        @include desktop {
          text-align: center;
          font-size: 1.75em;
        }
        border: 0;
        border-radius: initial;
        background-color: transparent;
        color: $color-secondary-text;
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
</style>
