<template>
  <main
    class="min-h-[100dvh] relative overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-12 max-w-sm p-8 mx-auto"
  >
    <slot />
    <footer class="text-xs text-gray-600 absolute bottom-2">
      <i18n-t keypath="layout.footer">
        <template #author>
          <a href="https://vlkstudio.com" class="underline">VLK Studio</a>
        </template>
      </i18n-t>
    </footer>
  </main>
</template>
