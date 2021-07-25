<template>
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from './components/Home.vue'
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  components: {
    Home
  },
   setup() {
    const store = useStore()
    store.commit('FETCH_STATE')
    document.title=store.getters.title
  },
});
</script>
