import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"; 
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { motion } from 'framer-motion';
import banner2 from "../../../assets/BannerImg2.avif"
import banner from "../../../assets/BannerImg.jpg"
import banner3 from "../../../assets/BannerImg3.jpg"
import banner4 from "../../../assets/BannerImg4.jpg"
const Banner = () => {
  return (
    <div className="mt-14">
      <Swiper
        modules={[Autoplay]}  
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500,  
          disableOnInteraction: false,  
        }}
      >
        <SwiperSlide>
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={banner}
            alt="Banner 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner3} alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner4} alt="Banner 4" />
        </SwiperSlide>
       
       
      </Swiper>
    </div>
  );
};

export default Banner;