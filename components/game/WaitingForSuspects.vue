<script setup lang="ts">
  const props = defineProps<{
    phaseEndsAt: number;
  }>();

  const { secondsLeft, max } = useSecondsLeft(props.phaseEndsAt);
</script>

<template>
  <div class="flex flex-col gap-6">
    <DescribedHeader>
      <template #header>
        {{ $t("game.waitingForSuspectsScreen.title") }}
      </template>
      <template #description>
        {{ $t("game.waitingForSuspectsScreen.description") }}
      </template>
    </DescribedHeader>
    <UProgress :value="secondsLeft" :max="max" />
  </div>
</template>
