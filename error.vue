<script setup lang="ts">
  const localePath = useLocalePath();
</script>

<template>
  <main class="h-[100dvh] flex flex-col justify-center items-center gap-8">
    <DescribedHeader>
      <template #header>
        {{ $t("error.title") }}
      </template>
      <template #description>
        {{ $t("error.description") }}
      </template>
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
