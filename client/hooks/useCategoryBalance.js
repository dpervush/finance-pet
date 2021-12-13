import React from "react";

export function useCategoryBalance(statsByCategory) {
  const [categoriesBalance, setCategoriesBalance] = React.useState([]);

  React.useEffect(() => {
    const todayMonth = new Date().getMonth() + 1;
    const todayYear = new Date().getFullYear();

    setCategoriesBalance(
      statsByCategory.filter(
        (item) => +item.year === todayYear && +item.month === todayMonth
      )
    );
  }, [statsByCategory]);

  return { categoriesBalance };
}
