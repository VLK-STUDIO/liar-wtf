<script setup lang="ts">
  const localePath = useLocalePath();
</script>

<template>
  <main class="h-[100dvh] flex flex-col justify-center items-center gap-8">
    <DescribedHeader :title="$t('error.title')">
      {{ $t("error.description") }}
    </DescribedHeader>
    <UButton
      :to="localePath('/')"
      color="white"
      size="lg"
      leading-icon="i-tabler-chevron-left"
    >
      {{ $t("error.homeLink") }}
    </UButton>
  </main>
</template>
