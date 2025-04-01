<script lang="ts">
import CreateTodoItem from '@/components/CreateTodoItem.vue'
import TodoItem from '@/components/TodoItem.vue'
import { Todo, type ITodoItem } from '@/models/TodoItem'
import axios from 'axios'
export default {
  components: {
    TodoItem,
    CreateTodoItem,
  },
  data() {
    return {
      todos: [] as ITodoItem[],
      isEditing: false,
      userId: String
    }
  },
  async mounted() {
    const savedUserId = localStorage.getItem('userID')
    if(savedUserId) {
      this.userId = JSON.parse(savedUserId)
    }
    const { data } = await axios.get(`http://localhost:3000/todos/${this.userId}`)
    this.todos = data.map((_data: any) => new Todo(_data))
  },
  methods: {
    async deleteTodoItem(id: number) {
      await axios.delete(`http://localhost:3000/todos/${this.userId}/${id}`)
      this.todos = this.todos.filter((todo) => id !== todo.id)
    },
  },
}
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <CreateTodoItem :todoList="todos" />
    <TodoItem
      v-for="item in todos"
      :user-id="userId"
      :todoItem="item"
      :deleteTodoItem="deleteTodoItem"
    />
  </div>
</template>
