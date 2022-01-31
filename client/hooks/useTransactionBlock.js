import React from "react";

export const useTransactionBlock = (items) => {
  const parsedItems = Object.keys(items).reduce((obj, key) => {
    const dataArray = Object.keys(items[key]).reduce((objYear, keyMonth) => {
      objYear.push({ month: +keyMonth, transactions: items[key][keyMonth] });

      return objYear;
    }, []);

    obj.push({
      year: key,
      data: dataArray
    });

    return obj;
  }, []);

  return [parsedItems];
};
