export interface State {
  todo: Todo
  filters: Filters,
  title: string
}
export interface Filters {
  text: string
  priority: TodoPriopiry
}
export interface Todo {
  id: string,
  body: string,
  checked: boolean,
  priority: TodoPriopiry
}
export type TodoPriopiry = 'low' | 'medium' | 'high' | 'all'