import {  Route, Routes } from "react-router-dom";
import { IndexView } from "./templates";

const App = () => {

  return (
        <Routes>
            <Route path="/" element={<IndexView />} exact />
        </Routes>
  );
}

export default App
