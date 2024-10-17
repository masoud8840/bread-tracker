<template>
  <header class="card">
    <ClientOnly>
      <nav class="container">
        <button @click="toggleAuthModal(true)" v-if="!authStore.authorized">
          ورود به حساب کاربری
        </button>
        <section class="user-menu" v-else>
          <MdiIcon icon="mdiAccountTie" size="52" />
          <section class="user-menu-detail">
            <h3>{{ authStore.getUser.username }}</h3>
            <span>{{ formatNum(authStore.getUser.balance) }} تومان</span>
          </section>
        </section>
      </nav>
    </ClientOnly>
  </header>

  <Teleport to="#teleports">
    <Transition name="modal">
      <dialog open="true" v-if="isAuthModalOpen" @mouseup="clickOutside">
        <section class="forms-container container">
          <section class="signup-form">
            <form @submit.prevent="handleSignup">
              <input
                type="text"
                placeholder="نام کاربری"
                v-model="signupCredentials.username"
              />
              <input
                type="email"
                placeholder="پست الکترونیکی"
                name="email"
                v-model="signupCredentials.email"
              />
              <input
                type="password"
                placeholder="رمز عبور"
                name="password"
                v-model="signupCredentials.password"
              />
              <p :class="`text-${signupError.status}`">
                {{ signupError.text }}
              </p>
              <button type="submit">ثبت نام</button>
            </form>
          </section>
          <section class="hr-container">
            <hr />
            <span> یا </span>
          </section>
          <section class="login-form">
            <form @submit.prevent="handleLogin">
              <input
                type="email"
                placeholder="پست الکترونیکی"
                v-model="loginCredentials.email"
              />
              <input
                type="password"
                placeholder="رمز عبور"
                v-model="loginCredentials.password"
              />
              <p class="text-fail" v-if="loginError">
                {{ loginError }}
              </p>
              <button type="submit">ورود</button>
            </form>
          </section>
        </section>
      </dialog>
    </Transition>
  </Teleport>
  <section class="view container">
    <ul class="right-menu card">
      <li>
        <NuxtLink to="/" class="link link-primary">داشبورد</NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/admin"
          class="link link-primary"
          v-if="authStore.User.role === 'Admin'"
          >مدیریت</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          to="/admin/users"
          class="link link-primary"
          v-if="authStore.User.role === 'Admin'"
          >کاربران</NuxtLink
        >
      </li>
    </ul>
    <slot />
  </section>
</template>

<script setup lang="ts">
const isAuthModalOpen = ref(false);
const toggleAuthModal = (value: boolean) => {
  isAuthModalOpen.value = value;
};

const clickOutside = (event: MouseEvent) => {
  if ((event.target as HTMLDialogElement).tagName === "DIALOG") {
    toggleAuthModal(false);
  }
};

const loginCredentials = ref({
  email: "gharedaghi.zip@gmail.com",
  password: "Masood1379",
});
const loginError = ref("");
const authStore = useAuthenticationStore();
const handleLogin = async () => {
  const { email, password } = loginCredentials.value;
  const { message, statusCode } = await authStore.login(email, password);

  loginError.value = "";
  if (statusCode !== 200) loginError.value = message;
  else isAuthModalOpen.value = false;
};

const signupCredentials = ref({
  username: "مسعود قره داغی",
  email: "gharedaghi.zip@gmail.com",
  password: "Masood1379",
});
const signupError = ref({
  text: "",
  status: "",
});
const handleSignup = async () => {
  const { email, username, password } = signupCredentials.value;
  const { status, message } = await authStore.signup(username, email, password);
  signupError.value.text = message;
  signupError.value.status = status;
};

const formatNum = (num: number) => num.toLocaleString("en-US");
authStore.checkLogin();
</script>
