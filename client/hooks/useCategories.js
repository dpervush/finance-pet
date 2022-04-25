import React from "react";
import { useSelector } from "react-redux";
import { useLastMonthCategories } from "./useLastMonthCategories";

export const useCategories = () => {
  // const {
  //   categories: categoriesBalanceExpense,
  //   categoriesIncome: categoriesBalanceIncome
  // } = useSelector(({ categories }) => categories);

  const { statsByCategoryExpense, statsByCategoryIncome } = useSelector(
    ({ stats }) => stats
  );

  const { categoriesBalance: categoriesBalanceExpense } =
    useLastMonthCategories(statsByCategoryExpense);

  const { categoriesBalance: categoriesBalanceIncome } = useLastMonthCategories(
    statsByCategoryIncome
  );

  return [categoriesBalanceExpense, categoriesBalanceIncome];
};
