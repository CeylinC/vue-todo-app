<script lang="ts">
import type { PropType } from 'vue';
export default {
  data() {
    return {}
  },
  methods: {
    async handleClick() {
      if (this.onclick) {
        await this.onclick();
      }
    },
  },
  props: {
   title: {
    type: String,
    required: true
   },
   onclick: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },
  }
}
</script>

<template>
  <button @click="handleClick()" class="shadow-drop outline-none px-4 py-2 rounded-full bg-blue-500">{{ title }}</button>
</template>