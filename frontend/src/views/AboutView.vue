<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <Navigation />
  <div class="container-fluid py-5 bg-white" style="width:95%;">
    <div class="row align-items-center">
      <div class="col-lg-5 mb-4 mb-lg-0 text-center">
        <img
          src="https://i.pinimg.com/736x/b4/cf/1e/b4cf1efcecf26a5ce6b70d116e98f6f6.jpg"
          class="img-fluid rounded shadow"
          alt="Library illustration"
          style="max-height: 400px; object-fit: cover;"
        />
      </div>
      <div class="col-lg-7">
        <h2 class="mb-4">📖 Welcome to our Library App!</h2>
        <p class="lead">
          This application allows you to browse, explore, and reserve books easily – whether you’re <br/> a curious reader, a student, or a lifelong learner.
        </p>

        <ul class="list-unstyled">
          <li class="mb-2"><strong>📚 Explore:</strong> a vast collection of books</li>
          <li class="mb-2"><strong>🔍 Search:</strong> for books by title, author, category, or keyword</li>
          <li class="mb-2"><strong>🏛️ Reserve:</strong> books from libraries connected to your profile</li>
          <li class="mb-2"><strong>🧾 Manage:</strong> your own account and view reservations</li>
        </ul>

        <p class="mt-3">
          Our mission is to make book discovery and reservations easy, fast, and accessible for everyone. Whether you’re just browsing or know exactly what you're looking for, this app provides a clean and user-friendly experience.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: bold;
}

p,
li {
  font-size: 1.05rem;
  color: #333;
}

ul {
  padding-left: 0;
}
</style>
