import {  Route, Routes } from "react-router-dom";
import { IndexView,CartView } from "./templates";

const App = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexView />} exact />
            <Route path="/cart" element={<CartView />}  />
        </Routes>
    );
}

export default App
