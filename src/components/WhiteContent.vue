<template>
  <div class="relative bg-jet z-30 min-h-screen flex flex-col items-center p-6">
    <div class="max-w-3xl mx-auto py-16 w-full space-y-6 text-white">
      <div class="space-y-8">
        <div class="rounded-full bg-gray">
          <input
            v-model="userInput"
            @blur="sendRequest"
            placeholder="Describe Your Mood In One Sentence"
            class="p-5 w-full text-lg bg-transparent rounded-full"
          />
        </div>

        <!-- 修改後的選項區塊 -->
        <div
          v-if="choices.length"
          v-for="(choice, index) in choices"
          :key="choice.id"
          class="p-2 rounded-full bg-gray relative overflow-hidden"
        >
          <!-- 相對定位的容器 -->
          <div class="relative">
            <!-- 滑動的高亮指示器 -->
            <div
              class="absolute top-0 left-0 h-full w-1/2 bg-orange rounded-full transition-all duration-300"
              :style="{
                transform:
                  selectedOptions[choice.id] === 'option2'
                    ? 'translateX(100%)'
                    : 'translateX(0)',
              }"
            ></div>
            <!-- 按鈕容器：改成 flex 並各占 50% -->
            <div class="relative flex">
              <button
                @click="selectOption(choice.id, 'option1')"
                class="flex-1 rounded-full p-3 text-lg transition-colors duration-300 ease-in-out z-10"
                :class="
                  selectedOptions[choice.id] === 'option1'
                    ? 'text-black'
                    : 'text-white'
                "
              >
                {{ choice.option1 }}
              </button>
              <button
                @click="selectOption(choice.id, 'option2')"
                class="flex-1 rounded-full p-3 text-lg transition-colors duration-300 ease-in-out z-10"
                :class="
                  selectedOptions[choice.id] === 'option2'
                    ? 'text-black'
                    : 'text-gray-800'
                "
              >
                {{ choice.option2 }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- API Response Display -->
      <div v-if="apiData" class="mt-6 p-4 rounded-full">
        <h3 class="text-xl font-semibold">API 回應：</h3>
        <p class="mt-2">{{ apiData.recommend.song_name }}</p>
        <p class="">{{ apiData.recommend.spotify_id }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 文字輸入與 API 回應的狀態
const userInput = ref("");
const apiData = ref(null);

// 存放 /choice-set API 回傳的選項資料
const choices = ref([]);

// 追蹤每個選項組別的選取狀態
const selectedOptions = ref({});

// 更新選取的選項
const selectOption = (id, option) => {
  selectedOptions.value[id] = option;
};

// 送出請求給 /api/recommend (保持原有邏輯)
const sendRequest = async () => {
  if (!userInput.value.trim()) {
    return;
  }
  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userInput.value }),
    });
    apiData.value = await response.json();
    console.log(apiData.value);
  } catch (error) {
    apiData.value = { message: "發送請求失敗：" + error.message };
  }
};

// 頁面載入時從 /choice-set 取得選項資料
onMounted(async () => {
  try {
    const response = await fetch("/api/choice-set");
    const data = await response.json();
    choices.value = data;
  } catch (error) {
    console.error("Failed to load choices", error);
  }
});
</script>
