<script setup lang="ts">
  const { t } = useI18n({
    useScope: "local",
  });

  useSeoMeta({
    title: t("home.seoTitle"),
  });

  const localePath = useLocalePath();

  const STATIC_ROOM_CODE = getRandomString(5);

  const { siteName } = useAppConfig();

  const state = ref({
    code: "",
  });
</script>

<template>
  <header class="flex flex-col gap-4 items-center">
    <h1 class="font-serif text-4xl font-semibold">{{ siteName }}</h1>
    <p class="text-center text-gray-600">
      {{ $t("home.header.description") }}
    </p>
  </header>
  <div class="flex flex-col gap-4 w-full">
    <UButton :to="localePath(`/game/${STATIC_ROOM_CODE}`)" block size="lg">
      {{ $t("home.createRoomLink") }}
    </UButton>
    <UDivider />
    <form :action="localePath(`/game/${state.code}`)">
      <UInput
        maxlength="5"
        minlength="5"
        class="w-full"
        size="lg"
        :aria-label="$t('home.roomCodeInput.label')"
        :placeholder="$t('home.roomCodeInput.placeholder')"
        v-model="state.code"
      />
    </form>
  </div>
</template>
