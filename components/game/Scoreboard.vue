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
    playerId: string;
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
      :title="
        $t('game.scoreboard.header.guesserWon.title', {
          guesserName: props.players.byId[props.guesserId].name,
        })
      "
    >
      {{
        $t("game.scoreboard.header.guesserWon.description", {
          winnerName: props.players.byId[props.winnerId].name,
        })
      }}
    </DescribedHeader>
    <DescribedHeader
      v-else
      :title="
        $t('game.scoreboard.header.guesserLost.title', {
          winnerName: props.players.byId[props.winnerId].name,
          guesserName: props.players.byId[props.guesserId].name,
        })
      "
    >
      {{
        $t("game.scoreboard.header.guesserLost.description", {
          winnerName: props.players.byId[props.winnerId].name,
        })
      }}
    </DescribedHeader>

    <GameLeaderboard :players="sortedPlayers" :player-id="playerId" />
  </div>
</template>
