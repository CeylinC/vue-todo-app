<script lang="ts">
import Check from '@/assets/icons/Check.vue'

export default {
  components: {
    Check,
  },
  props: {
    isChecked: Boolean,
  },
}
</script>

<template>
  <div
    :class="[
      'w-5 h-5 flex items-center justify-center border-2 border-[#8F87F1] rounded-sm',
      { 'bg-[#8F87F1]': isChecked },
    ]"
  >
    <Check v-if="isChecked" />
  </div>
</template>
