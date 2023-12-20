<script setup lang="ts">
  definePageMeta({
    title: "rules.seoTitle",
  });

  const localePath = useLocalePath();
</script>

<template>
  <div class="max-w-2xl w-full flex flex-col gap-12 justify-center px-8 py-16">
    <UButton
      color="white"
      :to="localePath('/')"
      leading-icon="i-tabler-chevron-left"
      class="self-start"
    >
      {{ $t("rules.homeLink") }}
    </UButton>
    <ContentDoc class="prose font-serif" />
  </div>
</template>
