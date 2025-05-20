<script lang="ts" setup>
import type { LibraryModel } from '@/models/library.model';
import { LibraryService } from '@/services/library.service';
import { ref } from 'vue';
import { formatDate } from '@/utils';
import Navigation from '@/components/Navigation.vue';
import Loading from '@/components/Loading.vue';


const libraries = ref<LibraryModel[]>([])
LibraryService.getLibraries().then(rsp => {
    libraries.value = rsp.data
})


function deleteLibrary(id: number) {
    LibraryService.deleteLibraryById(id)
        .then(rsp => {
            libraries.value = libraries.value?.filter(l => l.libraryId !== id)
        })
}
</script>


<template>
    <Navigation />
<RouterLink to="/library/new" class="btn btn-primary">
        + Add Library
 </RouterLink>
<table class="table table-striped table-hover" v-if="libraries">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Updated at</th>
                <th scope="col">Options</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="l of libraries">
                <th scope="row">{{ l.libraryId }}</th>
                <td>{{ l.name }}</td>
                <td>{{ l.location }}</td>
                <td>{{ formatDate(l.updatedAt ?? l.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/library/${l.libraryId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger" @click="deleteLibrary(l.libraryId)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <Loading v-else />
</template>