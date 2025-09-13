import { useEffect } from "react";
import Home from "./pages/Home";
import Wakeup from "./Wakeup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<> <Wakeup /><Home /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
