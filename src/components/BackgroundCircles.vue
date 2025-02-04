<template>
  <!-- 背景容器 -->
  <div class="fixed inset-0 overflow-hidden bg-jet p-4">
    <div class="relative w-full h-full flex inset-0 bg-night rounded-lg"></div>
  </div>

  <!-- 文字容器：位於背景之上，但會被圓形遮住；文字以視差效果隨滾動移動 -->
  <div
    class="absolute inset-0 flex flex-col items-center justify-center text-outline text-xxl font-bebas pointer-events-none z-10"
    style="left: 25%; top: 50%"
  >
    <h1 :style="findStyle">FIND</h1>
    <h1 :style="musicStyle">MUSIC</h1>
    <h1 :style="forStyle">FOR</h1>
    <h1 :style="todayStyle">TODAY</h1>
  </div>

  <!-- 圓形容器 -->
  <div class="fixed inset-0 overflow-hidden p-4 z-20">
    <div class="relative w-full h-full flex items-center justify-center">
      <!-- 左側圓形 -->
      <div
        class="z-30 absolute w-40 h-40 bg-orange rounded-full border-8 border-night flex items-center justify-center"
        :style="leftCircleStyle"
      >
        <div
          class="text-white font-bebas-500 text-xxs text-right leading-tight"
        >
          <i class="fa-solid fa-arrow-right"></i>
          <p>This platform</p>
          <p>brings you music</p>
          <p>based on mood</p>
          <p>and weather</p>
        </div>
      </div>

      <!-- 中央圓形 -->
      <div
        class="z-20 absolute w-40 h-40 bg-yellow rounded-full border-8 border-night flex items-center justify-center"
        style="left: 50%; top: 50%; transform: translate(-50%, -200%)"
      >
        <h1 class="z-30 text-white text-8xl font-bold font-bebas">MooLody</h1>
      </div>

      <!-- 右側圓形 -->
      <div
        class="z-10 absolute w-40 h-40 bg-gray rounded-full border-8 border-night flex flex-row gap-0 items-center justify-center shadow-2xl"
        :style="rightCircleStyle"
      >
        <div class="h-5 rounded-full p-1 bg-yellow">
          <p
            class="tracking-tighter leading-tight text-jet text-xxs font-beba font-bold"
          >
            Learn More
          </p>
        </div>
        <div
          class="w-5 h-5 rounded-full border p-1 border-yellow flex items-center justify-center"
        >
          <i
            class="text-yellow text-xs fa-solid fa-arrow-up transform rotate-45"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// 定義滾動相關參數
const scrollOffset = ref(0);
const factor = 0.2; // 原始滾動量縮放因子
const accelFactor = 0.1; // 用於圓形加速效果的因子

function handleScroll() {
  scrollOffset.value = window.scrollY * factor;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 非線性加速效果：用於圓形位置的偏移
const acceleratedOffset = computed(
  () => Math.pow(scrollOffset.value, 1.5) * accelFactor
);

// 左側圓形的 style
const leftCircleStyle = computed(() => ({
  left: "50%",
  top: "50%",
  transform: `translate(calc(-50% - ${acceleratedOffset.value}px), -200%)`,
}));

// 右側圓形的 style
const rightCircleStyle = computed(() => ({
  left: "50%",
  top: "50%",
  transform: `translate(calc(-50% + ${acceleratedOffset.value}px), -200%)`,
}));

// 文字視差效果：設定一個較小的因子，讓文字移動比滾動慢
const textFactor = 2.4;

const findStyle = computed(() => ({
  transform: `translate(-50%, calc(50% + ${
    scrollOffset.value * textFactor
  }px))`,
}));

const musicStyle = computed(() => ({
  transform: `translate(-10%, calc(10% + ${
    scrollOffset.value * textFactor
  }px))`,
}));

const forStyle = computed(() => ({
  transform: `translate(-80%, calc(-30% + ${
    scrollOffset.value * textFactor
  }px))`,
}));

const todayStyle = computed(() => ({
  transform: `translate(-30%, calc(-70% + ${
    scrollOffset.value * textFactor
  }px))`,
}));
</script>

<style scoped>
.text-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgb(39, 39, 39);
}
</style>
