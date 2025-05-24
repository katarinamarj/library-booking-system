<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import type { LibraryModel } from '@/models/library.model';
import { LibraryService } from '@/services/library.service';
import { formatDate } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const library = ref<LibraryModel>()

LibraryService.getLibraryById(id)
    .then(rsp => library.value = rsp.data)

function save() {
    if (library.value == null) return
    LibraryService.updateLibrary(id, library.value).then(rsp => {
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
                    {{ library.name}}
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
            <div class="mb-3">
                <label for="updated" class="form-label">Updated at:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatDate(library.updatedAt ?? library.createdAt)" disabled>
            </div>
            <button type="submit" class="btn" style="background-color: #7393B3; color: white;">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
    <Loading v-else />
</template>

<style scoped>
.breadcrumb a {
  color: #7393B3; 
}
</style>