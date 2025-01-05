import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedOperator } from "./Routes/protectedRoutes";
import { Operator } from "./pages/operator/Operator";
import { PagesCliente } from "./pages/operator/Cliente";
import { Login } from "./pages/LogIn/LogIn";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/operator/*" element={<ProtectedOperator />}>
          <Route path="home" element={<Operator />} />
          <Route path="cliente" element={<PagesCliente />} />
        </Route>


        <Route path="*" element={<h1>Página no encontrada</h1>} />

        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
