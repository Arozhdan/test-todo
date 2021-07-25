<template>
  <div
    v-if="todo"
    class="todo__item shadow"
    :class="'todo__item--'+todo.priority"
  >
    <div class="todo__item__check">
      <input
        type="checkbox"
        :checked="todo.checked"
        @click="updateTodoStatus"
      >
    </div>
    <div class="todo__item__body">
      <input
        v-model="todoItem"
        type="text"
      >
    </div>
    <div class="todo__item__controls">
      <button @click="deleteItem">
        delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {useStore} from 'vuex' 
import {ref, watch} from 'vue'
import {Todo} from '../interfaces/index'
interface TodoItemProps{
  todo:Todo
}
export default defineComponent({
  props:{
    todo:{
      type:Object as PropType<Todo>,
      default:null
    }
  },
  setup(props:TodoItemProps) {
    const store = useStore();
    const todoItem=ref(props.todo.body)
    const deleteItem = ()=> store.dispatch('removeTodoItem', props.todo.id)
    let debounce = null
    watch(todoItem, (currentValue) => {
        clearTimeout(debounce)
        debounce = setTimeout(() => {
          store.dispatch('editTodoItem', {id:props.todo.id, val:currentValue})
      }, 600)
    });
    const updateTodoStatus = ()=>{
      store.dispatch('updateTodoItemStatus', props.todo.id)
    }
    return {
      deleteItem,
      todoItem,
      updateTodoStatus
    };
  },
})
</script>