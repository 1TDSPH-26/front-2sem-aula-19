import { useState } from "react";
import { useNavigate } from "react-router";
import type { TipoProduto } from "../../Types/types";

export default function CadProduto() {
  document.title = "Cadastrar Produto";
  const navigate = useNavigate();

  const [produto, setProduto] = useState<TipoProduto>({ id:"", nome:"" , preco:0 , estoque:0 });

  const handleSubmit = async ()=>{
    try {

      const response = await fetch(`http://localhost:3001/produtos/`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(produto)
      });
      
      //ERRO
        if (!response.ok) {
          throw new Error(`Erro na atualização do produto: ${response.status} - ${response.statusText}`);
        }

        //SUCCESS
        alert("Produto alterado com sucesso!");
        //REDIRECT
        navigate("/produtos");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Cadastro de Produto</h2>
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
          <input type="number" step={0.1} name="preco" id="preco" value={produto.preco} onChange={(event)=> setProduto({...produto,preco: parseFloat(event.target.value)})}/>
            </div>
            <div>
              <label htmlFor="estoque">Estoque do Produto:</label>
          <input type="number" step={1} name="estoque" id="estoque" value={produto.estoque} onChange={(event)=> setProduto({...produto,estoque:parseInt(event.target.value)})}/>
            </div>
            <div>
              <button type="button" onClick={()=> handleSubmit()}>EDITAR</button>
            </div>
          </fieldset>
        </form>
       </div>
    </main>
  );
}
