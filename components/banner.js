import React from "react";
import style from "../styles/Banner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper";
SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

const Banner = () => {
  const insta = () => {
    if (confirm("ohco 인스타로 이동할까요?")) {
      window.open(`https://www.instagram.com/ohco.im/`);
    } else {
      return;
    }
  };

  return (
    <div className={style.container}>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 8000 }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            style={{ backgroundColor: "#f9f9f9" }}
            className={style.img}
            src="/img/banner_1.svg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ backgroundColor: "#f9f9f9" }}
            className={style.img}
            src="/img/banner_2.svg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            style={{ backgroundColor: "#f9f9f9" }}
            className={style.img}
            src="/img/banner_3.svg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            onClick={insta}
            style={{ backgroundColor: "#f9f9f9" }}
            className={style.img}
            src="/img/banner_6.svg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
