import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RouterLogIn } from "./Routes/logIn"
import { RouterOperator } from "./Routes/operatorRoutes";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login/*" element={<RouterLogIn />} />
        <Route path="/operator/*" element={<RouterOperator />} />

        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
