import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

function AppLayout( {products, carts ,setToken} ) {

  return (
    <>
      <AppHeader />
      <AppNavbar products={products} carts={carts} setToken={setToken}/>
      <div
        className="p-4"
        style={{ backgroundColor: "#ffffffff", minHeight: "80vh" }}
      >
        <Outlet />
      </div>
      <AppFooter />
    </>
  );
};

export default AppLayout;