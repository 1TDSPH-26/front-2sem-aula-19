import { useNavigate } from "react-router";
import type { tipoProduto } from "../../types/tipoProduto";
import { useState } from "react";

export default function CadProduto() {

    document.title = "Cadastrar Produto";


    const navigate = useNavigate()  
    const [produto, setProduto] = useState<tipoProduto>({ id: "", nome: "", preco: 0, estoque: 0 });


     const handleSubmit = async() => {
       try {
            
            const response = await fetch(`http://localhost:3001/produtos/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            
            }) 
            //Erro
            if (!response.ok) {
                throw new Error(`Erro no cadastro do produto: ${response.status} - ${response.statusText}`);
            }
            //Sucesso
            alert("Produto cadastrado com sucesso!");
            //Redirecionar para a página de produtos
            navigate("/produtos");

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <h1>Cadastrar Produto</h1>

            <div>
                <form>
                    <fieldset>
                        <legend>Dados do Produto</legend>
                        <div>
                            <label htmlFor="nome">Nome do produto</label>
                            <input type="text" name="nome" id="nome" value={produto.nome} onChange={(e) => setProduto({...produto,nome: e.target.value})}/>
                        </div>
                        <div>
                            <label htmlFor="preco">Preço do produto</label>
                            <input type="number" name="preco" id="preco" value={produto.preco} onChange={(e) => setProduto({...produto,preco: parseFloat(e.target.value)})}/>
                        </div>
                        <div>
                            <label htmlFor="estoque">Estoque do produto</label>
                            <input type="number" name="estoque" id="estoque" value={produto.estoque} onChange={(e) => setProduto({...produto,estoque: parseInt(e.target.value)})}/>
                        </div>
                        <div>
                            <button type="button" onClick={() => handleSubmit()}>Salvar Alterações</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </main>
    )
}