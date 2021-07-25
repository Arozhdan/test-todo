<template>
  <div class="page page--home">
    <div class="page__plank">
      <img
        srcset="
          ../assets/images/bg-426.jpg   426w,
          ../assets/images/bg-1278.jpg 1278w,
          ../assets/images/bg-1597.jpg 1597w
        "
      >
    </div>
    <div class="container">
      <input
        v-model="title"
        type="text"
        class="h1 todo__title"
        @keyup="setTitle"
      >
      <Todo />
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import {ref,defineComponent} from 'vue'
import Todo from './Todo.vue'
export default defineComponent({
  components:{
    Todo,
  },
  setup(){
    const store = useStore()
    const title:string = ref(store.getters.title)
    const setTitle = ()=>{
      store.commit('SET_TITLE', title)
      document.title=store.getters.title
    }
    return {
      title,
      setTitle
    }
  }
});
</script>
