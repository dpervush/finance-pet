import React from "react";

export const useFilteredTransactions = (transactions) => {
  const filteredTransactions = transactions?.reduce((obj, current, index) => {
    const year = new Date(current.date).getFullYear();
    const month = new Date(current.date).getMonth();

    if (!Object.prototype.hasOwnProperty.call(obj, year)) {
      obj[year] = {};
    }
    if (!Object.prototype.hasOwnProperty.call(obj[year], month)) {
      obj[year][month] = [];
    }

    if (index === transactions.length - 1) {
      obj[year][month].push({ ...current, last: true });
    } else {
      obj[year][month].push(current);
    }

    return obj;
  }, {});

  return [filteredTransactions];
};
