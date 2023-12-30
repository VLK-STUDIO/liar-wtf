<template>
  <div class="flex flex-col gap-2 items-center text-center">
    <h1 class="font-semibold font-serif text-3xl">
      <slot name="header" />
    </h1>
    <p class="text-gray-600 dark:text-gray-400"><slot name="description" /></p>
  </div>
</template>
