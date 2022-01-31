import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { CurrencyModal } from "../CurrencyModal/CurrencyModal";
import { IconsBlock } from "../../UI/IconsBlock/IconsBlock";
import Button from "../../UI/Button/Button";
import { icons } from "../../../utils/constants";

import { createCard, updateCard } from "../../../store/slices/cards";

import styles from "./AddForm.module.scss";
import { TotalSwitch } from "./TotalSwitch/TotalSwitch";
import { ColorInput } from "./ColorInput/ColorInput";
import { BalanceInput } from "./BalanceInput/BalanceInput";
import { NameInput } from "./NameInput/NameInput";

export const AddForm = ({ method, initValues }) => {
  const dispatch = useDispatch();

  const [activeCurrency, setActiveCurrency] = React.useState(
    initValues?.currency || "RUB"
  );

  const [showCurrencyBlock, setShowCurrencyBlock] = React.useState(false);

  const [activeIcon, setActiveIcon] = React.useState(
    initValues?.icon || icons[0]
  );
  const [showIconsBlock, setShowIconsBlock] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: initValues || {
      total: true,
      color: "#8A16FF",
      currency: activeCurrency,
      icon: icons[0]
    }
  });

  const handleCurrency = () => {
    setActiveCurrency(getValues("currency"));
    setShowCurrencyBlock(false);
  };

  const handleIcon = () => {
    setActiveIcon(getValues("icon"));
    setShowIconsBlock(false);
  };

  const toggleShowCurrencyBlock = () => {
    setShowCurrencyBlock(true);
  };

  const toggleShowIconBlock = () => {
    setShowIconsBlock(true);
  };

  const onSubmit = (data) => {
    method === "UPDATE"
      ? dispatch(
          updateCard({ ...data, balance: +data.balance, id: initValues.id })
        )
      : dispatch(createCard({ ...data, balance: +data.balance }));
    reset();
    onClose();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_body}>
        <NameInput
          register={register}
          activeIcon={activeIcon}
          errors={errors}
          toggleShowIconBlock={toggleShowIconBlock}
        />
        <BalanceInput
          register={register}
          activeCurrency={activeCurrency}
          toggleShowCurrencyBlock={toggleShowCurrencyBlock}
        />
        <ColorInput register={register} />
        {showCurrencyBlock && (
          <CurrencyModal
            onSubmit={handleCurrency}
            register={register}
            onClose={() => setShowCurrencyBlock(false)}
          />
        )}
        {showIconsBlock && (
          <IconsBlock
            icons={icons}
            onSubmit={handleIcon}
            register={register}
            onClose={() => setShowIconsBlock(false)}
          />
        )}

        <TotalSwitch register={register} />
      </div>
      <div className={styles.btn_wrapper}>
        <Button
          innerText={method === "UPDATE" ? "Update" : "Create"}
          type="submit"
          padding="13px 35px"
        ></Button>
      </div>
    </form>
  );
};
