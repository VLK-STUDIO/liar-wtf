<script lang="ts" setup>
  const props = defineProps<{
    topic: {
      title: string;
      summary: string;
    };
    phaseEndsAt: number;
  }>();

  const gameStore = useGameStore();

  const isTopicChangeRequestPending = ref(false);

  const { secondsLeft, max } = useSecondsLeft(props.phaseEndsAt);

  async function requestTopicChange() {
    isTopicChangeRequestPending.value = true;

    await gameStore.requestNewTopic();

    isTopicChangeRequestPending.value = false;
  }
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-3 text-center">
      <h1 class="text-3xl font-semibold font-serif">{{ topic.title }}</h1>
      <p
        class="font-serif text-gray-600 dark:text-gray-400"
        v-html="topic.summary"
      />
    </div>
    <UButton
      block
      @click="requestTopicChange"
      size="lg"
      color="gray"
      :loading="isTopicChangeRequestPending"
      loading-icon="i-tabler-loader-2"
    >
      {{ $t("game.choosingTopicScreen.changeTopicCta") }}
    </UButton>
    <UProgress :value="secondsLeft" :max="max" />
  </div>
</template>
