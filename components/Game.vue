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
    :phaseEndsAt="game.phaseEndsAt"
  />
  <GameWaitingForGuess
    v-else-if="game.phase === 'WAITING_FOR_GUESS'"
    :guesserName="game.guesserName"
    :topicTitle="game.chosenTopicTitle"
  />
  <GameGuessingTruthteller
    v-else-if="game.phase === 'GUESSING_TRUTHTELLER'"
    :topicTitle="game.chosenTopicTitle"
    :suspects="game.suspects"
  />
  <GameScoreboard
    v-else-if="game.phase === 'SHOWING_SCOREBOARD'"
    :players="game.players"
    :winnerId="game.winnerId"
    :truthtellerId="game.truthTellerId"
    :hasGuesserWon="game.hasGuesserWon"
    :guesserId="game.guesserId"
  />
</template>
