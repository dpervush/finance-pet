import React from "react";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useShortStat } from "../../hooks/useShortStat";

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
      key: "periods"
    },
    {
      id: 1,
      title: "Month",
      selected: false,
      key: "periods"
    },
    {
      id: 2,
      title: "Year",
      selected: false,
      key: "periods"
    }
  ]
};

const ShortStat = () => {
  const dispatch = useDispatch();

  const { statsByPeriod, periodStatLoading } = useSelector(
    ({ stats }) => stats
  );

  const [selectedPeriod, setSelectedPeriod] = React.useState("week");

  const [dropdownState, setDropdownState] = React.useState(state);

  const resetThenSet = (id, items) => {
    const temp = [...items];

    temp.forEach((item) => (item.selected = false));
    temp[id].selected = true;

    setSelectedPeriod(temp[id].title.toLowerCase());

    setDropdownState({ ...dropdownState, [items[0].key]: temp });
  };

  const [statArray, maxs] = useShortStat(statsByPeriod, selectedPeriod);

  React.useEffect(() => {
    dispatch(getStatsByPeriod({ period: selectedPeriod }));
  }, []);

  React.useEffect(() => {
    dispatch(getStatsByPeriod({ period: selectedPeriod }));
  }, [selectedPeriod]);

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
      {periodStatLoading && (
        <div className={styles.loader}>
          <Loader type="Oval" color="#24dffe" height={60} width={60} />
        </div>
      )}
      {!periodStatLoading && (
        <div className={styles.posts}>
          {statArray?.map((item, index) => (
            <PostItem
              key={index}
              percentTop={(item.expense / maxs.expense) * 50 || 0}
              percentBottom={(item.income / maxs.income) * 30 || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortStat;
