import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper";

import icon from "../../../public/assets/icons/calendar.svg";

import { monthNamesShort, weekDayNames } from "../../../utils/constants";

import styles from "../AddTransactionModal.module.scss";
import { CustomCalendar } from "./Calendar/CustomCalendar";

const Day = ({ date, register, checked }) => {
  return (
    <div className={styles.date_item}>
      <label className={styles.label}>
        <input
          className={`${styles.radio} ${styles.visually_hidden}`}
          {...register("date", { required: true })}
          type="radio"
          value={date}
          checked={checked}
        />
        <div className={styles.date_day}>
          <span className={styles.number}>{date.getDate()}</span>
          <span className={styles.day}>
            {monthNamesShort[date.getMonth()]}, {weekDayNames[date.getDay()]}
          </span>
        </div>
      </label>
    </div>
  );
};

const SWIPER_SLIDES_COUNT = 1000;

const DateBlock = ({ register, onSelectDate }) => {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [swiperRef, setSwiperRef] = React.useState(null);

  const dates = Array.from({ length: SWIPER_SLIDES_COUNT }).map((_, index) => {
    const d = new Date();
    return new Date(d.setDate(d.getDate() - index));
  });

  const openCalendar = () => setShowCalendar(true);
  const closeCalendar = () => setShowCalendar(false);

  const onDateChange = (date) => {
    const diffDays =
      Math.abs(date.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) /
      86400000;

    swiperRef.slideTo(diffDays);
  };

  const onDateSlideChange = (event) => {
    const d = new Date();

    onSelectDate(new Date(d.setDate(d.getDate() - event.activeIndex)));
  };

  return (
    <>
      <div className={styles.subtitle}>Date</div>
      <div className={styles.date_block}>
        <div className={`${styles.date_item} ${styles.date_item__calendar}`}>
          <button
            className={styles.calendar_btn}
            onClick={openCalendar}
            type="button"
          >
            <Image src={icon} alt="icon" />
          </button>
        </div>

        <Swiper
          modules={[Virtual]}
          onSwiper={setSwiperRef}
          dir="rtl"
          slidesPerView={4}
          pagination={{
            type: "fraction",
          }}
          spaceBetween={13}
          navigation={true}
          freeMode={true}
          className={styles.swiper}
          onSlideChange={onDateSlideChange}
        >
          {dates.map((date, index) => (
            <SwiperSlide
              key={date}
              virtualIndex={index}
              onClick={(e) => swiperRef.slideTo(index)}
            >
              {({ isActive }) => (
                <Day register={register} date={date} checked={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {showCalendar && (
        <CustomCalendar
          onClose={closeCalendar}
          show={showCalendar}
          onDateChange={onDateChange}
        />
      )}
    </>
  );
};

export default DateBlock;
