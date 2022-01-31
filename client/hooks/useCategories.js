import React from "react";
import { useSelector } from "react-redux";
import { useLastMonthCategories } from "./useLastMonthCategories";

export const useCategories = () => {
  const { categories, categoriesIncome } = useSelector(
    ({ categories }) => categories
  );

  const { statsByCategoryExpense, statsByCategoryIncome } = useSelector(
    ({ stats }) => stats
  );

  const { categoriesBalance: categoriesBalanceExpense } =
    useLastMonthCategories(
      statsByCategoryExpense?.length > 0 ? statsByCategoryExpense : categories
    );

  const { categoriesBalance: categoriesBalanceIncome } = useLastMonthCategories(
    statsByCategoryIncome?.length > 0 ? statsByCategoryIncome : categoriesIncome
  );
  return [categoriesBalanceExpense, categoriesBalanceIncome];
};
