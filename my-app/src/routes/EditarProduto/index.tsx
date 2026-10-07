import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { tipoProduto } from "../../types/tipoProduto";



export default function EditarProdutos() {
    document.title = "Editar Produto";

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>();

    const [produto, setProduto] = useState<tipoProduto>({ id: "", nome: "", preco: 0, estoque: 0 });

    
    useEffect(() => {
        const carregarProduto = async () => {

        try {
            
            const response = await fetch(`http://localhost:3001/produtos/${id}`) 

            if (!response.ok) {
                throw new Error(`Erro na recuperação do produto: ${response.status} - ${response.statusText}`);
            }

            const data: tipoProduto = await response.json();
            setProduto(data);

        } catch (error) {
            console.error(error);
        }

        }

        carregarProduto()
    }, []);



    return (
        <main>
            <h2>Editar Produtos</h2>
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
                            <button type="submit">Salvar Alterações</button>
                        </div>
                    </fieldset>
                </form>
            </div>

        </main>
    )
}