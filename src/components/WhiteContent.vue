<template>
  <div class="relative bg-jet z-30 flex flex-col items-center p-6">
    <div class="max-w-3xl mx-auto py-16 w-full space-y-6 text-white">
      <!-- 第 0 步：填空句子 -->
      <div v-if="currentStep === 0" class="space-y-8">
        <div class="rounded-full bg-gray">
          <input
            v-model="userInput"
            placeholder="Describe Your Mood In One Sentence"
            class="p-5 w-full text-lg bg-transparent rounded-full"
          />
        </div>
        <!-- 使用 AnimatedButton 取代原先的箭頭按鈕 -->
        <AnimatedButton
          label="NEXT"
          @click="goNext"
          :class="{ disabled: !userInput.trim() }"
        />
      </div>

      <!-- 第 1 ~ N 步：二選一題目 -->
      <div
        v-if="currentStep > 0 && currentStep <= choices.length"
        class="space-y-8"
      >
        <!-- 由於 choices 為陣列，使用 currentStep-1 取得目前題目 -->
        <div
          class="p-2 rounded-full bg-gray relative overflow-hidden"
          v-if="currentChoice"
        >
          <div class="relative">
            <!-- 高亮指示器：只有使用者選擇後才會顯示 -->
            <div
              v-if="selectedOptions[currentChoice.id]"
              class="absolute top-0 left-0 h-full w-1/2 bg-orange rounded-full transition-all duration-300"
              :style="{
                transform:
                  selectedOptions[currentChoice.id] === 'option2'
                    ? 'translateX(100%)'
                    : 'translateX(0)',
              }"
            ></div>
            <!-- 二選一按鈕 -->
            <div class="relative flex">
              <button
                @click="selectOption(currentChoice.id, 'option1')"
                class="flex-1 rounded-full p-3 text-lg transition-colors duration-300 ease-in-out z-10"
                :class="
                  selectedOptions[currentChoice.id] === 'option1'
                    ? 'text-black'
                    : 'text-white'
                "
              >
                {{ currentChoice.option1 }}
              </button>
              <button
                @click="selectOption(currentChoice.id, 'option2')"
                class="flex-1 rounded-full p-3 text-lg transition-colors duration-300 ease-in-out z-10"
                :class="
                  selectedOptions[currentChoice.id] === 'option2'
                    ? 'text-black'
                    : 'text-gray-800'
                "
              >
                {{ currentChoice.option2 }}
              </button>
            </div>
          </div>
        </div>
        <!-- 使用 AnimatedButton 前往下一題 -->
        <AnimatedButton
          label="NEXT"
          @click="goNext"
          :class="{ disabled: !selectedOptions[currentChoice?.id] }"
        />
      </div>

      <!-- 當所有題目皆回答完畢後顯示 Spotify 播放器 -->
      <div v-if="currentStep > choices.length" class="mt-6 p-4 rounded-full">
        <!-- 使用 Tailwind class 使 iframe 置中並全寬 -->
        <iframe
          v-if="spotifyEmbedUrl"
          :src="spotifyEmbedUrl"
          width="100%"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
          class="w-full mx-auto"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AnimatedButton from "./AnimatedButton.vue";

// 輸入與 API 回應的狀態
const userInput = ref("");
const apiData = ref(null);

// 取得 /choice-set API 回傳的選項資料
const choices = ref([]);

// 追蹤各題的選擇狀態
const selectedOptions = ref({});

// 追蹤目前步驟（0 為填空題；1~N 為二選一題目）
const currentStep = ref(0);

// 取得目前題目（如果 currentStep 大於 0，就從 choices 陣列中取得）
const currentChoice = computed(() => {
  if (currentStep.value > 0 && currentStep.value <= choices.value.length) {
    return choices.value[currentStep.value - 1];
  }
  return null;
});

// 組合 Spotify 嵌入 URL，利用 API 回應中的 spotify_id
const spotifyEmbedUrl = computed(() => {
  if (
    apiData.value &&
    apiData.value.recommend &&
    apiData.value.recommend.spotify_id
  ) {
    return `https://open.spotify.com/embed/track/${apiData.value.recommend.spotify_id}`;
  }
  return "";
});

// 更新選項
const selectOption = (id, option) => {
  selectedOptions.value[id] = option;
};

// 切換到下一題
const goNext = async () => {
  // 如果目前是填空題，則直接前進並呼叫 API
  if (currentStep.value === 0) {
    if (userInput.value.trim()) {
      await sendRequest(); // 送出 API 請求
      currentStep.value++;
    }
  } else {
    // 檢查目前題目是否已選擇
    if (currentChoice.value && selectedOptions.value[currentChoice.value.id]) {
      currentStep.value++;
    }
  }
};

// 送出 API 請求
const sendRequest = async () => {
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

// 頁面載入時取得選項資料
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
