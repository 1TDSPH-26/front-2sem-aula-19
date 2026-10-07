import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Error from './routes/Error/index.tsx'
import Home from './routes/Home/index.tsx'
import Produtos from './routes/Prodoutos/index.tsx'
import EditarProdutos from './routes/EditarProduto/index.tsx'
import CadProduto from './routes/CadProduto/index.tsx'


const router = createBrowserRouter([
  {path: '/', element: <App />, errorElement: <Error/>,children:[
    {path:"/", element:<Home/>},
    {path:"/produtos", element:<Produtos/>},
    {path:"/editar-produto/:id", element:<EditarProdutos/>},
    {path:"/cadastrar-produtos", element:<CadProduto/>}
  ]},
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
