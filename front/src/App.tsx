import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedCliente, ProtectedOperator } from "./Routes/protectedRoutes";
//Opertador
import { Operator } from "./pages/operator/Operator";
import { Login } from "./pages/LogIn/LogIn";
import { PagesClienteCreate } from "./pages/operator/cliente/ClienteCreate";
import { PagesClienteHome } from "./pages/operator/cliente/ClienteHome";
import { PagesClienteEditar } from "./pages/operator/cliente/ClienteEditar";
import { PagesCategoryHome } from "./pages/operator/category/CategoryHome";
import { PagesCategoriasCreate } from "./pages/operator/category/CategoryCreate";
import { PagesCategoryEditar } from "./pages/operator/category/CategoryEditar";
import { PagesUserCreate } from "./pages/user/userCreate";
import { PagesUserEditar } from "./pages/user/userEditar";
import { PagesUserHome } from "./pages/user/userHome";
import { PagesProductosCreate } from "./pages/productos/productosCreate";
import { PagesProductosHome } from "./pages/productos/ProductosHome";
import { PagesProductosEditar } from "./pages/productos/productosEditar";
import { PagesClienteUser } from "./pages/clienteHome/ClienteHome";



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

          <Route path="usuarios/crear" element={<PagesUserCreate />} />
          <Route path="usuarios" element={<PagesUserHome />} />
          <Route path="usuarios/editar/:id" element={<PagesUserEditar />} />

          <Route path="productos/crear" element={<PagesProductosCreate />} />
          <Route path="productos" element={<PagesProductosHome />} />
          <Route path="productos/editar/:id" element={<PagesProductosEditar />} />

        </Route>


        <Route path="/cliente/*" element={<ProtectedCliente />}>
          <Route path="home" element={<PagesClienteUser />} />
        </Route>



        <Route path="*" element={<h1>Página no encontrada</h1>} />

        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
