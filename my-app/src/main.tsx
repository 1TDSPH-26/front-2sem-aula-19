import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";

import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './routes/Home/index.tsx';
import Produtos from './routes/Produtos/index.tsx';
import EditarProduto from './routes/EditarProduto/index.tsx';
import Error from './routes/Error/index.tsx';

const router = createBrowserRouter([
  {path:'/', element: <App/>, errorElement: <Error/>, children:[
    {path: '/', element: <Home/>},
    {path:'/produtos',element:<Produtos/>},
    {path:'/editar-produto/:id', element:<EditarProduto/>},
    // { path: '/editar-produtos', element: <EditarProdutos /> },
  ]},

  const navigate = useNavigate();

  const { id } = useParams<{id:string}>();

  const [produto, setProduto] = useState<TipoProduto>({ id:"", nome:"" , preco:0 , estoque:0 });



  useEffect( ()=> {

    const carregaProduto = async () => {

      try {

        // const response = await fetch("http://localhost:3001/produtos/"+id);
        const response = await fetch(`http://localhost:3001/produtos/${id}`);

        if (!response.ok) {
          throw new Error(`Erro na recuperação do produto: ${response.status} - ${response.statusText}`);
        }

        const data: TipoProduto = await response.json();
        setProduto(data);

      } catch (error) {
        console.error(error);
      }
    }

    carregaProduto();

  },[]);
 
  return (
    <main>
        <h2>Editar Produtos</h2>
        <p>ID : {id}</p>

        <div>

        {produto ?
          (
          <div>
            <p>Nome : {produto.nome}</p>
            <p>Preço: {produto.preco}</p>
          </div>
          ):
          (<p>Produto não encontrado!</p>)
         }

        </div>

    </main>
  )
}
