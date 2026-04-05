<script setup lang="ts">
import { computed } from 'vue'
import IconList from '../icons/home/IconList.vue'
import type { SiteItem } from '@/constants/home/data'
import HomeSitePopup from './HomeSitePopup.vue'

const props = defineProps<{
  siteList: SiteItem[]
  selectedSiteId: number | null
}>()

const emit = defineEmits<{
  (e: 'select-site', id: number): void
}>()

const selectedSite = computed(() => {
  return props.siteList.find((site) => site.id == props.selectedSiteId) ?? null
})

const handleClick = (id: number) => {
  emit('select-site', id)
}
</script>
<template>
  <div class="site_area">
    <HomeSitePopup :selected-site="selectedSite" />
    <div class="site_list_box common_box">
      <div class="box_header">
        <h3>운영 거점 리스트</h3>
        <IconList />
      </div>
      <ul class="box_list">
        <li class="list_title">
          <div class="name">운영 거점</div>
          <div class="category">카테고리</div>
          <div class="volume">월 처리량</div>
          <div class="rate">달성률</div>
        </li>
        <li
          v-for="site in siteList"
          :key="site.id"
          :class="['list_item', { active: site.id == selectedSiteId }, site.status]"
          @click="handleClick(site.id)"
        >
          <div class="name">{{ site.name }}</div>
          <div class="category">{{ site.category }}</div>
          <div class="volume">{{ site.monthlyVolume }}</div>
          <div class="rate">{{ site.achievementRate }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.site_area {
  position: absolute;
  top: 2rem;
  right: 2.5rem;
  bottom: 2rem;
  display: flex;
  gap: 2rem;
}

.site_list_box {
  width: 25rem;
  background: #fff;
  gap: 2rem;
}

.box_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h3 {
  font-size: 1.25rem;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

li {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  word-break: keep-all;
  gap: 1rem;
}

li:not(.list_title) {
  cursor: pointer;
}

li div:nth-child(1) {
  width: 40%;
}

li div:nth-child(2) {
  width: 25%;
}

li div:nth-child(3) {
  width: 25%;
  text-align: right;
}

li div:nth-child(4) {
  width: 10%;
  text-align: right;
}

.list_title {
  margin-bottom: 0.25rem;
}

.list_title * {
  font-size: 1rem;
  color: #858585;
  font-weight: 600;
}

li.warning {
  color: var(--red-color);
}
</style>
