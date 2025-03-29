<script lang="ts">
import type { PropType } from 'vue';
import type { ITodoItem } from '@/models/TodoItem';

export default {
  props: {
    todoList: {
      type: Array as PropType<ITodoItem[]>,
      required: true
    }
  },
  data() {
    return {
      title: ''
    }
  },
  methods: {
    saveTodo () {
      const todoItem: ITodoItem = {
        createdAt: new Date,
        isCompleted: false,
        title: this.title,
        id: this.nextId
      }
      const todos = localStorage.getItem('todos')
      if(todos) {
        this.todoList.unshift(todoItem)
        localStorage.setItem('todos', JSON.stringify(this.todoList))
      } else {
        localStorage.setItem('todos', JSON.stringify([todoItem]))
      }
      this.title = ''
    }
  },
  computed: {
  nextId(): number {
    if (Array.isArray(this.todoList) && this.todoList.length > 0) {
      return this.todoList[0].id + 1;
    }
    return 1;
  }
},
  watch: {},
}
</script>

<template>
  <div class="flex flex-row relative">
    <input class="shadow-drop h-10 w-[320px] rounded-md m-4 flex items-center px-2 outline-none" placeholder="Add Todo" v-model="title"/>
    <div class="flex items-center justify-between shadow-drop h-10 w-12 rounded-md px-2 absolute top-4 -right-12">
      <button @click="saveTodo()" class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner bg-amber-300">+</button>
    </div>
  </div>
</template>
