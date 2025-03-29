<script>
export default {
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  props: {
   title: {
    type: String,
    required: true
   } 
  }
}
</script>

<template>
  <button class="shadow-drop outline-none px-4 py-2 rounded-full bg-blue-500">{{ title }}</button>
</template>