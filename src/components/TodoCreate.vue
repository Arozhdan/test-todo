<template>
  <div class="todo__create shadow">
    <form
      class="todo__create__input"
      @submit.prevent="addTodo"
    >
      <input
        v-model="formValue"
        type="text"
        placeholder="Type..."
      >
    </form>
    <div class="todo__create__status">
      <select v-model="formPriority">
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
  </div>
</template>
<script lang="ts">

import { defineComponent,ref,computed  } from 'vue'
import { useStore } from 'vuex';
import {Todo, TodoPriopiry, State} from '../interfaces/index'

export default defineComponent({
 setup() {
    const store = useStore();
    const formValue = ref("");
    const formPriority =ref <TodoPriopiry>('all');
    function revisedRandId() {
      return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10);
    }
    const addTodo = () => {
      const id = revisedRandId();
      const todo:Todo =
        {
          id: id,
          checked:false,
          priority: formPriority.value,
          body: formValue.value
        }      
      store.dispatch("addNewTodoItem",{
        [id]: {
         ...todo
        },
      });
      formValue.value=''
      formPriority.value='all'
    };
    return {
      formValue,
      formPriority,
      todos: computed(() => <State> store.state.todo),
      addTodo,
    };
  }
})
</script>
