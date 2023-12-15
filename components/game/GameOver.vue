<script setup lang="ts">
  const props = defineProps<{
    players: {
      byId: Record<string, { name: string; score: number }>;
      allIds: string[];
    };
  }>();

  const sortedPlayers = computed(() =>
    props.players.allIds
      .sort((a, b) => props.players.byId[b].score - props.players.byId[a].score)
      .map((id) => ({
        id,
        ...props.players.byId[id],
      }))
  );
</script>

<template>
  <div class="flex flex-col gap-6">
    <DescribedHeader title="Game Over!">
      {{ sortedPlayers[0].name }} has won the game!
    </DescribedHeader>

    <GameLeaderboard :players="sortedPlayers" />
  </div>
</template>
