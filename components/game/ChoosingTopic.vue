<script lang="ts" setup>
  defineProps<{
    topic: {
      title: string;
      summary: string;
    };
  }>();
</script>

<template>
  <div class="flex flex-col gap-3 text-center">
    <h1 class="text-3xl font-semibold font-serif">{{ topic.title }}</h1>
    <p class="font-serif text-gray-600">{{ topic.summary }}</p>
  </div>
</template>
