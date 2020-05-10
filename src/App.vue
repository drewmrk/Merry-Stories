<template>
  <div id="app">
    <Header />
    <Nav />
    <RecentStories />
    <main id="main">
      <router-view />
    </main>
    <Footer id="footer" />
  </div>
</template>

<script>
  import Header from '@/layout/Header'
  import Nav from './layout/Nav'
  import RecentStories from './layout/RecentStories'
  import Footer from './layout/Footer'

  export default {
    name: 'App',
    components: {
      Header,
      Nav,
      RecentStories,
      Footer
    }
  }
</script>

<style lang="scss">
  *,
  ::before,
  ::after {
    outline: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html,
  body {
    height: 100%;
  }

  #app {
    min-height: 100%;
    position: relative;
  }

  #main {
    @include mobile {
      padding-bottom: 71px;
    }
    @include desktop {
      padding-bottom: 46px;
    }
    min-height: 100%;
  }

  #footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
</style>
