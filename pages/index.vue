<script setup lang="ts">
  const STATIC_ROOM_CODE = getRandomString(5);

  const state = ref({
    code: "",
  });
</script>

<template>
  <header class="flex flex-col gap-4 items-center">
    <h1 class="font-serif text-4xl font-semibold">Truthless</h1>
    <p class="text-center text-gray-600">
      A game of deception, deduction
      <br />
      and lying your guts out.
    </p>
  </header>
  <div class="flex flex-col gap-4 w-full">
    <UButton :to="`/game/${STATIC_ROOM_CODE}`" block size="lg">
      Create Room
    </UButton>
    <UDivider />
    <form :action="`/game/${state.code}`">
      <UInput
        maxlength="5"
        minlength="5"
        class="w-full"
        size="lg"
        placeholder="Existing room code..."
        aria-label="Room code"
        v-model="state.code"
      />
    </form>
  </div>
</template>
