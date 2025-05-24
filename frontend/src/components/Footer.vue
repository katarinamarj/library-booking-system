<script lang="ts" setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <div class="footer-brand">
        <p class="footer-title">📚 <strong>Library App</strong></p>
        <p class="footer-tagline">Making reading accessible for everyone.</p>
      </div>

      <div class="footer-sections">
        <div class="footer-links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        <div class="footer-socials">
          <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="#"><i class="fa-solid fa-envelope"></i></a>
        </div>
      </div>

      <hr class="footer-divider" />

      <div class="footer-bottom">
        &copy; {{ new Date().getFullYear() }} Library App. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2.5rem 1rem 1rem;
  color: #3b3b3b;
  font-size: 0.95rem;
  border-top: 2px solid #dcdcdc;
  margin-top: 50px;
}

.footer-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand .footer-title {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.footer-tagline {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.footer-sections {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 1rem;
}

.footer-links a,
.footer-socials a {
  margin: 0 0.4rem;
  color: #7393B3;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-links a:hover,
.footer-socials a:hover {
  color: #6082B6;
}

.footer-socials i {
  font-size: 1.2rem;
}

.footer-divider {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid #c0c0c0;
}

.footer-bottom {
  font-size: 0.85rem;
  color: #777;
}
</style>
