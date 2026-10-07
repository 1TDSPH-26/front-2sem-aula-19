import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";


export default function EditarProdutos() {
  document.title = "Editar Produtos";

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<TipoProduto>({ id: "", nome:"", preco:0, estoque:0 });



  useEffect(() => {
    const carregaProdutos = async () =>{
      try {
        const response = await fetch(`http://localhost:3001/produtos/${id}`);
        if (!response.ok){
          throw new Error(`Erro na recuperação do produto: ${response.status} - ${response.statusText}`)
        }
        const data: TipoProduto = await response.json();
        setProduto(data);
      } catch (error) {
        console.error(error)
      }
      
    }
    
    carregaProdutos();

  }, []);

  return (
    <main>
      <h2>Editar Produtos</h2>
      <div>
        <form>
          <fieldset>
            <legend>Dados do Produto</legend>
            <div>
              <label htmlFor="nome">Nome do Produto:</label>
              <input type="text" name="nome" id="nome" value={produto.nome} onChange={(event)=> setProduto({...produto,nome:event.target.value})}/>
            </div>  
            <div>
              <label htmlFor="preco">Preço do Produto</label>
              <input type="number" step={0.1} name="preco" id="preco" value={produto.preco} onChange={(event)=> setProduto({...produto,preco: parseFloat(event.target.value)})}/>
            </div>
            <div>
              <label htmlFor="estoque">Estoque do Produto</label>
              <input type="number" step={1} name="estoque" id="estoque" value={produto.estoque} onChange={(event)=> setProduto({...produto,estoque: parseInt(event.target.value)})}/>
            </div>
              
            
          </fieldset>
        </form>
      </div>


    </main>
  )
}
