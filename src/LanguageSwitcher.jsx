import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      <Button
        size="small"
        onClick={() => changeLanguage("ru")}
        sx={{
          minWidth: "36px",
          px: 1,
          color: i18n.resolvedLanguage === "ru" ? "#fff" : "#0A61DE",
          backgroundColor: i18n.resolvedLanguage === "ru" ? "#0A61DE" : "transparent",
          "&:hover": { backgroundColor: i18n.resolvedLanguage === "ru" ? "#0A61DE" : "#f0f7ff" },
        }}
      >
        RU
      </Button>
      <Button
        size="small"
        onClick={() => changeLanguage("en")}
        sx={{
          minWidth: "36px",
          px: 1,
          color: i18n.resolvedLanguage === "en" ? "#fff" : "#0A61DE",
          backgroundColor: i18n.resolvedLanguage === "en" ? "#0A61DE" : "transparent",
          "&:hover": { backgroundColor: i18n.resolvedLanguage === "en" ? "#0A61DE" : "#f0f7ff" },
        }}
      >
        EN
      </Button>
    </Box>
  );
}
