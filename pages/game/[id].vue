<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
  import type { UnwrapRef } from "vue";
  import type { StateShape } from "~/stores/game";

  const route = useRoute();

  const { t, locale } = useI18n({
    useScope: "local",
  });

  useSeoMeta({
    title: t("game.seoTitle", { roomCode: route.params.id }),
  });

  const gameStore = useGameStore();

  const toast = useToast();

  if (!route.params.id || typeof route.params.id !== "string") {
    navigateTo("/");
  }

  const formState = ref({
    name: "",
  });

  const isConnectionPending = ref(false);

  async function handleSubmit({
    data,
  }: FormSubmitEvent<UnwrapRef<typeof formState>>) {
    isConnectionPending.value = true;

    try {
      await gameStore.connect(route.params.id as string, data.name, {
        locale: locale.value,
      });

      gameStore.registerToPlayerConnectionEvents((event) => {
        if (event.type === "PLAYER_DISCONNECTED") {
          toast.add({
            title: t("game.toasts.playerDisconnected.title"),
            description: t("game.toasts.playerDisconnected.description", {
              playerName: event.payload.playerName,
            }),
            icon: "i-heroicons-user-minus",
            color: "red",
          });
        } else if (event.type === "PLAYER_RECONNECTED") {
          toast.add({
            title: t("game.toasts.playerReconnected.title"),
            description: t("game.toasts.playerReconnected.description", {
              playerName: event.payload.playerName,
            }),
            icon: "i-heroicons-user-plus",
            color: "green",
          });
        }
      });
    } catch (error) {
      toast.add({
        title: t("game.toasts.connectionError.title"),
        description: t("game.toasts.connectionError.description"),
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    } finally {
      isConnectionPending.value = false;
    }
  }
</script>

<template>
  <UForm
    v-if="isConnectionPending === false && gameStore.state.phase === 'INIT'"
    @submit="handleSubmit"
    :state="formState"
    class="flex flex-col max-w-sm w-full items-center gap-8"
  >
    <DescribedHeader :title="$t('game.userNameForm.header.title')">
      {{ $t("game.userNameForm.header.description") }}
    </DescribedHeader>

    <div class="flex flex-col gap-2 w-full">
      <UInput
        v-model="formState.name"
        :label="$t('game.userNameForm.nameInput.label')"
        name="name"
        :placeholder="$t('game.userNameForm.nameInput.placeholder')"
        required
        size="lg"
        class="w-full"
        minlength="2"
      />
    </div>
  </UForm>
  <div
    v-else-if="isConnectionPending === true"
    class="flex flex-col items-center gap-2 text-gray-600"
  >
    <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
    <p>{{ $t("game.userNameForm.pendingJoin") }}</p>
  </div>
  <Game
    v-else
    :game="(gameStore.state as StateShape)"
    :roomCode="(route.params.id as string)"
  />
</template>
