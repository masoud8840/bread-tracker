<script lang="ts" setup>
import type { User } from "~/types/types";
import { formatNumber } from "../utils/utils";

const props = defineProps<{
  user: User;
}>();

const userRole = computed(() =>
  props.user.role === "Admin" ? "مدیر" : "کاربر"
);
</script>

<template>
  <section class="user-card card">
    <section class="user_card-header">
      <MdiIcon icon="mdiAccount" size="72" class="user_card-icon" />
      <section class="user_card-details">
        <h4 class="user_card-username">{{ user.username }}</h4>
        <span class="user_card-role">{{ userRole }}</span>
      </section>
    </section>

    <section class="user_card-body">
      <div class="user_card-info_box">
        <MdiIcon icon="mdiEmailOutline" size="26" />
        <h4 class="user_card-email">{{ user.email }}</h4>
      </div>
      <div class="user_card-info_box">
        <MdiIcon icon="mdiPiggyBankOutline" size="26" />
        <h4 class="user_card-balance">
          {{ formatNumber(user.balance) }} تومان
        </h4>
      </div>
    </section>
  </section>
</template>
