import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";


export default function EditarProduto() {
  document.title = "Editar Produto";

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
          </fieldset>
        </form>
       </div>

    </main>
  )
}
