<script lang="ts">
import type { PropType } from 'vue'
import type { ITodoItem } from '@/models/TodoItem'
import Plus from '@/assets/icons/Plus.vue'
import axios from 'axios'

export default {
  components: {
    Plus,
  },
  props: {
    todoList: {
      type: Array as PropType<ITodoItem[]>,
      required: true,
    },
  },
  mounted() {
    const savedUserId = localStorage.getItem('userID')
    if (savedUserId) {
      this.userId = JSON.parse(savedUserId)
    }
  },
  data() {
    return {
      title: '',
      userId: '',
    }
  },
  methods: {
    async saveTodo() {
      const { data } = await axios.post('http://localhost:3000/todos', {
        todoTitle: this.title,
        userId: this.userId,
      })

    },
  },
  computed: {
    nextId(): number {
      if (Array.isArray(this.todoList) && this.todoList.length > 0) {
        return this.todoList[0].id + 1
      }
      return 1
    },
  },
  watch: {},
}
</script>

<template>
  <div class="flex flex-row relative">
    <input
      class="shadow-drop h-10 w-[320px] rounded-md m-4 flex items-center px-2 outline-none"
      placeholder="Add Todo"
      v-model="title"
    />
    <div
      class="flex items-center justify-between shadow-drop h-10 w-12 rounded-md px-2 absolute top-4 -right-12"
    >
      <button
        @click="saveTodo()"
        class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner"
      >
        <Plus />
      </button>
    </div>
  </div>
</template>
