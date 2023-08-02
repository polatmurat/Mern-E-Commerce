import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "../pages/auth/LoginAdmin";
import Products from "../pages/dashboard/Products";
import Private from "./Private";
import Public from "./Public";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth">
          <Route
            path="login-admin"
            element={
              <Public>
                <LoginAdmin />
              </Public>
            }
          />
        </Route>
        {/* auth/login-admin */}
        <Route path="dashboard">
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
        </Route>
        {/* auth/login-admin */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
