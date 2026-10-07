import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TipoProduto } from "../../types/types";


export default function EditarProduto() {
  document.title = "Editar Produto";

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


    //Para CASA:
    //Preencher os demais campos conforme o CAMPO NOME!!
    //Atenção aos campos númericos, pois podem necessitar de PARSE!

  },[]);
 
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
              <label htmlFor="preco">Preço do Produto:</label>
              <input type="number" name="preco" id="preco" step="0.01" value={produto.preco} onChange={(event)=> setProduto({...produto,preco:parseFloat(event.target.value) || 0})}/>
            </div>
            <div>
              <label htmlFor="estoque">Estoque do Produto:</label>
              <input type="number" name="estoque" id="estoque" value={produto.estoque} onChange={(event)=> setProduto({...produto,estoque:parseInt(event.target.value, 10) || 0})}/>
            </div>
          </fieldset>
        </form>
       </div>

    </main>
  )
}
