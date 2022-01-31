import React from "react";

export const useBubbleStat = (statsByCategoryExpense) => {
  const [stats, setStats] = React.useState(null);
  const [statsLength, setStatsLength] = React.useState(0);

  const groupStats = () => {
    return statsByCategoryExpense.reduce((result, current) => {
      if (
        !Object.prototype.hasOwnProperty.call(
          result,
          `${current.month}${current.year}`
        )
      ) {
        result[`${current.month}${current.year}`] = [];
      }

      result[`${current.month}${current.year}`].push(current);

      return result;
    }, {});
  };

  React.useEffect(() => {
    const stats = groupStats();

    const sortedStats = Object.entries(stats)
      .sort((obj1, obj2) => obj1[0] - obj2[0])
      .map((item) => item[1]);

    setStats(sortedStats);
    setStatsLength(sortedStats.length - 1 || 0);
  }, [statsByCategoryExpense]);

  return { stats, statsLength };
};
