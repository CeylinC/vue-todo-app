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
      username: '',
      errorMessage: '',
    }
  },
  methods: {
    async signup() {
      this.errorMessage = ''
      try {
        const { data } = await axios.post('http://localhost:3000/signup', {
          username: this.username,
          email: this.email,
          password: this.password,
        })

        if (data) {
          document.cookie = `token=${data.token}; path=/; secure; SameSite=Strict`
          localStorage.setItem('userID', data.userId)
          localStorage.setItem('username', data.username)
          this.$router.push({ path: '/' })
        } else {
          console.error('No token received in response')
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Giriş başarısız'
        } else {
          this.errorMessage = 'Sunucuya bağlanılamadı'
        }
      }
    },
  },
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div
      class="w-[320px] h-[500px] shadow-drop flex justify-center items-center flex-col gap-8 rounded-2xl"
    >
      <div>
        <div class="text-sm text-center">Todo App</div>
        <div class="text-2xl font-bold text-center">SIGNUP</div>
      </div>
      <div class="flex flex-col gap-6">
        <Input placeholder="Name" v-model="username" />
        <Input placeholder="Email" v-model="email" />
        <Input placeholder="Password" v-model="password" />
      </div>
      <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>
      <Button title="Signup" @click="signup" />
      <a href="/login">Login</a>
    </div>
  </div>
</template>
