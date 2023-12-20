<script setup lang="ts">
  definePageMeta({
    title: "home.seoTitle",
  });

  const localePath = useLocalePath();

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
    <UButton :to="localePath(`/game/${getRandomString(5)}`)" block size="lg">
      {{ $t("home.createRoomLink") }}
    </UButton>
    <UDivider />
    <form
      :action="
        state.code ? localePath(`/game/${state.code.toUpperCase()}`) : undefined
      "
      class="flex flex-col gap-2"
    >
      <UInput
        maxlength="5"
        minlength="5"
        class="w-full"
        size="lg"
        :aria-label="$t('home.roomCodeInput.label')"
        :placeholder="$t('home.roomCodeInput.placeholder')"
        v-model="state.code"
      />
      <UButton
        type="submit"
        :disabled="state.code.length !== 5"
        class="peer-invalid:disabled"
        size="lg"
        block
        color="gray"
      >
        {{ $t("home.joinRoomCta") }}
      </UButton>
    </form>
    <p class="w-full text-xs text-gray-500 text-center">
      {{ $t("home.rules.hint") }}
      <NuxtLink :to="localePath('/rules')" class="font-semibold underline">
        {{ $t("home.rules.link") }}
      </NuxtLink>
    </p>
  </div>
</template>
