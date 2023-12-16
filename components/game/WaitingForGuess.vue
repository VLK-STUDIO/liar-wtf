<script setup lang="ts">
  defineProps<{
    guesserName: string;
    topicTitle: string;
  }>();
</script>

<template>
  <DescribedHeader
    :title="$t('game.waitingForGuessScreen.title', { guesserName })"
  >
    <i18n-t
      keypath="game.waitingForGuessScreen.description"
      :topic="topicTitle"
    >
      <template v-slot:topic>
        <strong>{{ topicTitle }}</strong>
      </template>
    </i18n-t>
  </DescribedHeader>
</template>
