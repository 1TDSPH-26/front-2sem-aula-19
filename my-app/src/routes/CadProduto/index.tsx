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
    </main>
  );
}
