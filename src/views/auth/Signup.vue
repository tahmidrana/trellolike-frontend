<template>
  <div class="w-full max-w-md mx-auto my-20">
    <h3 class="text-2xl font-bold text-center py-2">Sign up</h3>
    <div class="">
      <form @submit.prevent="signupSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input v-model="form.name" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="form.email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="form.password" id="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************">
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign up
          </button>
          <router-link to="/login" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Already registered? Login here</router-link>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 Vue Trello. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    ...mapActions({ signUp: 'auth/signUp' }),
    signupSubmit() {
      if (this.form.email && this.form.password) {
        this.signUp(this.form).then(() => {
          this.$router.push('/login')
        }).catch(err => {
          this.errors.push(err)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>