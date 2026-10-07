import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TipoProduto } from "../../types/types";
import { useNavigate } from "react-router";

const listaProdutos = [

  {id: 1, nome: "Produto-1", preco: 23.90 },
  {id: 2, nome: "Produto-2", preco: 99.10 },
  {id: 3, nome: "Produto-3", preco: 132.40 },
];

export default function EditarProduto() {
  document.title = "Editar Produto";

  const navigate = useNavigate();

  const { id } = useParams<{id:string}>();

  const [produto, setProduto] = useState<TipoProduto>({} as { id:"",nome:"",preco:0,estoque:0 });

  useEffect( ()=> {
    const carregaProduto = async () => {
      try {
        const response = await fetch(`http:localhost:3001/produtos/${id}`)

        if (!response.ok) {
          throw new Error(`Erro na recuperação do produto: ${response.status} - ${response.statusText}`);
        }

        const data: TipoProduto = await response.json();
        setProduto(data);

      } catch (error) {
        console.error(error);
      }
    }

    carregaProduto()

  },[]);

  const handleUpdate = async ()=>{
    try {
      const response = await fetch(`https://localhost:3001/produtos/${id}`,{
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!response.ok) {
        throw new Error(`Erro na atualização do produto: ${response.status}" - ${response.statusText}`);
      }

      alert("Produto alterado");
      navigate("/produtos")

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
        <h2>Editar Produtos</h2>
        <div>
          <form>
            <fieldset>
              <legend>Dados do produto</legend>
              <div>
                <label htmlFor="nome">Nome do produto</label>
                <input type="text" name="nome" id="nome" value={produto.nome} onChange={(event)=> setProduto({...produto,nome:event.target.value})}/>
                <p>{produto.nome}</p>
              </div>
            <div>
              <label htmlFor="preco">Preço do produto</label>
              <input type="number" name="preco" id="preco" value={produto.preco} onChange={(event) => setProduto({
                ...produto, preco: Number(event.target.value)})} />
              <p>{produto.preco}</p>
            </div>
            <div>
              <label htmlFor="estoque">Estoque</label>
              <input type="number" name="estoque" id="estoque" value={produto.estoque} onChange={(event) => setProduto({
                ...produto, estoque: Number(event.target.value)
              })} />
              <p>{produto.estoque}</p>
            </div>
            <div>
              <button type="button" onClick={()=>handleUpdate()}>Editar produto</button>
            </div>
            </fieldset>
              
          </form>
        </div>

    </main>
  )
}
