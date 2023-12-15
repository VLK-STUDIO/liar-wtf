<script setup lang="ts">
  import type { UnwrapRef } from "vue";
  import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

  defineProps<{
    topicTitle: string;
    suspects: {
      byId: Record<string, { name: string }>;
      allIds: string[];
    };
  }>();

  const gameStore = useGameStore();

  const isChoicePending = ref(false);

  const formState = ref({
    selectedSuspectId: null as string | null,
  });

  async function handleSubmit({
    data,
  }: FormSubmitEvent<UnwrapRef<typeof formState>>) {
    isChoicePending.value = true;

    await gameStore.chooseTruthteller(data.selectedSuspectId!);

    isChoicePending.value = false;
  }
</script>

<template>
  <UForm
    :state="formState"
    @submit="handleSubmit"
    class="w-full flex flex-col items-center gap-10 text-center"
  >
    <DescribedHeader :title="`The topic is ${topicTitle}`">
      Guess who's telling the truth!
    </DescribedHeader>
    <div class="w-full flex flex-col gap-2">
      <UButton
        v-for="suspectId in suspects.allIds"
        :key="suspectId"
        @click="formState.selectedSuspectId = suspectId"
        color="gray"
        size="lg"
        type="button"
        :trailing-icon="
          formState.selectedSuspectId === suspectId ? 'i-heroicons-check' : ''
        "
        class="justify-between"
      >
        {{ suspects.byId[suspectId].name }}
      </UButton>
    </div>

    <UButton
      size="lg"
      block
      :disabled="formState.selectedSuspectId === null"
      type="submit"
      :loading="isChoicePending"
    >
      Confirm choice
    </UButton>
  </UForm>
</template>
