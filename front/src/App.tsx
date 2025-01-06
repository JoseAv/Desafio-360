import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedOperator } from "./Routes/protectedRoutes";
import { Operator } from "./pages/operator/Operator";
import { Login } from "./pages/LogIn/LogIn";
import { PagesClienteCreate } from "./pages/operator/cliente/ClienteCreate";
import { PagesClienteHome } from "./pages/operator/cliente/ClienteHome";
import { PagesClienteEditar } from "./pages/operator/cliente/ClienteEditar";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/operator/*" element={<ProtectedOperator />}>
          <Route path="home" element={<Operator />} />
          <Route path="clientes/crear" element={<PagesClienteCreate />} />
          <Route path="clientes" element={<PagesClienteHome />} />
          <Route path="clientes/editar/:id" element={<PagesClienteEditar />} />
        </Route>


        <Route path="*" element={<h1>Página no encontrada</h1>} />

        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
