<script setup lang="ts">
  defineProps<{
    guesserName: string;
    topicTitle: string;
  }>();
</script>

<template>
  <div class="flex flex-col items-center gap-4 text-center">
    <h1 class="text-2xl font-semibold font-serif">
      {{ guesserName }} is guessing who's saying the truth...
    </h1>

    <p class="text-gray-600">
      Convince them that you're the one who read about
      <strong class="font-semibold">{{ topicTitle }}!</strong>
    </p>
  </div>
</template>
