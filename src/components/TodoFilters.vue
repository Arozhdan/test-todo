<template>
  <div class="filters shadow ">
    <h3 class="h3">
      Фильтры:
    </h3>
    <input
      v-model="searchTerm"
      type="text"
      @keyup="setSearch"
    >
    <select
      v-model="searchPriority"
      @click="setSearch"
    >
      <option
        class="option option--gray"
        value="all"
      >
        Обычный
      </option>
      <option
        class="option option--green"
        value="low"
      >
        Не срочный
      </option>
      <option
        class="option option--yellow"
        value="medium"
      >
        В приоритете
      </option>
      <option
        class="option option--red"
        value="high"
      >
        Срочный
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import {TodoPriopiry, Filters} from '../interfaces/index'

export default defineComponent({
  setup(){
    const store  = useStore()
    const searchTerm = ref<string>(store.getters.filters.text)
    const searchPriority = ref<TodoPriopiry>(store.getters.filters.priority)
    const setSearch = ()=>{
      store.dispatch('setFilters',<Filters>{
        text:searchTerm.value,
        priority:searchPriority.value
      })
    }
    return {
      searchTerm,
      setSearch,
      searchPriority
    }
  }
})
</script>
