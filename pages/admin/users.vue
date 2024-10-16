<script lang="ts" setup>
useHead({
  title: "نانوایی | کاربران",
});

const adminStore = useAdminStore();

const users = await adminStore.getUsers();
</script>

<template>
  <section class="admin-users-view">
    <Suspense>
      <template #default>
        <UserCard v-for="(user, index) in users" :key="index" :user="user" />
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
  </section>
</template>
