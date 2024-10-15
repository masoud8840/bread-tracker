<script lang="ts" setup>
useHead({
  title: "مدیریت کاربران | نانوایی",
});
</script>

<template>
  <section class="admin-users-view">
    <UserCard v-for="i in 4" />
  </section>
</template>
