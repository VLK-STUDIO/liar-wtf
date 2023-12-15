<script setup lang="ts">
  const config = useAppConfig();

  useSeoMeta({
    titleTemplate: `%s | ${config.siteName}`,
  });
</script>

<template>
  <main
    class="h-[100dvh] overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-12 max-w-sm p-8 mx-auto"
  >
    <NuxtPage />
    <UNotifications />
  </main>
</template>
