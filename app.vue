<script setup lang="ts">
  const config = useAppConfig();

  const route = useRoute();
  const { t } = useI18n();

  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: "id",
    addSeoAttributes: true,
  });

  const title = computed(
    () => `${t(route.meta.title as string) ?? "TBD"} | ${config.siteName}`
  );
</script>

<template>
  <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir">
    <Head>
      <Title>{{ title }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body>
      <main
        class="h-[100dvh] overflow-y-auto overflow-x-hidden flex flex-col justify-center items-center gap-12 max-w-sm p-8 mx-auto"
      >
        <NuxtPage />
        <UNotifications />
      </main>
    </Body>
  </Html>
</template>
