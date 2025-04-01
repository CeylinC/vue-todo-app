<script lang="ts">
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import axios from 'axios'
export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async login() {
      this.errorMessage = ''
      try {
        const { data } = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        })

        if (data.token) {
          document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`
          localStorage.setItem("userID", data.userId)
          localStorage.setItem("username", data.username)
          this.$router.push({ path: '/' })
        } else {
          console.error('No token received in response')
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || "Giriş başarısız"
        } else {
          this.errorMessage = "Sunucuya bağlanılamadı"
        }
      }
    },
  },
}
</script>

<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <div
      class="w-[320px] h-[500px] shadow-drop flex justify-center items-center flex-col gap-8 rounded-2xl"
    >
      <div>
        <div class="text-sm text-center">Todo App</div>
        <div class="text-2xl font-bold text-center">LOGIN</div>
      </div>
      <div class="flex flex-col gap-6">
        <Input placeholder="Email" v-model="email" />
        <Input placeholder="Password" v-model="password" />
      </div>
      <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
      <Button title="Login" @click="login" />
      <a href="/signup">Signup</a>
    </div>
  </div>
</template>
