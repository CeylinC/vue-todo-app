<script lang="ts">
import Delete from '@/assets/icons/Delete.vue'
import Save from '@/assets/icons/Save.vue'
import Update from '@/assets/icons/Update.vue'
import type { ITodoItem } from '@/models/TodoItem'
import type { PropType } from 'vue'
import Checkbox from './Checkbox.vue'
import axios from 'axios'
export default {
  components: {
    Delete,
    Update,
    Save,
    Checkbox,
  },
  props: {
    todoItem: {
      type: Object as () => ITodoItem,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    deleteTodoItem: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      newTitle: this.todoItem.title,
    }
  },
  methods: {
    async checkTodoItem(id: number) {
      await axios.put(`http://localhost:3000/todos/${this.userId}/${id}`, {completed: !this.todoItem.isCompleted})
      this.todoItem.isCompleted = !this.todoItem.isCompleted
    },
    async editTodoItem(id: number, newTitle: string) {
      await axios.put(`http://localhost:3000/todos/${this.userId}/${id}`, {title: newTitle})
      this.todoItem.title = newTitle
    },
  },
}
</script>

<template>
  <div class="group flex flex-row relative">
    <div class="shadow-drop h-10 w-[320px] rounded-md m-4 flex items-center px-2">
      <Checkbox
        :isChecked="todoItem.isCompleted"
        class="mr-2"
        @click="checkTodoItem(todoItem.id)"
      />
      <input v-if="isEditing" v-model="newTitle" autoFocus class="outline-none" />
      <div v-else="isEditing">{{ todoItem.title }}</div>
    </div>
    <div
      v-if="!isEditing"
      class="hidden group-hover:flex absolute top-4 -right-22 items-center justify-between shadow-drop h-10 w-[90px] rounded-md px-2"
    >
      <button
        @click="() => (isEditing = true)"
        class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner"
      >
        <Update />
      </button>
      <button
        @click="deleteTodoItem(todoItem.id)"
        class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner"
      >
        <Delete />
      </button>
    </div>
    <div
      v-else="!isEditing"
      class="flex items-center justify-between shadow-drop h-10 w-12 rounded-md px-2 absolute top-4 -right-12"
    >
      <button
        @click="
          editTodoItem(todoItem.id, newTitle);
          isEditing = false
        "
        class="w-8 h-8 flex justify-center items-center rounded-full shadow-inner"
      >
        <Save />
      </button>
    </div>
  </div>
</template>
