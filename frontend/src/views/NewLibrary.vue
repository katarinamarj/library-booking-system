<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue'
import { LibraryService } from '@/services/library.service'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const library = ref({
    name: '',
    location: ''
})

function save() {
    if (library.value == null) return
    if (library.value.name == '' || library.value.location == '') {
        alert('Polja ime i lokacija su obavezna!')
        return
    }
    
    LibraryService.createLibrary(library.value).then(rsp => {
        router.push('/library')
    })
}
</script>

<template>
<Navigation />
<div v-if="library" class="container-fluid" style="width: 90%; height: 450px;">
        <nav aria-label="breadcrumb" class="mt-4 mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink to="/library">Libraries</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    New Library
                </li>
            </ol>
        </nav>
        <form v-on:submit.prevent="save">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" v-model="library.name">
            </div>
            <div class="mb-3">
                <label for="location" class="form-label">Location:</label>
                <input type="text" class="form-control" id="location" v-model="library.location">
            </div>
            <button type="submit" class="btn" style="background-color: #7393B3; color: white;">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
</template>

<style scoped>
.breadcrumb a {
  color: #7393B3; 
}
</style>