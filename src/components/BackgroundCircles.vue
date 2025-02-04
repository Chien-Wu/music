<template>
  <div class="fixed inset-0 overflow-hidden bg-jet p-4">
    <div class="relative w-full h-full flex inset-0 bg-night rounded-lg"></div>
  </div>
  <div
    class="absolute inset-0 flex flex-col items-center justify-cente text-outline text-xxl font-bebas pointer-events-none z-10"
    style="left: 25%; top: 50%"
  >
    <h1 style="transform: translate(-50%, -45%)">FIND</h1>
    <h1 style="transform: translate(-10%, -90%)">MUSIC</h1>
    <h1 style="transform: translate(-80%, -135%)">FOR</h1>
    <h1 style="transform: translate(-30%, -180%)">TODAY</h1>
  </div>

  <div class="fixed inset-0 overflow-hidden p-4 z-20">
    <div class="relative w-full h-full flex items-center justify-center">
      <div
        class="z-20 absolute w-40 h-40 bg-orange rounded-full border-8 border-night flex items-center justify-center"
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

      <div
        class="z-20 absolute w-40 h-40 bg-gray rounded-full border-8 border-night flex items-center justify-center"
        style="left: 50%; top: 50%; transform: translate(-50%, -200%)"
      >
        <h1 class="z-30 text-white text-2xl font-bold font-bebas">MooLody</h1>
      </div>

      <div
        class="z-20 absolute w-40 h-40 bg-yellow rounded-full border-8 border-night"
        :style="rightCircleStyle"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// 定義 scroll 相關參數
const scrollOffset = ref(0);
const factor = 0.5;
const accelFactor = 0.025;

function handleScroll() {
  scrollOffset.value = window.scrollY * factor;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 使用非線性公式產生加速效果：初始移動慢，結束時快
const acceleratedOffset = computed(
  () => Math.pow(scrollOffset.value, 1.5) * accelFactor
);

// 左側圓形的 style，利用 acceleratedOffset 向左偏移，並上調至 -200%
const leftCircleStyle = computed(() => ({
  left: "50%",
  top: "50%",
  transform: `translate(calc(-50% - ${acceleratedOffset.value}px), -200%)`,
}));

// 右側圓形的 style，利用 acceleratedOffset 向右偏移，並上調至 -200%
const rightCircleStyle = computed(() => ({
  left: "50%",
  top: "50%",
  transform: `translate(calc(-50% + ${acceleratedOffset.value}px), -200%)`,
}));
</script>

<!-- 如果 Tailwind 中未定義 bg-jet 與 bg-night，可以在全域 CSS 或此處自定義 -->
<style scoped>
.text-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgb(54, 54, 54);
}
</style>
