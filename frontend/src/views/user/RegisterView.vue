<script lang="ts" setup>
import { setTokens } from '@/auth';
import Navigation from '@/components/Navigation.vue';
import router from '@/router';
import { login, register } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const password = ref<string>('')
const repeat = ref<string>('')

async function doRegister() {
    if (!firstName.value || !lastName.value || !email.value || !phone.value || !password.value || !repeat.value) {
        alert('Sva polja su obavezna')
        return
    }

    if (password.value !== repeat.value) {
        alert('Lozinke se ne poklapaju')
        return
    }

    try {
        await register({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            password: password.value
        })

        const rsp = await login(email.value, password.value)
        setTokens(rsp.data) 

        router.push('/library') 
    } catch (e) {
        alert('Registracija ili prijava neuspešna')
    }
}

</script>

<template>
    <Navigation />
    <div class="auth">
        <h3 class="text-center" style="margin-bottom: 40px; color:#36454F"><br>CREATE AN ACCOUNT</h3>
        <form v-on:submit.prevent="doRegister">
            <div class="mb-3">
                <label for="phone" class="form-label">First Name:</label>
                <input type="text" class="form-control" id="phone" v-model="firstName">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Last Name:</label>
                <input type="text" class="form-control" id="phone" v-model="lastName">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
            </div>
            <div class="mb-3">
                <label for="phone" class="form-label">Phone:</label>
                <input type="text" class="form-control" id="phone" v-model="phone">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" v-model="password">
            </div>
            <div class="mb-3">
                <label for="repeat" class="form-label">Confirm password:</label>
                <input type="password" class="form-control" id="repeat" v-model="repeat">
            </div>
            <div class="btn-group">
                <button type="submit" class="btn full">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Register
                </button>
                <RouterLink class="btn outline" to="/login">
                    <i class="fa-solid fa-right-to-bracket"></i> Already have an account?
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
  background-color: 	#708090;
  color: white;
  border-color: 	#708090;
}
</style>