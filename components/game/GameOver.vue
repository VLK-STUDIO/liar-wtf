<script setup lang="ts">
  import { useReward } from "vue-rewards";

  const props = defineProps<{
    players: {
      byId: Record<string, { name: string; score: number }>;
      allIds: string[];
    };
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

  onMounted(() => {
    if (sortedPlayers.value[0].id === props.playerId) {
      const { reward } = useReward("game-over-screen", "confetti", {
        startVelocity: 10,
        spread: 360,
        elementCount: 100,
        angle: 270,
      });

      reward();
    }
  });
</script>

<template>
  <div class="relative flex flex-col gap-6 w-full">
    <div
      class="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-1"
      id="game-over-screen"
    />
    <DescribedHeader>
      <template #header>
        {{ $t("game.gameOverScreen.header.title") }}
      </template>
      <template #description>
        {{
          $t("game.gameOverScreen.header.description", {
            winner: sortedPlayers[0].name,
          })
        }}
      </template>
    </DescribedHeader>

    <GameLeaderboard :players="sortedPlayers" :player-id="playerId" />
  </div>
</template>
