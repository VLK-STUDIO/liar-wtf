<script setup lang="ts">
  defineProps<{
    topicTitle: string;
    suspects: {
      byId: Record<string, { name: string }>;
      allIds: string[];
    };
  }>();

  const formState = ref({
    selectedSuspectId: null as string | null,
  });

  function handleSubmit() {}
</script>

<template>
  <UForm
    :state="formState"
    @submit="handleSubmit"
    class="w-full flex flex-col items-center gap-10 text-center"
  >
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-2xl font-semibold font-serif">
        The topic is
        <br />
        {{ topicTitle }}
      </h1>

      <p class="text-gray-600">Guess who's telling the truth!</p>
    </div>

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
    >
      Confirm choice
    </UButton>
  </UForm>
</template>
