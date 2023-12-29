<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="flex flex-col gap-2 items-center text-center">
    <h1 class="font-semibold font-serif text-3xl">{{ title }}</h1>
    <p class="text-gray-600 dark:text-gray-400"><slot /></p>
  </div>
</template>
