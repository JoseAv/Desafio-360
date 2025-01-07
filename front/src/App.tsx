import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedOperator } from "./Routes/protectedRoutes";
import { Operator } from "./pages/operator/Operator";
import { Login } from "./pages/LogIn/LogIn";
import { PagesClienteCreate } from "./pages/operator/cliente/ClienteCreate";
import { PagesClienteHome } from "./pages/operator/cliente/ClienteHome";
import { PagesClienteEditar } from "./pages/operator/cliente/ClienteEditar";
import { PagesCategoryHome } from "./pages/operator/category/CategoryHome";
import { PagesCategoriasCreate } from "./pages/operator/category/CategoryCreate";
import { PagesCategoryEditar } from "./pages/operator/category/CategoryEditar";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/operator/*" element={<ProtectedOperator />}>
          <Route path="home" element={<Operator />} />

          <Route path="clientes/crear" element={<PagesClienteCreate />} />
          <Route path="clientes" element={<PagesClienteHome />} />
          <Route path="clientes/editar/:id" element={<PagesClienteEditar />} />



          <Route path="categorias/crear" element={<PagesCategoriasCreate />} />
          <Route path="categorias" element={<PagesCategoryHome />} />
          <Route path="categorias/editar/:id" element={<PagesCategoryEditar />} />

        </Route>


        <Route path="*" element={<h1>Página no encontrada</h1>} />

        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
