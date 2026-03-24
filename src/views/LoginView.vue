<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const errorMessage = ref('')
const loginId = ref('')
const loginPassword = ref('')
const rememberId = ref(false)

const MOCK_ID = 'admin'
const MOCK_PASSWORD = '1234'

const router = useRouter()

const submitLogin = () => {
  errorMessage.value = ''

  if (!loginId.value.trim()) {
    errorMessage.value = '아이디를 입력해주세요.'
    return
  }

  if (!loginPassword.value.trim()) {
    errorMessage.value = '비밀번호를 입력해주세요.'
    return
  }

  if (loginId.value == MOCK_ID && loginPassword.value == MOCK_PASSWORD) {
    sessionStorage.setItem('isLoggedIn', 'true')
    sessionStorage.setItem('loginId', loginId.value)

    if (rememberId.value) {
      localStorage.setItem('savedLoginId', loginId.value)
    } else {
      localStorage.removeItem('savedLoginId')
    }

    router.push('/home')
    return
  }

  errorMessage.value = '아이디 또는 비밀번호를 확인해주세요.'
}

onMounted(() => {
  const savedLoginId = localStorage.getItem('savedLoginId')

  if (savedLoginId) {
    loginId.value = savedLoginId
    rememberId.value = true
  }
})
</script>

<template>
  <div class="login_page">
    <div class="login_box">
      <div class="box_inner">
        <h2 class="box_title">
          CoreOps
          <br />
          Monitoring System
        </h2>
        <form class="login_form" @submit.prevent="submitLogin">
          <input v-model="loginId" type="text" autocomplete="username" placeholder="admin" />
          <input
            v-model="loginPassword"
            type="password"
            autocomplete="current-password"
            placeholder="1234"
          />
          <label>
            <input v-model="rememberId" type="checkbox" />
            <span>아이디 기억</span>
          </label>
          <button type="submit">로그인</button>
        </form>
        <p v-if="errorMessage">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login_page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background: url('@/assets/imgs/login/login_bg.jpg') center / cover no-repeat;
}

.login_box {
  width: 26rem;
  aspect-ratio: 21 / 25;
  padding: 0.375rem;
  border-radius: 2rem;
  border: 0.5rem solid #fff;
}

.box_inner {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  border-radius: 1.25rem;
  border: 0.125rem solid transparent;
  background: #fff;
  text-align: center;
  padding: 0 2rem;
}

h2 {
  font-size: 2.125rem;
  line-height: 3rem;
  font-weight: 700;
  color: var(--main-dark-color);
}

.login_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  align-items: flex-start;
}

input[type='text'],
input[type='password'] {
  padding: 0 1rem;
  border: 1px solid var(--border-color);
}

input[type='text'],
input[type='password'],
button {
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
}

label {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  gap: 0.5rem;
  cursor: pointer;
}

input[type='checkbox'] {
  display: flex;
  justify-content: center;
  width: 1.25rem;
  aspect-ratio: 1 / 1;
  margin: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type='checkbox']:checked {
  position: relative;
  border: none;
  background: var(--main-color);
}

input[type='checkbox']:checked::after {
  content: '';
  position: absolute;
  top: 0.125rem;
  transform: rotate(45deg);
  width: 0.375rem;
  height: 0.625rem;
  border: solid white;
  border-width: 0 0.13rem 0.13rem 0;
}

button {
  background: var(--main-color);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
}

p {
  position: absolute;
  bottom: 2rem;
  color: var(--red-color);
}
</style>
