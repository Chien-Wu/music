<template>
  <div class="relative z-50">
    <!-- 將黃色區塊放在 nav 同一層，且不要讓它創建獨立堆疊上下文 -->
    <div
      class="fixed top-0 left-0 w-full h-6 bg-jet pointer-events-none"
      style="mix-blend-mode: overlay"
    ></div>
    <nav class="inset-x-0 top-0 p-12 bg-gray-800 text-orange">
      <div
        class="max-w-7xl mx-auto py-2 px-4 flex items-center justify-between"
      >
        <div class="w-16 flex justify-start">
          <i class="text-xl fa-solid fa-bars"></i>
        </div>
        <div class="flex-1 text-center">
          <h1 class="text-xl font-bold">MooLody</h1>
        </div>
        <div class="w-16 flex justify-end">
          <a href="/signin" class="hover:text-gray-300">Sign In</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped></style>
