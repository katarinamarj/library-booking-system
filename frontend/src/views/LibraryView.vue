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
<div class="container-fluid" style="min-height: 450px; width: 90%;">
<RouterLink to="/library/new" class="btn mt-3 mb-3" style="background-color: #7393B3; color: white;">
        + Add Library
 </RouterLink>
<table class="table  table-hover custom-library-table" v-if="libraries">
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
                        <RouterLink :to="`/library/${l.libraryId}`" class="btn btn-sm btn-success" title="Edit Library">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button type="button" class="btn btn-sm btn-danger ms-3" title="Delete Library" @click="deleteLibrary(l.libraryId)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
<Loading v-else />
</div>
</template>

<style>
.custom-library-table th,
.custom-library-table td {
  vertical-align: middle;
  font-size: 0.95rem;
  color: #333;
}

.custom-library-table thead th {
  background-color: 	#D3D3D3;
  color: #333;
  font-weight: 600;
  border-bottom: 2px solid #ccc;
}

.custom-library-table tr:hover td {
  background-color: #f9f9f9;
}

.btn-group .btn i {
  pointer-events: none; 
}
</style>