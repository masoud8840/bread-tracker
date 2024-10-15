<template>
  <header class="card">
    <nav class="container">
      <button @click="toggleAuthModal(true)">ورود به حساب کاربری</button>
      <section class="user-menu" v-if="false">
        <MdiIcon icon="mdiAccountTie" size="52" />
        <section class="user-menu-detail">
          <h3>مسعود قره داغی</h3>
          <span>300,000 تومان</span>
        </section>
      </section>
    </nav>
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
              <button type="submit">ثبت نام</button>
            </form>
          </section>
          <section class="hr-container">
            <hr />
            <span> یا </span>
          </section>
          <section class="login-form">
            <form>
              <input type="email" placeholder="پست الکترونیکی" />
              <input type="password" placeholder="رمز عبور" />
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
        <NuxtLink to="/admin" class="link link-primary">داشبورد</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin/users" class="link link-primary">کاربران</NuxtLink>
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

interface ISignup {
  username: string;
  email: string;
  password: string;
}
const signupCredentials = ref<ISignup>({
  username: "",
  email: "",
  password: "",
});
const handleSignup = async () => {
  const signupRes = await $fetch("http://localhost:3000/api/v1/auth/signup", {
    method: "POST",
    body: signupCredentials,
  });
};

const adminSubmenuOpen = ref(false);
const toggleOpenSubmenu = () => {
  adminSubmenuOpen.value = !adminSubmenuOpen.value;
};
</script>
