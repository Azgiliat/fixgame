<template>
  <div id="app" class="app">
    <Header/>
    <Main class="app__body"/>
    <Footer/>
    <div id="vk_community_messages"></div>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Main from "./pages/Main";

export default {
  name: 'App',
  components: {
    Main,
    Header,
    Footer
  }
}
</script>
<style lang="scss">
.app {
  background-color: $main-back;
  background-image: url('~st/images/main_back.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  &__body {
    flex-grow: 1;
  }
}
</style>
