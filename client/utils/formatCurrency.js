export function formatCurrency(number, currency) {
  if (currency === "USD") {
    return number.toLocaleString("en-IN", {
      style: "currency",
      currency: "USD",
    });
  } else if (currency === "RUB") {
    return number.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "code",
    });
  }
}
