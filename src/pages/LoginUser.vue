<template>
  <q-layout view="lHh Lpr lFf" class="page">
    <q-page-container>
      <div class="row justify-center header">
        <div class="col-1 col-xs-8 col-sm-7 col-md-4 col-lg-2">
          <q-img src="~assets/andgamingarena_logo.png" width="400" height="400" fit />
        </div>
      </div>
      <div class="q-mx-lg">
        <form @submit.prevent="submitForm">
          <div class="row justify-center">
            <span class="text-h4 text-bold text-white">Admin Login</span>
          </div>
          <div class="row justify-center q-my-lg">
            <q-input
              dark
              v-model="formData.username"
              type="text"
              label-color="white"
              placeholder="Username"
              color="white"
              class="col col-lg-3 col-md-6 col-sm-10"
              :autofocus="true"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" color="white" />
              </template>
            </q-input>
          </div>
          <div class="row justify-center q-my-lg">
            <q-input
              dark
              v-model="formData.password"
              label-color="white"
              placeholder="Password"
              color="white"
              :type="isPwd ? 'password' : 'text'"
              class="col col-lg-3 col-md-6 col-sm-10"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-lock" color="white" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  color="white"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="row justify-center q-my-lg">
            <q-btn
              label="Sign In"
              size="lg"
              rounded
              type="submit"
              glossy
              :disabled="!formData.username.length || !formData.password.length"
              class="col col-lg-3 col-md-6 col-sm-10 text-white text-subtitle2 text-capitalize bg-black"
            />
          </div>

          <q-dialog v-model="reloading" persistent maximized>
            <q-spinner-ios color="white" size="lg" />
          </q-dialog>
        </form>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '../stores/authStore.js'
import { storeToRefs } from 'pinia'
import axios from 'axios'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const { config } = storeToRefs(authStore) // equivalent to mapState
const { updateToken } = authStore // equivalent to mapActions

const reloading = ref(false)
const isPwd = ref(true)
const formData = ref({
  username: '',
  password: '',
})

function setAuthToken(authToken) {
  localStorage.setItem('authToken', authToken)
}

async function submitForm() {
  console.log('Form Submitted')
  try {
    reloading.value = true
    const response = await axios.post(config.value.BACKEND_API_URL + '/api/v1/auth/login', {
      username: formData.value.username,
      password: formData.value.password,
    })
    if (response.data.success === true) {
      const authToken = response.data.token
      setAuthToken(authToken)
      updateToken(authToken)
      router.push('/admin')
      console.log('Pushed router to admin')
      $q.notify({
        message: 'Login Successful',
        type: 'positive',
        position: 'top',
        classes: 'glossy',
      })
    }
  } catch (error) {
    console.error(error)
    reloading.value = false
    $q.notify({
      message: 'Login Failed',
      caption: 'Invalid Credentials',
      position: 'top',
      type: 'negative',
    })
  }
}
</script>

<style scoped>
.page {
  background-image: radial-gradient(circle at center, #0049aa, #000c21);
}
.header {
  margin: 0px 10px 40px 10px;
  padding: 60px 10px 20px 10px;
}
.seperator {
  margin: 0px 500px;
}
</style>
