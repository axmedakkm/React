import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Typography, Button, TextField, IconButton, Select, MenuItem, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
export default function Shop() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [warehouse, setWarehouse] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : (state ? [state] : []);
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (id) => setCartItems(cartItems.filter((item) => item.id !== id));
  
  const updateQty = (id, delta) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const handleOrder = () => {
    localStorage.removeItem("cartItems");
    setIsOrdered(true);
  };

  const totalSum = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (isOrdered) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center">
        <Typography variant="h4" className="font-bold mb-2">{t("shop.orderedTitle")}</Typography>
        <Typography variant="body1" className="text-gray-500 mb-8">{t("shop.orderedText")}</Typography>
        <Button variant="contained" onClick={() => navigate("/")} className="!bg-[#1E78FF] !py-3 !px-10">
          {t("shop.toHome")}
        </Button>
      </Box>
    );
  }

  return (
    <Box className="max-w-[1200px] mx-auto p-6 flex flex-col md:flex-row gap-8">
      <Box className="flex-grow">
        <Typography variant="h4" className="mb-6 font-bold">{t("shop.cartTitle")}</Typography>
        {cartItems.length === 0 ? <Typography>{t("shop.cartEmpty")}</Typography> : cartItems.map(item => (
          <Box key={item.id} className="flex items-center p-4 border-b gap-4">
            <Box component="img" src={item.images} className="w-20 h-20 object-cover rounded" />
            <Box className="flex-grow">
              <Typography variant="body1" className="font-semibold">{item.title}</Typography>
              <Box className="flex items-center gap-4 mt-2">
                <Typography variant="subtitle1" className="text-gray-600">{t("shop.pricePerUnit", { price: item.price })}</Typography>
                <Box className="flex items-center border rounded">
                  <IconButton onClick={() => updateQty(item.id, -1)}><RemoveIcon/></IconButton>
                  <Typography className="px-2">{item.qty}</Typography>
                  <IconButton onClick={() => updateQty(item.id, 1)}><AddIcon/></IconButton>
                </Box>
                <Typography color="primary" className="font-bold">{t("shop.itemTotal", { sum: item.price * item.qty })}</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => removeItem(item.id)} color="error"><CloseIcon /></IconButton>
          </Box>
        ))}
      </Box>

      <Box className="w-full md:w-[400px] p-6 border rounded-2xl shadow-xl bg-white h-fit flex flex-col gap-4">
        <Typography variant="h5" className="text-center font-bold my-2">{t("shop.checkoutTitle")}</Typography>
        <TextField fullWidth label={t("shop.nameLabel")} />
        <TextField fullWidth label={t("shop.phoneLabel")} />
        <TextField fullWidth label={t("shop.emailLabel")} />
        <FormControl fullWidth>
          <Select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} displayEmpty>
            <MenuItem value=""><em>{t("shop.selectWarehouse")}</em></MenuItem>
            <MenuItem value="Склад 1">{t("shop.warehouse", { n: 1 })}</MenuItem>
            <MenuItem value="Склад 2">{t("shop.warehouse", { n: 2 })}</MenuItem>
            <MenuItem value="Склад 3">{t("shop.warehouse", { n: 3 })}</MenuItem>
            <MenuItem value="Склад 4">{t("shop.warehouse", { n: 4 })}</MenuItem>
          </Select>
        </FormControl>
        <Box className="flex justify-between items-center my-4">
          <Typography variant="h6" className="font-bold">{t("shop.itemsCount", { count: totalItems })}</Typography>
          <Typography variant="h6" className="font-bold !text-[#1E78FF]">{t("shop.totalSum", { sum: totalSum })}</Typography>
        </Box>
        <Button fullWidth variant="contained" onClick={handleOrder} className="!py-3.5 !bg-[#1E78FF]">
          {t("shop.placeOrder")}
        </Button>
        <Typography variant="caption" className="text-gray-400 text-center">
          {t("shop.policyNote")}
        </Typography>
      </Box>
    </Box>
  );
}