<script lang="ts" setup>
  const props = defineProps<{
    topic: {
      title: string;
      summary: string;
    };
    phaseEndsAt: number;
  }>();

  const gameStore = useGameStore();

  const timeLeft = ref(props.phaseEndsAt - Date.now());

  const isTopicChangeRequestPending = ref(false);

  const max = Math.floor((props.phaseEndsAt - Date.now()) / 1000);

  onMounted(() => {
    const interval = setInterval(() => {
      timeLeft.value = props.phaseEndsAt - Date.now();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const secondsLeft = computed(() => {
    const result = Math.floor(timeLeft.value / 1000);

    return result < 0 ? 0 : result;
  });

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
      <p class="font-serif text-gray-600" v-html="topic.summary" />
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
