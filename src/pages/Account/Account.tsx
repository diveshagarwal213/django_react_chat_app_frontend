import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageEnums } from "../../interfaces/global.enums";

function Account() {
  //protected
  const isAccessToken = localStorage.getItem(LocalStorageEnums.REFRESH_TOKEN);
  if (isAccessToken) return <Navigate to="/main/users/" />;
  return <Outlet />;
}

export default Account;
