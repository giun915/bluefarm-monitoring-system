<script setup lang="ts">
import { computed } from 'vue'
import type { SiteItem } from '@/constants/home/data'

const props = defineProps<{
  siteList: SiteItem[]
}>()

const totalCount = computed(() => props.siteList.length)

const stableCount = computed(() => {
  return props.siteList.filter((site) => site.status == 'stable').length
})

const warningCount = computed(() => {
  return props.siteList.filter((site) => site.status == 'warning').length
})
</script>

<template>
  <div class="common_box summary_box">
    <h3>운영 거점 통계</h3>
    <div class="content">
      <span class="count">{{ totalCount }}</span>
      <div class="summary">
        <p>정상 : {{ stableCount }}개</p>
        <p>주의 : {{ warningCount }}개</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary_box {
  position: absolute;
  top: 2rem;
  left: 2.5rem;
  background: var(--box-bg-color);
  gap: 0.75rem;
}

h3 {
  font-size: 1.125rem;
  color: #fff;
}

.content {
  display: flex;
  align-items: center;
  color: #1db956;
  gap: 1rem;
}

.count {
  font-size: 4rem;
  font-weight: 700;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
}
</style>
