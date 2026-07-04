import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const Delivery = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("rules");

  const buttonStyle = (isActive) => ({
    textTransform: "none",
    borderRadius: 0,
    border: "1px solid #ccc",
    color: isActive ? "#0A61DE" : "#707070",
    backgroundColor: isActive ? "transparent" : "transparent",
    borderColor: isActive ? "#0A61DE" : "#ccc",
    px: 4,
    py: 1,
    "&:hover": {
      borderColor: "#0A61DE",
      backgroundColor: "#f0f7ff",
    },
  });

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Button
          onClick={() => setActiveTab("rules")}
          sx={buttonStyle(activeTab === "rules")}
        >
          <NavLink to="/prvl">
            {t("delivery.rulesTab")}
          </NavLink>
        </Button>
        <Button
          onClick={() => setActiveTab("price")}
          sx={buttonStyle(activeTab === "price")}
        >
          <NavLink to="/stm">
            {t("delivery.priceTab")}
          </NavLink>
        </Button>
      </Box>

      <Box>
        {activeTab === "rules" ? (
          <Box>
            <h2>{t("delivery.rulesHeading")}</h2>
            <p>{t("delivery.rulesContent")}</p>
          </Box>
        ) : (
          <Box>
            <h2>{t("delivery.priceHeading")}</h2>
            <p>{t("delivery.priceContent")}</p>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Delivery;