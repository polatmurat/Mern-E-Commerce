import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginAdmin from "../pages/auth/LoginAdmin";
import Products from "../pages/dashboard/Products";
import Private from "./Private";
import Public from "./Public";
import Categories from "../pages/dashboard/Categories";
import CreateCategory from "../pages/dashboard/CreateCategory";
import UpdateCategory from "../pages/dashboard/UpdateCategory";
import CreateProduct from "../pages/dashboard/CreateProduct";

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
          <Route
            path="products/:page"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="categories"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="categories/:page"
            element={
              <Private>
                <Categories />
              </Private>
            }
          />
          <Route
            path="create-category"
            element={
              <Private>
                <CreateCategory />
              </Private>
            }
          />
          <Route
            path="update-category/:id"
            element={
              <Private>
                <UpdateCategory />
              </Private>
            }
          />
          <Route
            path="create-product"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
