<script setup lang="ts">
  definePageMeta({
    layout: false,
  });
</script>

<template>
  <article
    class="max-w-2xl mx-auto min-h-[100dvh] w-full overflow-y-auto flex flex-col gap-3 justify-center p-8"
  >
    <ContentDoc class="prose font-serif" />
  </article>
</template>
