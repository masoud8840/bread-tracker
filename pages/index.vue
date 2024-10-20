<script lang="ts" setup>
useHead({
  title: "نانوایی | خانه",
});

const authStore = useAuthenticationStore();
authStore.checkLogin();
</script>

<template>
  <pre>{{ authStore.User }}</pre>
</template>
