const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (date) =>
  `${new Date(date).getDate()} ${
    monthNamesShort[new Date(date).getMonth()]
  } ${new Date(date).getFullYear()}`;

export function formatCurrency(number, currency, currencyDisplay = "code") {
  if (currency === "USD") {
    return number.toLocaleString("en-IN", {
      style: "currency",
      currency,
    });
  } else if (currency === "RUB") {
    return number.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      currencyDisplay,
    });
  } else if (currency === "EUR") {
    return number.toLocaleString("de-DE", {
      style: "currency",
      currency,
    });
  }
}
