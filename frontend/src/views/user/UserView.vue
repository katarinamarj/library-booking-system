<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { UserModel } from '@/models/user.model';
import { formatDate, useAxios } from '@/utils';
import { onMounted, ref } from 'vue';

const user = ref<UserModel>()
const logout = useLogout()
useAxios('/user/self')
    .then(rsp => user.value = rsp.data)
    .catch(e => logout())

</script>

<template>
    <Navigation />
    <div class="row mt-3" v-if="user">
        <div class="col-12 col-md-9">
            <h3>My Account</h3>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">First Name:</th>
                        <td>{{ user.firstName }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Last Name:</th>
                        <td>{{ user.lastName }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email:</th>
                        <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phone:</th>
                        <td>{{ user.phone }}</td>
                    </tr>    
                </tbody>
            </table>  
        </div>
    </div>
</template>