import { Link } from "react-router";

export default function Menu() {
  return (
    <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/produtos">Produtos</Link></li>
                <li>
                  <Link to="/cadastrar-produto">Cadastrar Produto</Link>
                </li>
            </ul>
        </nav>
  )
}
