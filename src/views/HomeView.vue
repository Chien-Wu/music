<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const suggestions = ref([]);
const connection = ref(null);
onMounted(() => {
  axios
    .get("/api")
    .then((response) => {
      connection.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  axios
    .get("/api/suggestions")
    .then((response) => {
      suggestions.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Song Suggestions</h1>
    <h1 class="text-m font-bold mb-4">{{ connection }}</h1>
    <!-- Render the list of suggestions -->
    <ul class="space-y-4">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        class="p-4 border rounded-md shadow-sm"
      >
        <!-- Clickable link to Spotify track -->
        <a
          :href="`https://open.spotify.com/track/${item.spotify_id}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xl font-bold text-blue-600 hover:underline"
        >
          {{ item.song_name }}
        </a>
        <div class="text-gray-700 mt-1">Spotify ID: {{ item.spotify_id }}</div>
      </li>
    </ul>
  </main>
</template>
