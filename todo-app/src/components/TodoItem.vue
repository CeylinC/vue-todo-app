<script lang="ts">
import type { ITodoItem } from '@/models/TodoItem';
import type { PropType } from 'vue';
export default {
  props: {
    todoItem: {
      type: Object as () => ITodoItem,
      required: true
    },
    deleteTodoItem: {
      type: Function as PropType<(id: number) => void>
    },
    editTodoItem: {
      type: Function as PropType<(id: number, newTitle: string) => void>
    },
  },
  data() {
    return {
      isEditing: false,
      newTitle: this.todoItem.title
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
}
</script>

<template>
  <div class="group flex flex-row relative">
    <div class="shadow-drop h-10 w-[320px] rounded-md m-4 flex items-center px-2">
      <input type="checkbox" class="mr-2"/>
      <input v-if="isEditing" v-model="newTitle"/>
      <div v-else="isEditing">{{ todoItem.title }}</div>
    </div>
    <div v-if="!isEditing" class="hidden group-hover:flex absolute top-4 -right-22 items-center justify-between shadow-drop h-10 w-[90px] rounded-md px-2">
      <button @click="() => isEditing = true" class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner bg-amber-300">U</button>
      <button @click="deleteTodoItem(todoItem.id)" class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner bg-red-300">D</button>
    </div>
    <div v-else="!isEditing" class="flex items-center justify-between shadow-drop h-10 w-12 rounded-md px-2 absolute top-4 -right-12">
      <button @click="editTodoItem(todoItem.id, newTitle); isEditing = false" class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner bg-amber-300">S</button>
    </div>
  </div>
</template>