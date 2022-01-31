import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { BubbleBlock } from "./BubbleBlock/BubbleBlock";

import { getStatsByCategory } from "../../store/slices/stats";
import { useCanvasSize } from "./hooks/useCanvasSize";
import { useBubbleStat } from "./hooks/useBubbleStat";

import styles from "./BubbleStat.module.scss";

const BubbleStat = () => {
  const dispatch = useDispatch();
  const { statsByCategoryExpense, categoryStatLoading } = useSelector(
    ({ stats }) => stats
  );

  React.useEffect(() => {
    dispatch(getStatsByCategory());
  }, []);

  const { canvasWidth, canvasRef } = useCanvasSize();
  const { stats, statsLength } = useBubbleStat(statsByCategoryExpense);

  return (
    <div className={styles.wrapper} ref={canvasRef}>
      {categoryStatLoading && (
        <div className={styles.loader}>
          <Loader type="Oval" color="#24dffe" height={60} width={60} />
        </div>
      )}
      {!categoryStatLoading && stats?.length === 0 && (
        <div className={styles.no_data}>No data here :(</div>
      )}
      {!categoryStatLoading && stats && stats.length > 0 && (
        <Swiper
          modules={[Pagination]}
          initialSlide={statsLength}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {stats.map((block, index) => (
            <SwiperSlide key={index}>
              <BubbleBlock data={block} width={canvasWidth} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BubbleStat;
