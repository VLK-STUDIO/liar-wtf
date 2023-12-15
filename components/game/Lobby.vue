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
    <DescribedHeader title="Room Lobby" class="mb-6">
      Have your friends join by entering the room code
      <strong class="font-semibold">{{ roomId }}</strong>
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
      Waiting for more players...
    </p>
    <p v-else-if="hostId !== userId" class="text-center text-gray-600 text-sm">
      Waiting for host to start...
    </p>
    <UButton
      v-else
      block
      size="lg"
      class="mt-6"
      @click="handleStartGame"
      :loading="isStartPending"
    >
      Start Game
    </UButton>
  </div>
</template>
