<script setup lang="ts">
  import type { StateShape } from "~/stores/game";

  definePageMeta({
    title: "game.seoTitle",
  });

  const { locale, t } = useI18n({
    useScope: "global",
  });

  const route = useRoute();

  const roomId = route.params.id as string;

  const gameStore = useGameStore();

  const toast = useToast();

  if (!route.params.id || typeof route.params.id !== "string") {
    navigateTo("/");
  }

  const isConnectionPending = ref(true);

  onMounted(() => {
    const username = localStorage.getItem(`username-${roomId}`);

    if (username) {
      return connectToGame(username);
    }

    isConnectionPending.value = false;
  });

  async function connectToGame(username: string) {
    isConnectionPending.value = true;

    localStorage.setItem(`username-${roomId}`, username);

    try {
      await gameStore.connect(route.params.id as string, username, {
        locale: locale.value,
      });

      gameStore.registerToPlayerConnectionEvents((event) => {
        if (event.type === "PLAYER_DISCONNECTED") {
          toast.add({
            title: t("game.toasts.playerDisconnected.title"),
            description: t("game.toasts.playerDisconnected.description", {
              playerName: event.payload.playerName,
            }),
            icon: "i-tabler-user-minus",
            color: "red",
          });
        } else if (event.type === "PLAYER_RECONNECTED") {
          toast.add({
            title: t("game.toasts.playerReconnected.title"),
            description: t("game.toasts.playerReconnected.description", {
              playerName: event.payload.playerName,
            }),
            icon: "i-tabler-user-plus",
            color: "green",
          });
        }
      });
    } catch (error) {
      toast.add({
        title: t("game.toasts.connectionError.title"),
        description: t("game.toasts.connectionError.description"),
        icon: "i-tabler-x-circle",
        color: "red",
      });
    } finally {
      isConnectionPending.value = false;
    }
  }
</script>

<template>
  <div
    class="flex flex-col gap-2 items-center self-center"
    v-if="isConnectionPending"
  >
    <UIcon name="i-tabler-loader-2" color="gray" class="animate-spin" />
    <span>{{ $t("game.pendingJoin") }}</span>
  </div>
  <Game
    v-else-if="gameStore.state.phase !== 'INIT'"
    :game="(gameStore.state as StateShape)"
    :roomCode="(route.params.id as string)"
  />
  <GameNameForm
    v-else
    :roomId="(route.params.id as string)"
    @submit="connectToGame"
  />
</template>
