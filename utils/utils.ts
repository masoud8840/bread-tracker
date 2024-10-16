export const formatDate = (date: Date) =>
  date.toLocaleDateString("fa-IR", {
    day: "numeric",
    weekday: "long",
    month: "long",
  });
export const formatNumber = (num: number) => Number(num).toLocaleString("en-US");
