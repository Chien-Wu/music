<template>
  <div
    class="relative rounded-xl bg-white z-30 min-h-screen flex flex-col items-center justify-center p-6"
  >
    <div class="max-w-3xl mx-auto py-16 w-full">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">推薦系統</h2>

      <!-- 輸入框 -->
      <input
        v-model="userInput"
        placeholder="輸入一句話..."
        class="border rounded-md p-3 w-full text-lg"
      />

      <!-- 送出按鈕 -->
      <button
        @click="sendRequest"
        class="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        送出
      </button>

      <!-- API 回應結果 -->
      <div v-if="responseText" class="mt-6 p-4 bg-gray-100 rounded-md">
        <h3 class="text-xl font-semibold">API 回應：</h3>
        <p class="text-gray-800 mt-2">{{ responseText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const userInput = ref(""); // 存儲輸入的內容
const responseText = ref(""); // 存儲 API 返回的結果

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

    const data = await response.json();
    console.log("發送請求到:", "/api/recommend");
    responseText.value = data.message || JSON.stringify(data); // 顯示 API 返回的訊息
  } catch (error) {
    responseText.value = "發送請求失敗：" + error.message;
  }
};
</script>

<style scoped>
/* 可選的自定義樣式 */
</style>
