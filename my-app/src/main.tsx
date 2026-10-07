import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './routes/Home/index.tsx';
import Produtos from './routes/Produtos/index.tsx';
import EditarProduto from './routes/EditarProduto/index.tsx';
import Error from './routes/Error/index.tsx';
import CadProduto from './routes/CadProduto/index.tsx';

const router = createBrowserRouter([
  {path:'/', element: <App/>, errorElement: <Error/>, children:[
    {path: '/', element: <Home/>},
    {path:'/produtos',element:<Produtos/>},
    {path:'/editar-produto/:id', element:<EditarProduto/>},
    {path:'/cadastrar-produto/', element:<CadProduto/>},
  ]},

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
