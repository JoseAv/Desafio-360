import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RouterLogIn } from "./Routes/logIn"




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login/*" element={<RouterLogIn />} />

        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
