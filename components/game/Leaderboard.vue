<script setup lang="ts">
  defineProps<{
    players: {
      id: string;
      name: string;
      score: number;
      gainedPoints?: number;
    }[];
    playerId: string;
  }>();
</script>

<template>
  <div class="flex flex-col border rounded-md bg-gray-50 w-full text-sm">
    <div
      v-for="player in players"
      :key="player.id"
      class="flex items-center justify-between border-b last:border-b-0 py-2 px-3"
    >
      <span>
        {{ player.name }}
        <span v-if="player.id === playerId">
          ({{ $t("game.leaderboard.you") }})
        </span>
      </span>
      <span class="text-right tabular-nums">
        {{ player.score }} {{ $t("game.leaderboard.pointsSuffix") }}
        <span v-if="player.gainedPoints">(+{{ player.gainedPoints }})</span>
      </span>
    </div>
  </div>
</template>
