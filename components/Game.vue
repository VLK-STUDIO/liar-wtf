<script setup lang="ts">
  import type { StateShape } from "~/stores/game";

  defineProps<{
    game: StateShape;
    roomCode: string;
  }>();
</script>

<template>
  <div v-if="game.phase === 'LOBBY'" class="w-full flex flex-col">
    <div class="flex flex-col gap-2 items-center mb-10">
      <h1 class="font-serif font-semibold text-3xl text-center">Room Lobby</h1>
      <p class="text-gray-600 text-center">
        Have your friends join by entering the room code
        <strong class="text-black">{{ roomCode }}</strong>
      </p>
    </div>

    <div class="w-full flex flex-col gap-2 mb-3">
      <div
        v-for="playerId in game.players.allIds"
        :key="playerId"
        class="w-full rounded-md p-2 border text-sm"
      >
        {{ game.players.byId[playerId].name }}
      </div>
    </div>
    <p
      v-if="game.players.allIds.length < 3"
      class="text-center text-gray-600 text-sm"
    >
      Waiting for more players...
    </p>
    <p
      v-else-if="game.hostId !== game.userId"
      class="text-center text-gray-600 text-sm"
    >
      Waiting for host to start...
    </p>
    <UButton v-else block size="lg" class="mt-6">Start Game</UButton>
  </div>
</template>
