import {  Route, Routes } from "react-router-dom";
import { IndexView,CartView,ProductView,LoginView,RegisterView,DashboardView } from "./templates";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexView />} exact />
            <Route path="/cart" element={<CartView />}  />
            <Route path="/product/:id" element={<ProductView />}  />
            <Route path="/login" element={<LoginView />}  />
            <Route path="/register" element={<RegisterView />}  />
            <Route path="/user/dashboard" element={<DashboardView />}  />
        </Routes>
    );
}

export default App
