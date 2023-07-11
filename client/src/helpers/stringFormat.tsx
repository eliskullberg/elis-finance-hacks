export const formatTotalPrice = (num: number) => {
  return num ? Math.round(num).toLocaleString("sv-SE") : "n/a";
};

export const formatUnitPrice = (num: number) => {
  return num
    ? num.toLocaleString("sv-SE", { minimumFractionDigits: 2 })
    : "n/a";
};

export const formatPercentage = (num: number) => {
  return num
    ? new Intl.NumberFormat("default", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num - 1)
    : "n/a";
};
