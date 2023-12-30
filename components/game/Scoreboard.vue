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
        role:
          id === props.truthtellerId
            ? "TRUTHTELLER"
            : id === props.guesserId
            ? "GUESSER"
            : "SUSPECT",
      }))
  );
</script>

<template>
  <div class="flex flex-col gap-6">
    <DescribedHeader v-if="hasGuesserWon">
      <template #header>
        <i18n-t keypath="game.scoreboard.header.guesserWon.title">
          <template #guesserName>
            <span class="text-primary-500 font-bold">
              {{ props.players.byId[props.guesserId].name }}
            </span>
          </template>
        </i18n-t>
      </template>
      <template #description>
        {{
          $t("game.scoreboard.header.guesserWon.description", {
            winnerName: props.players.byId[props.winnerId].name,
          })
        }}
      </template>
    </DescribedHeader>
    <DescribedHeader v-else>
      <template #header>
        <i18n-t keypath="game.scoreboard.header.guesserLost.title">
          <template #winnerName>
            <span class="text-red-500 font-bold">
              {{ props.players.byId[props.winnerId].name }}
            </span>
          </template>
          <template #guesserName>
            <span class="text-primary-500 font-bold">
              {{ props.players.byId[props.guesserId].name }}
            </span>
          </template>
        </i18n-t>
      </template>
      <template #description>
        {{
          $t("game.scoreboard.header.guesserLost.description", {
            winnerName: props.players.byId[props.winnerId].name,
          })
        }}
      </template>
    </DescribedHeader>

    <GameLeaderboard :players="sortedPlayers" :player-id="playerId" />
  </div>
</template>
