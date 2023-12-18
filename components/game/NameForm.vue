<script setup lang="ts">
  import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
  import type { UnwrapRef } from "vue";

  const emit = defineEmits<{
    (e: "submit", username: string): void;
  }>();

  const formState = ref({
    name: "",
  });

  async function handleSubmit({
    data,
  }: FormSubmitEvent<UnwrapRef<typeof formState>>) {
    emit("submit", data.name);
  }
</script>

<template>
  <UForm
    @submit="handleSubmit"
    :state="formState"
    class="flex flex-col max-w-sm w-full items-center gap-8"
  >
    <DescribedHeader :title="$t('game.userNameForm.header.title')">
      {{ $t("game.userNameForm.header.description") }}
    </DescribedHeader>

    <div class="flex flex-col gap-2 w-full">
      <UInput
        v-model="formState.name"
        :label="$t('game.userNameForm.nameInput.label')"
        name="name"
        :placeholder="$t('game.userNameForm.nameInput.placeholder')"
        required
        size="lg"
        class="w-full peer"
        minlength="2"
      />
      <UButton type="submit" class="peer-invalid:disabled" size="lg" block>
        {{ $t("game.userNameForm.submitCta") }}
      </UButton>
    </div>
  </UForm>
</template>
