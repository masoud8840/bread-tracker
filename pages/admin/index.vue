<script lang="ts" setup>
import { formatDate, formatNumber } from "../../utils/utils";
useHead({
  title: "نانوایی | مدیریت",
});

enum EBreadTypes {
  Sangak = "سنگک",
  Taftoon = "تافتون",
  Barbari = "بربری",
}
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

const handleFormSumbition = () => {
  function calculateBreadPrice(breadType: EBreadTypes) {
    if (breadType === EBreadTypes.Sangak)
      return formatNumber(breadAmount.value * 5000);
    if (breadType === EBreadTypes.Barbari)
      return formatNumber(breadAmount.value * 7000);
    if (breadType === EBreadTypes.Taftoon)
      return formatNumber(breadAmount.value * 3000);
  }

  const today = formatDate(new Date());
  const foundDate = breadsTracked.value?.find((obj) => obj.date === today);

  const text = `تعداد ${breadAmount.value} نان ${
    selectedBread.value
  } به مبلغ ${calculateBreadPrice(selectedBread.value)} تومان خریداری شد`;

  if (foundDate) {
    foundDate.history.push(text);
  } else {
    const newObj = {
      date: formatDate(new Date()),
      history: [text],
    };

    breadsTracked.value.push(newObj);
  }

  breadAmount.value = 0;
};
</script>

<template>
  <main class="home-view">
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
