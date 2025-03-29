<script lang="ts">
import CreateTodoItem from './components/CreateTodoItem.vue'
import LoginContainer from './components/LoginContainer.vue'
import SignupContainer from './components/SignupContainer.vue'
import TodoItem from './components/TodoItem.vue'
import type { ITodoItem } from './models/TodoItem'
export default {
  components: {
    LoginContainer,
    SignupContainer,
    TodoItem,
    CreateTodoItem,
  },
  data() {
    return {
      
    }
  },
}
</script>

<template>
  <router-view />
</template>
