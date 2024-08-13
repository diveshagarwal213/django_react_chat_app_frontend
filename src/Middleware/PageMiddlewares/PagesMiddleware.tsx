import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageEnums } from "../../interfaces/global.enums";
import Navbar from "../../Components/NavBars/Navbar";
import Websocket from "../../PartnerWebsocket";

function PagesMiddleware() {
  // Middle ware validation
  const isAccessToken = localStorage.getItem(LocalStorageEnums.REFRESH_TOKEN);
  if (!isAccessToken) return <Navigate to={"/"} />;

  return (
    <div className="partner_pages_middleware">
      <Outlet />
      <Navbar />
      <Websocket />
    </div>
  );
}

export default PagesMiddleware;
