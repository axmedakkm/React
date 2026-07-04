import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, NavLink } from "react-router";
import { Box, Button, Container, Drawer, IconButton, InputAdornment, List, ListItemText, Popover, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AppsIcon from "@mui/icons-material/Apps";
import image1 from "../src/assets/Group 42.png";
import Footer from './Footer';
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogOut from "./pages/LogOut";
import LanguageSwitcher from "./LanguageSwitcher";
export default function Layout() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCatalogClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box component="header" sx={{ width: "100%" }}>
        <Container maxWidth="lg" sx={{ py: 2, display: "flex", alignItems: "center", gap: 3 }}>


          <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <img src={image1} alt="Logo" />
          </NavLink>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Box sx={{ borderLeft: "1px solid #ccc", height: "24px", mx: 1 }} />
            <Typography variant="body2" color="textSecondary">
              {t("nav.tagline")}
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 3, ml: "auto", alignItems: "center" }}>
            <NavLink to="/delivery" style={{ textDecoration: "none", color: "#0A61DE" }}>{t("nav.delivery")}</NavLink>
            <NavLink to="/payment" style={{ textDecoration: "none", color: "#0A61DE" }}>{t("nav.payment")}</NavLink>
            <NavLink to="/contacts" style={{ textDecoration: "none", color: "#0A61DE" }}>{t("nav.contacts")}</NavLink>
            <Typography sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
              📞 {t("common.phone")}
            </Typography>
            <NavLink to="/shop">
              <ShoppingCartIcon
                sx={{
                  color: "#0A61DE",
                  fontSize: 20
                }}
              />
            </NavLink>
            <LanguageSwitcher />
          </Box>

          <Box sx={{ display: { xs: "flex", lg: "none" }, ml: "auto", alignItems: "center", gap: 1 }}>
            <LanguageSwitcher />
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#0A61DE" }}>
              <PhoneIcon />
            </IconButton>
          </Box>
        </Container>



        <Box sx={{ bgcolor: "#EEEEEE", py: 2 }}>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AppsIcon />}
              onClick={handleCatalogClick}
              sx={{ bgcolor: "#0A61DE", height: "40px", px: 3 }}
            >
              {t("nav.catalogButton")}
            </Button>

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <List sx={{ width: 300, bgcolor: '#f5f5f5' }}>
                {t("catalog.categoriesShort", { returnObjects: true }).map((category) => (
                  <NavLink
                    key={category}
                    to="/Catalog"
                    onClick={handleClose}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ListItemText primary={category} />
                      <KeyboardArrowRightIcon />
                    </Box>
                  </NavLink>
                ))}
              </List>
            </Popover>

            <TextField
              fullWidth
              placeholder={t("nav.searchPlaceholder")}
              size="small"
              sx={{ bgcolor: "white" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ bgcolor: "#0A61DE", m: -1.5, height: "40px", px: 2, cursor: "pointer" }}>
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button sx={{ color: "#666", textTransform: "none" }} startIcon={<LocationOnIcon />}>
              {t("nav.city")}
            </Button>
            <LogOut />
          </Container>
        </Box>
      </Box >
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 3 }}>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <NavLink to="/delivery" style={{ textDecoration: "none", color: "#0A61DE" }}>{t("nav.delivery")}</NavLink>
            <NavLink to="/payment" style={{ textDecoration: "none", color: "#0A61DE" }}>{t("nav.payment")}</NavLink>
            <NavLink to="/contacts" style={{ textDecoration: "none", color: "#0A61DE" }}>{t("nav.contacts")}</NavLink>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: "#0A61DE" }}
            onClick={() => setDrawerOpen(false)}
          >
            {t("common.close")}
          </Button>
        </Box>
      </Drawer>
      <Outlet />
      <Footer />
    </>
  );
}