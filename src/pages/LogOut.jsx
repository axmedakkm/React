import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function LogOut() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    navigate("/login");
  }

  return (
    <button onClick={handleLogout} className="text-red-600 font-bold">
      {t("logout.button")}
    </button>
  );
}