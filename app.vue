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
    () =>
      `${
        route.meta.title
          ? `${t(route.meta.title as string)} | ${config.siteName}`
          : config.siteName
      }`
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
      <Meta property="description" :content="$t('layout.seo.description')" />
      <Meta property="keywords" :content="$t('layout.seo.keywords')" />
    </Head>
    <Body>
      <NuxtLayout>
        <NuxtPage />
        <UNotifications />
      </NuxtLayout>
    </Body>
  </Html>
</template>
