<script lang="ts">
import Logout from '@/assets/icons/Logout.vue'
import CreateTodoItem from '@/components/CreateTodoItem.vue'
import TodoItem from '@/components/TodoItem.vue'
import { Todo, type ITodoItem } from '@/models/TodoItem'
import axios from 'axios'
export default {
  components: {
    TodoItem,
    CreateTodoItem,
    Logout,
  },
  data() {
    return {
      todos: [] as ITodoItem[],
      isEditing: false,
      userId: String,
      username: ''
    }
  },
  async mounted() {
    const savedUserId = localStorage.getItem('userID')
    if (savedUserId) {
      this.userId = JSON.parse(savedUserId)
    }

    const savedUsername = localStorage.getItem('username')
    if (savedUsername) {
      this.username = savedUsername
    }

    const { data } = await axios.get(`http://localhost:3000/todos/${this.userId}`)
    this.todos = data.map((_data: any) => new Todo(_data))
  },
  methods: {
    async deleteTodoItem(id: number) {
      await axios.delete(`http://localhost:3000/todos/${this.userId}/${id}`)
      this.todos = this.todos.filter((todo) => id !== todo.id)
    },
    logout() {
      document.cookie = 'token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.$router.push({ path: '/login' })
    }
  },
}
</script>

<template>
  <div class="relative w-full h-screen flex flex-col justify-center items-center">
    <div class="absolute top-4 shadow-drop p-3 rounded-md w-[400px] flex flex-row justify-between"><div>Welcome {{ username }}</div><Logout @click="logout"/></div>
    <CreateTodoItem :todoList="todos" />
    <TodoItem
      v-for="item in todos"
      :user-id="userId"
      :todoItem="item"
      :deleteTodoItem="deleteTodoItem"
    />
  </div>
</template>
