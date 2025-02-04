<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Suggestions from "./views/Suggestions.vue";
import Navbar from "./components/Navbar.vue";
import Homeview from "./views/Homeview.vue";
</script>

<style lang="scss" scoped></style>
