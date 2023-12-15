<script setup lang="ts">
  const props = defineProps<{
    players: {
      byId: Record<string, { name: string; score: number }>;
      allIds: string[];
    };
    winnerId: string;
    truthtellerId: string;
    hasGuesserWon: boolean;
    guesserId: string;
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
    <DescribedHeader
      v-if="hasGuesserWon"
      :title="`${
        props.players.byId[props.guesserId].name
      } has guessed correctly!`"
    >
      {{ players.byId[props.truthtellerId].name }} has been awarded a point for
      convincing them.
    </DescribedHeader>
    <DescribedHeader
      v-else
      :title="`${props.players.byId[props.winnerId].name} lied and won!`"
    >
      They have been awarded 2 points for lying and winning.
    </DescribedHeader>

    <GameLeaderboard :players="sortedPlayers" />
  </div>
</template>
