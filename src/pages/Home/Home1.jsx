import image1 from "../../assets/vata.png";
import image2 from "../../assets/vata2.png";
import image3 from "../../assets/vata3.png";

import { Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const bannerImages = [image1, image2, image3];

export default function Home1() {
  const { t } = useTranslation();
  const banners = t("home.banners", { returnObjects: true }).map((banner, index) => ({
    ...banner,
    image: bannerImages[index],
  }));
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <section className="bgimage w-[100%] h-[400px]">
            <div className="max-w-[1200px] mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-[white]">
                <Typography color="white" variant="h4">
                  {banner.title}
                </Typography>

                <Typography
                  color="white"
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  {banner.subtitle}
                </Typography>

                <Typography
                  color="white"
                  variant="h4"
                  sx={{ mt: 2 }}
                >
                  {banner.price}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    background: "#287FE8",
                  }}
                >
                  {t("home.bannerCta")}
                </Button>
              </div>

              <img
                src={banner.image}
                alt={banner.title}
                className="w-[400px]"
              />
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}