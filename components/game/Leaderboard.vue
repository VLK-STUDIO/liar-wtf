<script setup lang="ts">
  defineProps<{
    players: {
      id: string;
      name: string;
      score: number;
      gainedPoints?: number;
      role?: "GUESSER" | "SUSPECT" | "TRUTHTELLER";
    }[];
    playerId: string;
  }>();
</script>

<template>
  <div
    class="flex flex-col border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full text-sm"
  >
    <div
      v-for="player in players"
      :key="player.id"
      class="flex items-center justify-between border-b last:border-b-0 dark:border-gray-700 py-2 px-3"
    >
      <div class="flex items-center gap-2">
        <template
          v-if="player.role"
          class="uppercase text-xs text-gray-600 dark:text-gray-400"
        >
          <UIcon
            v-if="player.role === 'GUESSER'"
            name="i-tabler-user-question"
            class="text-yellow-500"
          />
          <UIcon
            v-else-if="player.role === 'SUSPECT'"
            name="i-tabler-mood-silence"
            class="text-red-500"
          />
          <UIcon v-else name="i-tabler-user-check" class="text-green-500" />
        </template>
        <span>
          {{ player.name }}
          <span v-if="player.id === playerId">
            ({{ $t("game.leaderboard.you") }})
          </span>
        </span>
      </div>
      <span class="text-right tabular-nums">
        <span v-if="player.gainedPoints">(+{{ player.gainedPoints }})</span>
        {{ player.score }} {{ $t("game.leaderboard.pointsSuffix") }}
      </span>
    </div>
  </div>
</template>
