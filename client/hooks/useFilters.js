import React from "react";

const dropdownFlow = [
  {
    id: 0,
    title: "All",
    as: "Flow",
    selected: false,
    key: "flow"
  },
  {
    id: 1,
    title: "Income",
    selected: false,
    key: "flow"
  },
  {
    id: 2,
    title: "Expense",
    selected: false,
    key: "flow"
  }
];

export const useFilters = (cards, categories) => {
  const [dropdownState, setDropdownState] = React.useState({
    flow: dropdownFlow
  });
  const [filters, setFilteres] = React.useState({
    card: null,
    category: null,
    flow: null
  });

  React.useEffect(() => {
    const dropdownCards = cards.map((card) => ({
      id: card.id,
      title: card.name || card.number,
      selected: false,
      key: "cards"
    }));

    const dropdownCategories = categories.map((category) => ({
      id: category.id,
      title: category.title,
      selected: false,
      key: "categories"
    }));

    setDropdownState({
      ...dropdownState,
      cards: [
        {
          id: 0,
          title: "All",
          as: "Card",
          selected: false,
          key: "card"
        },
        ...dropdownCards
      ],
      categories: [
        {
          id: 0,
          title: "All",
          as: "Category",
          selected: false,
          key: "category"
        },
        ...dropdownCategories
      ]
    });
  }, [cards, categories]);

  const resetThenSet = (id, items) => {
    const temp = [...items];

    let currentFilter;
    temp.forEach((item) => {
      if (item.id === id) {
        currentFilter = id;
        return (item.selected = true);
      } else {
        return (item.selected = false);
      }
    });

    setDropdownState({ ...dropdownState, [temp[0].key]: [...temp] });
    setFilteres({ ...filters, [temp[0].key]: currentFilter });
  };

  return [filters, dropdownState, resetThenSet];
};
