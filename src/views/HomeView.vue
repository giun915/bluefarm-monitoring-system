<script setup lang="ts">
import { ref } from 'vue'
import HomeMapSection from '@/components/home/HomeMapSection.vue'
import HomeSiteList from '@/components/home/HomeSiteList.vue'
import { siteList } from '@/constants/home/data'
import type { SiteItem } from '@/constants/home/data'
import HomeSummaryCard from '@/components/home/HomeSummaryCard.vue'

const selectedSiteId = ref<SiteItem['id'] | null>(siteList[0]?.id ?? null)

const handleSelectSite = (siteId: SiteItem['id']) => {
  selectedSiteId.value = siteId
}
</script>

<template>
  <main>
    <HomeMapSection
      :site-list="siteList"
      :selected-site-id="selectedSiteId"
      @select-site="handleSelectSite"
    />

    <HomeSummaryCard :site-list="siteList" />

    <HomeSiteList
      :site-list="siteList"
      :selected-site-id="selectedSiteId"
      @select-site="handleSelectSite"
    />
  </main>
</template>

<style scoped>
:deep(.common_box) {
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 1.25rem -0.25rem rgba(0, 0, 0, 0.3);
}
</style>
