<template>
  <div id="app">
    <TopNav v-if="authenticated" />
    <div class="mx-auto p-4">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TopNav
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated'
    })
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
