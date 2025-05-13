<script lang="ts" setup>
import type { LibraryModel } from '@/models/library.model';
import { LibraryService } from '@/services/library.service';
import { ref } from 'vue';


const libraries = ref<LibraryModel[]>([])
LibraryService.getLibraries().then(rsp => {
    libraries.value = rsp.data
})
</script>


<template>
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
                <td>{{ new Date(l.updatedAt ?? l.createdAt).toLocaleString('sr-RS') }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/library/${l.libraryId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>