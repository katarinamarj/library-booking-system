<script lang="ts" setup>
import { setTokens } from '@/auth';
import Navigation from '@/components/Navigation.vue';
import { login } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const email = ref<string>('')
const password = ref<string>('')
const route = useRoute()
const router = useRouter()

function doLogin() {
    if (email.value == '' || password.value == '') return
    login(email.value, password.value)
        .then(rsp => {
            setTokens(rsp.data)
            if (route.query.r) {
                router.push(route.query.r as string)
                return
            }

            router.push('/library')
        })
        .catch(e => alert('Login failed'))
}
</script>

<template>
    <Navigation />
    <div class="auth mt-5" style="height: 450px;">
        <h3 class="text-center mb-4" style="color:#36454F;"><br>LOG IN</h3>
        <form v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Pasword:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="btn-group">
                <button type="submit" class="btn full">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Log in
                </button>
                <RouterLink class="btn outline" to="/register">
                  <i class="fa-solid fa-user-plus"></i> Create new account
                </RouterLink>
            </div>
        </form>
    </div>
</template>

<style scoped>
.btn {
  padding: 0.3em 0.8em;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  border: 2px solid transparent;
  text-decoration: none;
  cursor: pointer;
}

.btn.full {
  background-color: #7393B3;
  color: white;
  border-color: #7393B3;
}

.btn.full:hover {
  background-color: #6082B6;
  border-color: #6082B6;
}

.btn.outline {
  background-color: transparent;
  color: #7393B3;
  border: 2px solid #7393B3;
}

.btn.outline:hover {
  background-color: #708090;
  color: white;
  border-color: #708090;
}
</style>