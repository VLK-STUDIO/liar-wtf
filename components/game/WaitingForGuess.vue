<script setup lang="ts">
  defineProps<{
    guesserName: string;
    topicTitle: string;
  }>();
</script>

<template>
  <DescribedHeader
    :title="`${guesserName} is guessing who's saying the truth...`"
  >
    Convince them that you're the one who read about
    <strong class="font-semibold">{{ topicTitle }}</strong>
  </DescribedHeader>
</template>
