<script setup lang="ts">
  definePageMeta({
    title: "rules.seoTitle",
  });

  const localePath = useLocalePath();
</script>

<template>
  <div class="max-w-2xl w-full flex flex-col gap-12 justify-center pt-10 pb-32">
    <UButton
      color="white"
      :to="localePath('/')"
      leading-icon="i-tabler-chevron-left"
      class="self-start"
    >
      {{ $t("rules.homeLink") }}
    </UButton>
    <ContentDoc class="prose font-serif dark:prose-invert" />
  </div>
</template>
