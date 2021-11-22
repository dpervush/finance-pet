import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Virtual } from "swiper";

import { getStatsByCategory } from "../../store/slices/stats";
import { BubbleBlock } from "./BubbleBlock/BubbleBlock";

const BubbleStat = () => {
  const dispatch = useDispatch();
  const { statsByCategory } = useSelector(({ stats }) => stats);

  React.useEffect(() => {
    dispatch(getStatsByCategory());
  }, []);

  const groupStats = () => {
    return statsByCategory.reduce((result, current) => {
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

  const [stats, setStats] = React.useState(null);
  const [statsLength, setStatsLength] = React.useState(0);

  React.useEffect(() => {
    const stats = groupStats();

    const sortedStats = Object.entries(stats)
      .sort((obj1, obj2) => obj1[0] - obj2[0])
      .map((item) => item[1]);

    setStats(sortedStats);
    setStatsLength(sortedStats.length - 1 || 0);
  }, [statsByCategory]);

  return (
    stats &&
    stats.length > 0 && (
      <Swiper
        modules={[Pagination]}
        initialSlide={statsLength}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {stats.map((block, index) => (
          <SwiperSlide key={index}>
            <BubbleBlock data={block} />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};

export default BubbleStat;
