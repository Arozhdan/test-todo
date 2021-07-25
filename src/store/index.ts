import { createStore } from 'vuex'
import { Todo, State, Filters } from '../interfaces/index'
import pickBy from 'lodash.pickby';


const saveTodos = (data: Todo): void => {
  localStorage.setItem('todos', JSON.stringify(data))
}
// Я знаю что это может быть одной функцией
const saveFilters = (data: Filters): void => {
  localStorage.setItem('filters', JSON.stringify(data))
}


export default createStore<State>({
  state: {
    todo: <Todo>{},
    filters: <Filters>{
      text: '',
      priority: 'all'
    },
    title: 'My title'
  },
  mutations: {
    ADD_ITEM(state, payload: Todo) {
      state.todo = { ...payload, ...state.todo }
      saveTodos(state.todo)
    },
    REMOVE_ITEM(state, id) {
      delete state.todo[id];
      saveTodos(state.todo)
    },
    EDIT_ITEM(state, { id, val }) {
      state.todo[id] = {
        ...state.todo[id],
        body: val
      }
      saveTodos(state.todo)
    },
    UPDATE_ITEM_STATUS(state, id: string) {
      state.todo[id] = {
        ...state.todo[id],
        checked: !state.todo[id].checked
      }
      saveTodos(state.todo)
    },
    FETCH_STATE(state) {
      state.todo = {
        ...JSON.parse(localStorage.getItem('todos'))
      }
      state.filters = {
        ...JSON.parse(localStorage.getItem('filters'))
      }
      state.title = localStorage.getItem('title')
    },
    SET_FILTERS(state, payload: Filters) {
      state.filters = {
        ...state.filters,
        ...payload
      }
      saveFilters(state.filters)
    },
    SET_TITLE(state, payload) {
      state.title = payload
      saveFilters(state.filters)
      localStorage.setItem('title', payload.value)
    },
  },
  actions: {
    addNewTodoItem({ commit }, todo: Todo) {
      commit('ADD_ITEM', todo)
    },
    removeTodoItem({ commit }, id: string) {
      commit('REMOVE_ITEM', id)
    },
    editTodoItem({ commit }, todo: Todo) {
      commit('EDIT_ITEM', todo)
    },
    updateTodoItemStatus({ commit }, id: string) {
      commit('UPDATE_ITEM_STATUS', id)
    },
    setFilters({ commit }, payload: Filters) {
      commit('SET_FILTERS', payload)
    }
  },
  getters: {
    filters: state => state.filters,
    title: state => state.title,
    filteredTodo: state => {
      if (state.filters.text === '' && state.filters.priority === 'all') return state.todo
      const filtered = pickBy(state.todo, (el) => {
        return (el.body.includes(state.filters.text) || state.filters.text === '') && (state.filters.priority === el.priority || state.filters.priority === "all")

      })
      return filtered
    }
  }
})
