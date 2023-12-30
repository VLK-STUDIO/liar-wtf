<script setup lang="ts">
  defineProps<{
    guesserName: string;
    topicTitle: string;
  }>();
</script>

<template>
  <DescribedHeader>
    <template #header>
      <i18n-t keypath="game.waitingForGuessScreen.title">
        <template #guesserName>
          <span class="text-bold text-primary-500">
            {{ guesserName }}
          </span>
        </template>
      </i18n-t>
    </template>
    <template #description>
      <i18n-t
        keypath="game.waitingForGuessScreen.description"
        :topic="topicTitle"
        scope="global"
      >
        <template v-slot:topic>
          <strong>{{ topicTitle }}</strong>
        </template>
      </i18n-t>
    </template>
  </DescribedHeader>
</template>
