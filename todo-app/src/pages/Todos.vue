<script lang="ts">
import CreateTodoItem from '@/components/CreateTodoItem.vue'
import TodoItem from '@/components/TodoItem.vue'
import type { ITodoItem } from '@/models/TodoItem'
export default {
  components: {
    TodoItem,
    CreateTodoItem,
  },
  data() {
    return {
      todos: [] as ITodoItem[],
      isEditing: false,
    }
  },
  mounted() {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos)
    }
  },
  methods: {
    deleteTodoItem(id: number) {
      const newTodos: ITodoItem[] = this.todos.filter((todo) => (todo as ITodoItem).id !== id)
      this.todos = newTodos
      if (newTodos.length > 0) localStorage.setItem('todos', JSON.stringify(newTodos))
      else localStorage.removeItem('todos')
    },
    editTodoItem(id: number, newTitle: string) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === id)
      if (todoIndex !== -1) {
        console.log(newTitle)
        this.todos[todoIndex].title = newTitle
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    },
  },
}
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <CreateTodoItem :todoList="todos" />
    <TodoItem
      v-for="item in todos"
      :todoItem="item"
      :deleteTodoItem="deleteTodoItem"
      :editTodoItem="editTodoItem"
    />
  </div>
</template>
