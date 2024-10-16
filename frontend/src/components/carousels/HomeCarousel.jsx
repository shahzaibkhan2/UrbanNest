import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/bundle";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import h1 from "../../assets/house1.jpg";

const HomeCarousel = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Autoplay, Navigation]}
      autoplay={{ delay: 3000 }}
      loop={true}
      pagination={{ clickable: true }}
    >
      {[0, 1, 2, 3].map((slider) => (
        <SwiperSlide>
          <div className="w-full h-96">
            <img
              src={h1}
              alt="slide"
              className="object-cover size-full bg-no-repeat"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeCarousel;
