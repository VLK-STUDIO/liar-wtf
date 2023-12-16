<script setup lang="ts">
  defineProps<{
    roomId: string;
    players: {
      allIds: string[];
      byId: Record<string, { name: string }>;
    };
    hostId: string;
    userId: string;
  }>();

  const gameStore = useGameStore();

  const isStartPending = ref(false);

  async function handleStartGame() {
    isStartPending.value = true;

    await gameStore.startGame();

    isStartPending.value = false;
  }
</script>

<template>
  <div class="w-full flex flex-col">
    <DescribedHeader :title="$t('game.lobby.header.title')" class="mb-6">
      <i18n-t keypath="game.lobby.header.description">
        <template v-slot:roomCode>
          <strong>{{ roomId }}</strong>
        </template>
      </i18n-t>
    </DescribedHeader>

    <div class="w-full flex flex-col gap-2 mb-3">
      <div
        v-for="playerId in players.allIds"
        :key="playerId"
        class="w-full rounded-md p-2 border text-sm"
      >
        {{ players.byId[playerId].name }}
      </div>
    </div>
    <p
      v-if="players.allIds.length < 3"
      class="text-center text-gray-600 text-sm"
    >
      {{ $t("game.lobby.statusText.waitingForMorePlayers") }}
    </p>
    <p v-else-if="hostId !== userId" class="text-center text-gray-600 text-sm">
      {{ $t("game.lobby.statusText.waitingForHostToStart") }}
    </p>
    <UButton
      v-else
      block
      size="lg"
      class="mt-6"
      @click="handleStartGame"
      :loading="isStartPending"
      loading-icon="i-tabler-loader-2"
    >
      {{ $t("game.lobby.startGameCta") }}
    </UButton>
  </div>
</template>
