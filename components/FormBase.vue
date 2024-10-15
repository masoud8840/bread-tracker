<script lang="ts" setup>
interface IProps {
  inputs: {
    type: string;
    name: string;
    placeholder: string;
    modelValue: string;
  }[];
}
defineProps<IProps>();

interface IEmits {
  (e: "update:modelValue", value: string): void;
}
const emits = defineEmits<IEmits>();
const handleValue = (e: InputEvent) => {
  emits("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <form>
    <input
      v-for="(input, index) in inputs"
      :key="index"
      :type="input.type"
      :name="input.name"
      :placeholder="input.placeholder"
      :value="input.modelValue"
      @input="handleValue"
    />
  </form>
</template>
