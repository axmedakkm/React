import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import image1 from "../../assets/tele1.png"
import image2 from "../../assets/tele2.png"
import image3 from "../../assets/tele3.png"
import image4 from "../../assets/tele4.png"
import image5 from "../../assets/tele5.png"
import image6 from "../../assets/tele6.png"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router";

function useProducts() {
  const { t } = useTranslation();
  return [
    { id: 1, title: t("products.comfort20Title"), price: 2491, badge: t("products.giftBadge"), images: image1 },
    { id: 2, title: t("products.comfort20Title"), price: 3200, badge: null, images: image2 },
    { id: 3, title: t("products.comfort20Title"), price: 1345, badge: null, images: image3 },
    { id: 4, title: t("products.comfort20Title"), price: 2600, badge: null, images: image4 },
    { id: 5, title: t("products.comfort30Title"), price: 2890, badge: t("products.newBadge"), images: image5 },
    { id: 6, title: t("products.foilTitle"), price: 1980, badge: null, images: image6 },
  ];
}

function formatPrice(n) {
  return `${n.toLocaleString("ru-RU")} ₽/шт.`;
}

function QtyStepper({ value, onChange }) {
  return (
    <Box className="flex items-center border border-gray-300 rounded overflow-hidden h-[36px]">
      <IconButton size="small" onClick={() => onChange(Math.max(1, value - 1))} className="!rounded-none border-r border-gray-300 !w-8">
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Box className="w-10 text-center text-sm">{value}</Box>
      <IconButton size="small" onClick={() => onChange(value + 1)} className="!rounded-none border-l border-gray-300 !w-8">
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}



function ProductCard({ product }) {
  const [qty, setQty] = useState(1);

  function addToCart() {
    const savedCart = localStorage.getItem("cartItems");
    const cart = savedCart ? JSON.parse(savedCart) : [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  return (
    <Card 
      elevation={0} 
      className="border border-gray-200 rounded-none h-full flex flex-col p-2"
    >
      <Box component="img" src={product.images} className="w-full h-48 object-contain" />
      
      <CardContent className="!p-2 flex flex-col flex-1">
        <Typography variant="body2" className="text-gray-700 text-center text-sm leading-tight mb-2 min-h-[40px]">
          {product.title}
        </Typography>
        
        <Typography variant="h6" className="!font-bold !text-[#1E78FF] text-center mb-3">
          {formatPrice(product.price)}
        </Typography>

        <Box className="flex gap-2 justify-center mt-auto">
          <QtyStepper value={qty} onChange={setQty} />
          <IconButton 
            onClick={addToCart}
            disableRipple // Эффекти пахшшавиро тоза мекунад
            className="!bg-[#1E78FF] !text-white !rounded-none !w-[45px] !h-[38px] hover:!bg-[#1E78FF] !shadow-none !border-none"
          >
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ProductCarousel() {
  const { t } = useTranslation();
  const products = useProducts();
  return (
    <Box className="max-w-[1200px] mx-auto p-6">
      <div className="max-w-[1200px] m-auto p-[10px] flex justify-between items-center">
        <Typography variant="h5">{t("home.insulationTitle")}</Typography>
        <Button sx={{ backgroundColor: "#287FE8", marginTop: '10px' }} variant="contained">{t("products.viewAll")}</Button>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1.2}
        pagination={{ clickable: true }}
        navigation={false} // arrows explicitly disabled
        breakpoints={{
          480: { slidesPerView: 2.2, spaceBetween: 14 },
          768: { slidesPerView: 3.2, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
        }}
        className="!pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
