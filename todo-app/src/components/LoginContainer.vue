<script>
import Input from './Input.vue'
import Button from './Button.vue';
export default {
  components: {
    Input,
    Button
  }
}
</script>

<template>
  <div
    class="w-[320px] h-[500px] shadow-drop flex justify-center items-center flex-col gap-8 rounded-2xl"
  >
    <div>
      <div class="text-sm text-center">Todo App</div>
      <div class="text-2xl font-bold text-center">LOGIN</div>
    </div>
    <div class="flex flex-col gap-6">
      <Input placeholder="Email"/>
      <Input placeholder="Password"/>
    </div>
    <Button title="Login"/>
  </div>
</template>
