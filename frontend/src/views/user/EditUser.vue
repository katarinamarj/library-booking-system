<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAxios } from '@/utils'
import { ref, onMounted } from 'vue'
import Navigation from '@/components/Navigation.vue'

const router = useRouter()
const user = ref<any>(null)

const form = reactive({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
})

onMounted(async () => {
    const rsp = await useAxios('/user/self')
    user.value = rsp.data
    form.firstName = user.value.firstName
    form.lastName = user.value.lastName
    form.phone = user.value.phone ?? ''
    form.email = user.value.email
})

const updateUser = async () => {
    try {
        let payload: any = { ...form }

        if (!form.password) {
            delete payload.password
        }

        const rsp = await useAxios('/user/self', 'put', payload)
        alert('User updated successfully')
        router.push('/user')
    } catch (e) {
        alert('Update failed')
    }

    form.password = ''
}
</script>

<template>
    <Navigation />
    <div class="container-fluid mt-4 d-flex justify-content-center">
        <div style="width: 40%;">
            <h2 class="text-center mb-4" style="color:#36454F;">Edit Profile</h2>
            <form @submit.prevent="updateUser">
                <div class="mb-3 mt-4">
                    <label>First Name</label>
                    <input v-model="form.firstName" class="form-control" />
                </div>
                <div class="mb-3">
                    <label>Last Name</label>
                    <input v-model="form.lastName" class="form-control" />
                </div>
                <div class="mb-3">
                    <label>Phone</label>
                    <input v-model="form.phone" class="form-control" />
                </div>
                <div class="mb-3">
                    <label>Email</label>
                    <input v-model="form.email" class="form-control" />
                </div>
                <div class="mb-3">
                    <label>Password</label>
                    <input type="password" v-model="form.password" class="form-control" />
                </div>
                <button class="btn w-30 mx-auto d-block mt-4" style="background-color: #7393B3; color: white;">Save Changes</button>
            </form>
        </div>
    </div>
</template>
