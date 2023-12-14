<script setup lang="ts">
  import type { StateShape } from "~/stores/game";

  defineProps<{
    game: StateShape;
    roomCode: string;
  }>();
</script>

<template>
  <GameLobby v-if="game.phase === 'LOBBY'" v-bind="game" />
  <GameWaitingForSuspects
    v-else-if="game.phase === 'CHOOSING_TOPIC' && game.topic === null"
  />
  <GameChoosingTopic
    v-else-if="game.phase === 'CHOOSING_TOPIC' && game.topic !== null"
    :topic="game.topic"
  />
</template>
