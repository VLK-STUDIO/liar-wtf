<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
  import type { UnwrapRef } from "vue";
  import type { StateShape } from "~/stores/game";

  const route = useRoute();

  useSeoMeta({
    title: `Room ${route.params.id}`,
  });

  const gameStore = useGameStore();

  const toast = useToast();

  if (!route.params.id || typeof route.params.id !== "string") {
    navigateTo("/");
  }

  const formState = ref({
    name: "",
  });

  const isConnectionPending = ref(false);

  async function handleSubmit({
    data,
  }: FormSubmitEvent<UnwrapRef<typeof formState>>) {
    isConnectionPending.value = true;

    try {
      await gameStore.connect(route.params.id as string, data.name);

      gameStore.registerToPlayerConnectionEvents((event) => {
        if (event.type === "PLAYER_DISCONNECTED") {
          toast.add({
            title: "Player disconnected",
            description: `${event.payload.playerName} has lost connection.`,
            icon: "i-heroicons-user-remove",
            color: "red",
          });
        } else if (event.type === "PLAYER_RECONNECTED") {
          toast.add({
            title: "Player reconnected",
            description: `${event.payload.playerName} has reconnected.`,
            icon: "i-heroicons-user-add",
            color: "green",
          });
        }
      });
    } catch (error) {
      toast.add({
        title: "Couldn't connect to server",
        description: "Please try again later.",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    } finally {
      isConnectionPending.value = false;
    }
  }
</script>

<template>
  <UForm
    v-if="isConnectionPending === false && gameStore.state.phase === 'INIT'"
    @submit="handleSubmit"
    :state="formState"
    class="flex flex-col max-w-sm w-full items-center gap-8"
  >
    <header class="flex flex-col items-center gap-1">
      <h1 class="font-serif text-4xl font-semibold">Join Room</h1>
      <p class="text-gray-600">Enter a name to start playing.</p>
    </header>
    <div class="flex flex-col gap-2 w-full">
      <UInput
        v-model="formState.name"
        label="Name"
        name="name"
        placeholder="Enter your name..."
        required
        size="lg"
        class="w-full"
        minlength="2"
      />
    </div>
  </UForm>
  <div
    v-else-if="isConnectionPending === true"
    class="flex flex-col items-center gap-2 text-gray-600"
  >
    <UIcon name="i-heroicons-arrow-path" class="animate-spin text-2xl" />
    <p>Joining room...</p>
  </div>
  <Game
    v-else
    :game="(gameStore.state as StateShape)"
    :roomCode="(route.params.id as string)"
  />
</template>
