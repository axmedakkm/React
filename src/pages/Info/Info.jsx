import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosRequest } from "../../lib/axiosRequest";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Pagination,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

function useProducts() {
  const { t } = useTranslation();
  return [
    { id: 1, title: t("products.comfort20Title"), price: 2491, badge: t("products.giftBadge") },
    { id: 2, title: t("products.comfort20Title"), price: 3200, badge: null },
    { id: 3, title: t("products.comfort20Title"), price: 1345, badge: null },
    { id: 4, title: t("products.comfort20Title"), price: 2600, badge: null },
    { id: 5, title: t("products.comfort30Title"), price: 2890, badge: t("products.newBadge") },
    { id: 6, title: t("products.foilTitle"), price: 1980, badge: null },
  ];
}

function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

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
    <Card elevation={0} sx={{ borderRadius: "14px", border: "1px solid #e5e7eb", display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ position: "relative", aspectRatio: "4/3", background: "#f9f9f9" }}>
        <Box component="img" src={`https://placehold.co/300x220?text=${product.id}`} alt={product.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {product.badge && (
          <Box sx={{ position: "absolute", top: 8, left: 8, background: "#ffeb3b", color: "#000", px: 1, py: 0.5, borderRadius: 1, fontSize: "11px", fontWeight: "bold" }}>
            {product.badge}
          </Box>
        )}
      </Box>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: "12px !important" }}>
        <Typography sx={{ fontSize: "12.5px", mb: 1 }}>{product.title}</Typography>
        <Typography sx={{ color: "#287FE8", fontWeight: "bold", fontSize: "18px", mt: "auto", mb: 1 }}>
          {product.price?.toLocaleString("ru-RU")} ₽/шт.
        </Typography>
        <Box className="flex items-center gap-2">
          <Box className="flex items-center border border-gray-300 rounded overflow-hidden h-[36px]">
            <Button size="small" onClick={() => setQty(Math.max(1, qty - 1))} sx={{ minWidth: 32, p: 0, borderRadius: 0, borderRight: "1px solid #e5e7eb" }}>
              <RemoveIcon fontSize="small" />
            </Button>
            <Box className="w-10 text-center text-sm">{qty}</Box>
            <Button size="small" onClick={() => setQty(qty + 1)} sx={{ minWidth: 32, p: 0, borderRadius: 0, borderLeft: "1px solid #e5e7eb" }}>
              <AddIcon fontSize="small" />
            </Button>
          </Box>
          <Button onClick={addToCart} sx={{ background: "#287FE8", color: "#fff", borderRadius: "8px", width: 42, height: 36, minWidth: 42 }}>
            <ShoppingCartIcon fontSize="small" />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card sx={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #e5e7eb" }} elevation={0}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" width="60%" height={30} sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" height={36} sx={{ mt: 2, borderRadius: 1 }} />
      </CardContent>
    </Card>
  );
}

export default function Info() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 6;

  async function getProducts(currentPage = 1) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosRequest.get("/products", { params: { page: currentPage, limit: LIMIT } });
      const items = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      setProducts(items);
      if (data?.total && data?.limit) setTotalPages(Math.ceil(data.total / data.limit));
      else if (data?.totalPages) setTotalPages(data.totalPages);
    } catch (err) {
      setError(t("catalog.loadError"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getProducts(page); }, [page]);

  return (
    <Box className="max-w-[1200px] mx-auto p-6">
      <Typography variant="h5" fontWeight="bold" className="mb-6">{t("catalog.title")}</Typography>
      {error && (
        <Box sx={{ p: 3, mb: 3, borderRadius: 2, background: "#fff1f1", border: "1px solid #fca5a5", color: "#dc2626", textAlign: "center" }}>
          {error}
          <Button sx={{ ml: 2 }} size="small" variant="outlined" color="error" onClick={() => getProducts(page)}>{t("catalog.retry")}</Button>
        </Box>
      )}
      <Box className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {loading ? Array.from({ length: LIMIT }).map((_, i) => <SkeletonCard key={i} />) : products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Box>
      {!loading && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" shape="rounded" />
        </Box>
      )}
    </Box>
  );
}