<script lang="ts" setup>
import { EBreadTypes } from "../../types/types";
import { formatDate, formatNumber } from "../../utils/utils";
useHead({
  title: "نانوایی | مدیریت",
});

const selectedBread = ref<EBreadTypes>(EBreadTypes.Sangak);
const breadAmount = ref(0);

const handleBreadAmount = (event: WheelEvent) => {
  const direction = event.deltaY > 0 ? "down" : "up";
  direction === "up" ? (breadAmount.value += 1) : (breadAmount.value -= 1);
};

interface TBreadsTracked {
  date: string;
  history: string[];
}
const breadsTracked = ref<TBreadsTracked[]>([]);

const adminStore = useAdminStore();
const retrieveBreads = async () => {
  breadsTracked.value = [];

  const breads = await adminStore.getBreads();
  breads?.map((bread) => {
    const foundDate = breadsTracked.value.find(
      (breadObj) => breadObj.date === bread.date
    );
    const { date, qty, type } = bread;
    const text = `تعداد ${qty} نان ${type} به مبلغ ${formatNumber(
      calculateBreadPrice(type, qty)!
    )} خریداری شد`;

    if (foundDate) {
      foundDate.history.push(text);
    } else {
      const newObj = {
        date: date,
        history: [text],
      };

      breadsTracked.value.push(newObj);
    }
  });
};
function calculateBreadPrice(breadType: EBreadTypes, qty?: number) {
  if (breadType === EBreadTypes.Sangak)
    return (qty || breadAmount.value) * 5000;
  if (breadType === EBreadTypes.Barbari)
    return (qty || breadAmount.value) * 5000;
  if (breadType === EBreadTypes.Taftoon)
    return (qty || breadAmount.value) * 1200;
}
const handleFormSumbition = async () => {
  await adminStore.postBread({
    date: formatDate(new Date()),
    qty: breadAmount.value,
    type: selectedBread.value,
    total: Number(calculateBreadPrice(selectedBread.value, breadAmount.value)),
  });
  breadAmount.value = 0;
  await retrieveBreads();
};
await retrieveBreads();
</script>

<template>
  <main class="admin-view">
    <section class="container card">
      <form class="bread-form" @submit.prevent="handleFormSumbition">
        <input
          type="number"
          placeholder="تعداد نان بربری"
          @wheel="handleBreadAmount"
          v-model="breadAmount"
          min="1"
          step="0.5"
        />
        <select v-model="selectedBread">
          <option
            v-for="(bread, index) in EBreadTypes"
            :key="index"
            :value="bread"
          >
            {{ bread }}
          </option>
        </select>
        <button type="submit">
          <MdiIcon icon="mdiPlus" size="22px" /> افزودن به لیست
        </button>
      </form>
    </section>

    <section class="container list-container" v-if="breadsTracked?.length">
      <ul
        class="list card"
        v-for="(object, index) in breadsTracked"
        :key="index"
      >
        <h3>{{ object.date }}</h3>
        <li
          class="list-item"
          v-for="(item, index) in object.history"
          :key="index"
        >
          <p>{{ item }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>
