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
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="flex flex-col gap-2 items-center mb-10">
      <h1 class="font-serif font-semibold text-3xl text-center">Room Lobby</h1>
      <p class="text-gray-600 text-center">
        Have your friends join by entering the room code
        <strong class="text-black">{{ roomId }}</strong>
      </p>
    </div>

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
    <UButton v-else block size="lg" class="mt-6" @click="gameStore.startGame">
      Start Game
    </UButton>
  </div>
</template>
