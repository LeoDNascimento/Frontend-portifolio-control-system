import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response=> {
      setRepositories(response.data);
    });
    }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: "Repositorie Nodejs React",
      url: "https://github.com/default",
      techs: ["Node.js", "React"],
  });
  const repositorie = response.data;
      setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    repositories.splice(repositories
      .findIndex((repo) => repo.id === id), 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
          ))}
      </ul>


      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
