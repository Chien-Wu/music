<template>
  <div
    class="relative rounded-xl bg-white z-30 min-h-screen flex flex-col items-center p-6"
  >
    <div class="max-w-3xl mx-auto py-16 w-full">
      <input
        v-model="userInput"
        placeholder="HOW ARE YOU TODAY?"
        class="border rounded-full p-3 w-full text-lg"
      />
      <button
        @click="sendRequest"
        class="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        SEND
      </button>
      <div v-if="apiData" class="mt-6 p-4 bg-gray-100 rounded-md">
        <h3 class="text-xl font-semibold">API 回應：</h3>
        <p class="text-gray-800 mt-2">{{ apiData.recommend.song_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const userInput = ref(""); // 存儲輸入的內容
const apiData = ref(null); // 儲存 API 返回的結果

const sendRequest = async () => {
  if (!userInput.value.trim()) {
    alert("請輸入一句話！");
    return;
  }

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userInput.value }),
    });

    // 將 API 回應儲存在反應式變數中
    apiData.value = await response.json();
    console.log(apiData.value);
  } catch (error) {
    apiData.value = { message: "發送請求失敗：" + error.message };
  }
};
</script>

<style scoped>
/* 可選的自定義樣式 */
</style>
