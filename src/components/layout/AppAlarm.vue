<script setup lang="ts">
import { ref, computed, nextTick, watchEffect } from 'vue'
import { alarmList } from '@/constants/layout/alarm'

import IconBell from '../icons/common/IconBell.vue'
import IconXmark from '../icons/common/IconXmark.vue'

const isOpen = ref(false)

const alarmCount = computed(() => {
  return alarms.value.filter((alarm) => !alarm.checked).length
})

const toggleAlarm = () => {
  isOpen.value = !isOpen.value
}

const getAlarmClassName = (type: string) => {
  return `${type}_box`
}

const alarms = ref(
  alarmList.map((alarm) => ({
    ...alarm,
  })),
)

const confirmAlarm = (id: number) => {
  const targetAlarm = alarms.value.find((alarm) => alarm.id === id)

  if (!targetAlarm) return

  targetAlarm.checked = true
}

const sortedAlarms = computed(() => {
  return [...alarms.value].sort((a, b) => {
    return Number(a.checked) - Number(b.checked)
  })
})

const alarmListRef = ref<HTMLElement | null>(null)
const hasScroll = ref(false)

const checkScroll = () => {
  const el = alarmListRef.value

  if (!el) {
    hasScroll.value = false
    return
  }

  hasScroll.value = el.scrollHeight > el.clientHeight
}

watchEffect(async () => {
  if (!isOpen.value) {
    hasScroll.value = false
    return
  }

  sortedAlarms.value.length

  await nextTick()
  checkScroll()
})
</script>

<template>
  <div class="alarm_wrap">
    <button
      type="button"
      class="alarm_btn"
      :class="{ active: isOpen }"
      aria-label="알림 목록 열기"
      @click="toggleAlarm"
    >
      <i>
        <IconBell />
      </i>
      <span v-if="alarmCount > 0" class="alarm_count">{{ alarmCount }}</span>
    </button>
    <div v-if="isOpen" class="alarm_box" :class="{ has_scroll: hasScroll }">
      <div class="alarm_header">
        <h3>알림 목록</h3>
        <button type="button" class="close_btn" aria-label="알림 목록 닫기" @click="toggleAlarm">
          <i>
            <IconXmark />
          </i>
        </button>
      </div>
      <ul ref="alarmListRef">
        <template v-if="alarmList.length > 0">
          <li
            v-for="alarm in sortedAlarms"
            :key="alarm.id"
            :class="[getAlarmClassName(alarm.type), { checked: alarm.checked }]"
          >
            <div class="text_box">
              <p class="time">{{ alarm.time }}</p>
              <div class="content">
                <p>{{ alarm.message }}</p>
                <button
                  type="button"
                  class="confirm_btn"
                  @click="confirmAlarm(alarm.id)"
                  :disabled="alarm.checked"
                >
                  확인
                </button>
              </div>
            </div>
          </li>
        </template>
        <li v-else class="alarm_empty">새로운 알림이 없습니다.</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.alarm_wrap {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.alarm_btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
}

.alarm_btn:after {
  content: '';
  position: absolute;
  right: -1rem;
  width: 1px;
  height: 1rem;
  background: var(--border-color);
}

svg {
  color: var(--basic-color);
}

path {
  stroke-width: 1.5;
}

.alarm_count {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -0.125rem;
  right: -0.125rem;
  width: 1.125rem;
  height: 1.125rem;
  background: var(--red-color);
  color: #fff;
  border-radius: 100%;
  line-height: 0;
}

.alarm_box {
  position: absolute;
  display: flex;
  gap: 1rem;
  top: 100%;
  border: 1px solid var(--border-color);
  padding: 1.25rem 1.5rem;
  width: 23.75rem;
  box-sizing: border-box;
  right: 0;
  background: #fff;
  box-shadow: 0px 0px 32px -8px rgba(30, 71, 142, 0.4);
  border-radius: 1rem;
  flex-direction: column;
}

.has_scroll {
  padding: 1.25rem 0.75rem 1.25rem 1.5rem;
}

.has_scroll ul {
  padding-right: 0.75rem;
}

.alarm_header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 23.5rem;
  overflow-y: auto;
}

li {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
}

.danger_box {
  color: #f32e2e;
  background: #ffefef;
  border-color: #df8f8f;
}

.warning_box {
  color: #e36000;
  background: #ffebdd;
  border-color: #ebb892;
}

.work_box {
  color: #efa616;
  background: #fff3da;
  border-color: #f3cd7f;
}

.request_box {
  color: #00a7d1;
  background: #e1f9ff;
  border-color: #82e5ff;
}

.week_box {
  color: #117937;
  background: #e0ffec;
  border-color: #89e5ac;
}

.inquiry_box {
  color: #454545;
  background: #ebebeb;
  border-color: #ababab;
}

.checked {
  border: 1px solid #ebebeb;
  background: #fff;
  color: var(--basic-color);
}

.checked button {
  opacity: 0;
  visibility: hidden;
}

.text_box {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
}

.confirm_btn {
  flex: 0 0 auto;
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: #fff;
}

.content {
  display: flex;
  gap: 0.5rem;
  word-break: keep-all;
  line-height: 1.25rem;
  align-items: center;
  justify-content: space-between;
  color: var(--basic-color);
}
</style>
