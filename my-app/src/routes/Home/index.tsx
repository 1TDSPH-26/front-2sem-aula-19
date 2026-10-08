import { useEffect, useState } from "react";

export default function Home() {
  document.title = "Home";

  const [clicado, setClicado] = useState<number>(0);

  let chamadas: number = 0;

  useEffect(() => {
    console.log("Um milhão de linhas sendo carregadas:", chamadas);
    chamadas++;
  }, [clicado]);

  type TipoUsuarioGit = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };

  const [usuarios, setUsuarios] = useState<TipoUsuarioGit[]>([]);

 useEffect(()=>{

  async function loadingData() {
    try{
      const response = await fetch("https://api.github.com/users");
      
      if(!response.ok){
          throw new Error("A listagem dos usuários falhou!");
        }

        const data:TipoUsuarioGit[] = await response.json();

        setUsuarios(data);

    }catch(error){
      console.log(error);
    }
  }

  //loadingData();

 },[]);


  return (
    <main>
      <h2>Home</h2>
      <div>
        <p>Valor do STATE : {clicado}</p>
        <button onClick={() => setClicado(clicado + 1)}>
          ALTERAR VALOR = {clicado}
        </button>
      </div>
      <div>
        <ul>
          {usuarios.map( (u,indice)=>(
            //<link rel="" href={u.html_url} />
            <li key={indice}>{u.id} - {u.login} - 
              <a href={u.html_url}><img src={u.avatar_url} alt={u.login} /></a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
