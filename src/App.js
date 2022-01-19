import Modal from "./Modal";
import "./App.css";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [pokemon, setPokemon] = useState({});

  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  const fetchPokemon = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  };

  const getRandomInt = (min = 1, max = 600) => {
    
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getNext = (id) => {
    return (id = pokemon.id + 1);
  };

  const getBack = (id) => {
    return (id = pokemon.id - 1);
  };

  const showAbilities = () => {
    document.getElementById("abilities").style.display = "block";
    setTimeout(() => {
      document.getElementById("abilities").style.display = "none";
    }, 10000);
  };

  useEffect(() => {
    console.log({ pokemon });
  }, [pokemon]);


  return (
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          <img
            src={
              pokemon?.sprites?.front_default ??
              "https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png"
            }
            className="poke-image"
            alt="logo"
          />
          <img
            src={
              pokemon?.sprites?.back_default ??
              "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png"
            }
            className="poke-image"
            alt="logo"
          />
        </div>
        <p>Id: {pokemon.id ?? "No pokemon selected"}</p>
        <p>Name: {pokemon.name ?? "No pokemon selected"}</p>
        {pokemon.id ? <><button
          className="hiddenAbilities btn btn-outline-primary"
          onClick={(showAbilities, toggle)}
        >
          Abilities
        </button><br /><br /></> : <p></p>}
        <div id="abilities">
          <Modal active={active} toggle={toggle}>
            <h3 className="TextAbilitiesTitle">Abilities of {pokemon.name}</h3>
            <br />
            {JSON.stringify(pokemon.abilities)}
          </Modal>
        </div>
        <div className="flex-container">
          
          {pokemon.id ? <><button
            className="button"
            onClick={() => fetchPokemon(getBack())}
          >
            Back
          </button> </> : 
          <button
          className="button"
          onClick={() => fetchPokemon(600)}
        >
          Back
        </button> 
          }
          
          <button
            className="button"
            onClick={() => fetchPokemon(getRandomInt())}
          >
            Random
          </button>

          {pokemon.id ? <><button
            className="button"
            onClick={() => fetchPokemon(getNext())}
          >
            Next
          </button> </> : <button
            className="button"
            onClick={() => fetchPokemon(1)}
          >
            Next
          </button>}
        </div>
      </header>
    </div>
  );
}

export default App;
