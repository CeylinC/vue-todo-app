<script>
export default {
  data() {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  props: {
    placeholder: {
      type: String,
      required: true
    },
    
  }
}
</script>

<template>
  <input type="text" class="shadow-inner outline-none px-2 py-1 rounded-md" :placeholder="placeholder"/>
</template>