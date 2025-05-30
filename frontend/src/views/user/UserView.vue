<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { UserModel } from '@/models/user.model';
import { useAxios } from '@/utils';
import { ref } from 'vue';

const user = ref<UserModel>()
const logout = useLogout()
useAxios('/user/self')
    .then(rsp => user.value = rsp.data)
    .catch(e => logout())

</script>

<template>
    <Navigation />
    <div class="row mt-3" v-if="user" style="height: 450px;">
        <div class="col-12 col-md-9 container-fluid">
            <h3 style="margin-top: 1rem; margin-bottom: 1rem; color: #36454F;">My Account</h3>
            <div class="table-responsive">
                <table class="table table-bordered table-hover custom-account-table">
                    <tbody>
                    <tr>
                        <th>First Name</th>
                        <td>{{ user.firstName }}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{{ user.lastName }}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{{ user.phone }}</td>
                    </tr>    
                    </tbody>
                </table>
                <RouterLink to="/user/edit" class="btn mt-3" style="background-color: #7393B3; color: white;">Edit Profile</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.account-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #36454F;
  font-weight: 600;
  font-size: 1.5rem;
}

.custom-account-table th {
  width: 30%;
  background-color: #f0f0f0;
  color: #333;
  font-weight: 500;
  vertical-align: middle;
}

.custom-account-table td {
  background-color: #ffffff;
  color: #555;
  vertical-align: middle;
}

.custom-account-table tr:hover td {
  background-color: #f9f9f9;
}
</style>