<script setup lang="ts">
import type { SiteItem } from '@/constants/home/data'

defineProps<{
  selectedSite: SiteItem | null
}>()
</script>

<template>
  <div v-if="selectedSite" class="common_box site_popup_box" :class="selectedSite.status">
    <div class="box_header">
      <h3 class="site_name">{{ selectedSite.name }}</h3>
      <p class="address">{{ selectedSite.address }}</p>
    </div>
    <ul>
      <li>
        <span class="title">시설면적</span>
        <span class="data">{{ selectedSite.facilityScale }}</span>
      </li>
      <li>
        <span class="title">카테고리</span>
        <span class="data">{{ selectedSite.category }}</span>
      </li>
      <li>
        <span class="title">월 처리량</span>
        <span class="data">{{ selectedSite.monthlyVolume }}</span>
      </li>
      <li>
        <span class="title">달성률</span>
        <span class="data">{{ selectedSite.achievementRate }}</span>
      </li>
      <li>
        <span class="title">점검일자</span>
        <span class="data">{{ selectedSite.checkedAt }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.site_popup_box {
  align-self: flex-start;
  background: var(--blue-color);
  min-width: 15rem;
  transition: all 0.4s ease;
}

.site_popup_box.warning {
  background: var(--red-color);
}

.box_header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.box_header:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 0.5rem;
}

h3 {
  font-size: 1.25rem;
  color: #ffd900;
}

p {
  color: #fff;
}

.address {
  font-size: 1rem;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

li {
  display: flex;
  gap: 1rem;
}

span {
  color: #fff;
  opacity: 0.8;
}

.title {
  display: flex;
  position: relative;
  width: 4rem;
  align-items: center;
}

.title:after {
  content: '';
  position: absolute;
  display: block;
  right: 0;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.24);
}
</style>
