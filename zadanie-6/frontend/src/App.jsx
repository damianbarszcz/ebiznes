import {  Route, Routes } from "react-router-dom";
import { IndexView,CartView,ProductView } from "./templates";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexView />} exact />
            <Route path="/cart" element={<CartView />}  />
            <Route path="/product/:id" element={<ProductView />}  />
        </Routes>
    );
}

export default App
