<script setup lang="ts">
import { computed } from 'vue'
import { headerMenus } from '@/constants/layout/header'
import { useRouter } from 'vue-router'
import IconHome from '../icons/common/IconHome.vue'
import IconUser from '../icons/common/IconUser.vue'
import AppAlarm from './AppAlarm.vue'

const router = useRouter()

const currentLoginId = computed(() => {
  return sessionStorage.getItem('loginId') ?? ''
})

const submitLogout = () => {
  sessionStorage.removeItem('isLoggedIn')
  sessionStorage.removeItem('loginId')

  router.push('/')
}
</script>

<template>
  <header id="appHeader">
    <div class="page_inner">
      <RouterLink to="/" class="logo">
        <i>
          <IconHome />
        </i>
        <h4>BlueFarm</h4>
      </RouterLink>
      <nav aria-label="주요 메뉴">
        <ul>
          <li v-for="menu in headerMenus" :key="menu.id">
            <a :href="menu.href">{{ menu.label }}</a>
          </li>
        </ul>
      </nav>
      <div class="header_action_wrap">
        <AppAlarm />
        <div class="user_info">
          <i>
            <IconUser />
          </i>
          <span>{{ currentLoginId }}</span>
        </div>
        <button class="logout_btn" type="button" @click="submitLogout">로그아웃</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
#appHeader {
  height: 4rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.page_inner {
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: var(--main-color);
  border-radius: 0.5rem;
  color: #fff;
}

h4 {
  font-size: 1.375rem;
  font-weight: 800;
}

nav {
  display: flex;
  align-items: center;
  height: 100%;
}

ul {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0.5rem;
}

li {
  height: 100%;
}

li a {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 2.75rem;
  font-size: 1rem;
  font-weight: 600;
}

:deep(button) {
  transition: all 0.4s ease;
  border-radius: 0.5rem;
}

:deep(button:hover) {
  background: var(--box-bg-color);
}

.header_action_wrap {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
}

.user_info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user_info svg {
  color: #b2cdfe;
}

.user_info span {
  font-size: 1rem;
  color: #595959;
}

.logout_btn {
  border: 1px solid var(--border-color);
  padding: 0.5rem;
}
</style>
