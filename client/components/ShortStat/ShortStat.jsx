import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatsByPeriod } from "../../store/slices/stats";
import Dropdown from "../UI/Dropdown/Dropdown";
import PostItem from "./PostItem/PostItem";

import styles from "./ShortStat.module.scss";

const state = {
  periods: [
    {
      id: 0,
      title: "Week",
      selected: true,
      key: "periods",
    },
    {
      id: 1,
      title: "Month",
      selected: false,
      key: "periods",
    },
    {
      id: 2,
      title: "Year",
      selected: false,
      key: "periods",
    },
  ],
};

const ShortStat = () => {
  const dispatch = useDispatch();

  const statsByPeriod = useSelector(({ stats }) => stats.statsByPeriod);

  const [selectedPeriod, setSelectedPeriod] = React.useState("week");

  const [dropdownState, setDropdownState] = React.useState(state);

  const resetThenSet = (id, items) => {
    const temp = [...items];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setSelectedPeriod(temp[id].title.toLowerCase());

    setDropdownState({ ...dropdownState, [items[0].key]: temp });
  };

  React.useEffect(() => {
    dispatch(getStatsByPeriod({ period: selectedPeriod }));
  }, []);

  React.useEffect(() => {
    dispatch(getStatsByPeriod({ period: selectedPeriod }));
  }, [dropdownState]);

  const [statArray, setStatArray] = React.useState(null);

  const fillStat = () => {
    const statArray = Array(7).fill({});

    for (let i = 0; i < statArray.length; i++) {
      const weeks = Object.values(statsByPeriod);

      if (selectedPeriod === "year") {
        statArray[i] = { ...weeks[i] };
      } else {
        for (let key in weeks) {
          statArray[i] = { ...Object.values(weeks[key])[i] };
        }
      }
    }
    return statArray;
  };

  const [maxs, setMaxs] = React.useState({ income: 0, expense: 0 });

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
  }, [statsByPeriod]);

  console.log(statArray);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Short Statistics</div>
        <Dropdown
          title="Week"
          list={dropdownState.periods}
          resetThenSet={resetThenSet}
        />
      </div>
      <div className={styles.posts}>
        {statArray?.map((item, index) => (
          <PostItem
            key={index}
            percentTop={(item.expense / maxs.expense) * 50 || 0}
            percentBottom={(item.income / maxs.income) * 30 || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortStat;
