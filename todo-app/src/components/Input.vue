<script lang="ts">
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    },
  },
}
</script>

<template>
  <input
    type="text"
    class="shadow-inner outline-none px-2 py-1 rounded-md"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
  />
</template>
