import { useListShopProductsApiHook } from "../../hooks/ApiHooks/UserApiHooks/UserApiHook";

function ListUserPage() {
  useListShopProductsApiHook();
  return <div>ListUserPage</div>;
}

export default ListUserPage;
