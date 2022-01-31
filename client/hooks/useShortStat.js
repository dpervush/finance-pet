import React from "react";

export const useShortStat = (stats, selectedPeriod) => {
  const [statArray, setStatArray] = React.useState(null);
  const [maxs, setMaxs] = React.useState({ income: 0, expense: 0 });

  const fillStat = () => {
    const statArray = Array(7).fill({});

    const weeks = Object.values(stats);

    for (let i = statArray.length - 1; i >= 0; i--) {
      if (selectedPeriod === "year") {
        statArray[i] = { ...weeks[i] };
      } else {
        for (let key of weeks) {
          const values = Object.values(key);
          statArray[i] = {
            ...values[values.length - i - 1]
          };
        }
      }
    }
    return statArray;
  };

  React.useEffect(() => {
    const statByPeriodArray = fillStat();
    setStatArray([...statByPeriodArray]);

    if (statArray) {
      const maxIncome = Math.max(...statArray.map((item) => item.income ?? 0));
      const maxExpense = Math.max(
        ...statArray.map((item) => item.expense ?? 0)
      );

      setMaxs({ income: maxIncome, expense: maxExpense });
    }
  }, [stats]);

  return [statArray, maxs];
};
