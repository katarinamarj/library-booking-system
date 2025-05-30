<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { getRefreshToken, getUserEmail } from '../auth'
import { useLogout } from '../hooks/logout.hook'

const logout = useLogout()
</script>

<template>
  <div class="container" style="background-color: #f8f9fa;">
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
      <div class="container-fluid">
        <RouterLink class="navbar-brand fs-4" to="/" style="color: #36454F;"> 
          <i class="fa-solid fa-book-open-reader"></i>   <b>Library  </b>
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/" exact-active-class="active">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/about" exact-active-class="active">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/list" exact-active-class="active">List</RouterLink>
            </li>

            <template v-if="getRefreshToken()">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/library" exact-active-class="active">Libraries</RouterLink>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  User
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <RouterLink class="dropdown-item" to="/user">My Account</RouterLink>
                  </li>
                   <li>
                    <RouterLink class="dropdown-item" to="/reservations">My Reservations</RouterLink>
                  </li>
                  <li>
                    <button type="button" class="dropdown-item" @click="logout">Log Out</button>
                  </li>
                </ul>
              </li>
            </template>

            <template v-else>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login" exact-active-class="active">Log In</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/register" exact-active-class="active">Register</RouterLink>
              </li>
            </template>
          </ul>

          <span class="navbar-text" v-if="getRefreshToken()">
            <i class="fa-solid fa-user"></i> {{ getUserEmail() }}
          </span>
        </div>
      </div>
    </nav>

    
  </div>
</template>

<style scoped>
.navbar {
  background-color: white !important;
  border-bottom: 2px solid #dcdcdc;
}

.navbar-brand {
  color: #36454F !important;
  font-weight: bold;
}

.nav-link {
  color: #3b3b3b !important;
  font-weight: 500;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.nav-link:hover {
  color: #6082B6 !important;
}

.nav-link.active {
  color: #7393B3 !important;
  font-weight: bold;
  border-bottom: 2px solid #7393B3;
}

.navbar-nav .nav-link {
  font-size: 0.92rem;
  margin-right: 0.6rem;
}

.dropdown-menu .dropdown-item {
  font-size: 0.9rem;
}

.dropdown-item:hover {
  background-color: #e9ecef;
  color: #6082B6;
}

.navbar-text {
  font-size: 0.9rem;
  color: #36454F !important;
}
</style>