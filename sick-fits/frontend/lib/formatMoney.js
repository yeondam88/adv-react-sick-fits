export default function formatMoney(amount = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat("es-US", options);

  return formatter.format(amount / 100);
}
