<template>
  <div class="todo">
    <TodoCreate />
    <TodoFilters />
    <div class="todo__list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="{...todo}"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent,computed  } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoCreate from './TodoCreate.vue'
import TodoFilters from './TodoFilters.vue'

export default defineComponent({
  components:{
    TodoItem,TodoCreate,TodoFilters
  },
  setup() {
    const store = useStore();

    return {
      todos: computed(() => store.getters.filteredTodo),
    };
  },
})
</script>