<script lang="ts" setup>
useHead({
  title: "نانوایی | خانه",
});

const authStore = useAuthenticationStore();
authStore.checkLogin();
</script>

<template>
  <main class="home-view">
    <ul>
      <li>
        <section class="card">
          <h4>{{ formatNumber(authStore.User.balance) }}</h4>
          <span>موجودی</span>
        </section>
      </li>
      <li>
        <section class="card">
          <h4>{{ formatNumber(authStore.User.negativeToday) }}</h4>
          <span>هزینه امروز</span>
        </section>
      </li>
      <li>
        <section class="card">
          <h4>{{ formatNumber(authStore.User.negativeToday) }}</h4>
          <span>هزینه شده</span>
        </section>
      </li>
    </ul>
  </main>
</template>
