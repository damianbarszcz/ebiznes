import {  Route, Routes } from "react-router-dom";
import { IndexView,CartView,LoginView,RegisterView,DashboardView } from "./templates/index.js";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexView />} exact />
            <Route path="/cart" element={<CartView />}  />
            <Route path="/login" element={<LoginView />}  />
            <Route path="/register" element={<RegisterView />}  />
            <Route path="/user/dashboard" element={<DashboardView />}  />
        </Routes>
    );
}

export default App
