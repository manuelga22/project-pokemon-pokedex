document.addEventListener(
  "DOMContentLoaded",
  () => {
    async function displayAllPokemon(route) {
      let pokemons = await getAllPokemon(route)
      console.log(pokemons);
      setTimeout(function() {
        let containerOfPokemon = document.getElementById(
          "container-of-pokemon"
        );
        containerOfPokemon.innerHTML = "";

        pokemons.arrPokemon.forEach(poke => {
          let newDiv = document.createElement("div");
          newDiv.innerHTML = `
          <img src=${poke.info.sprites.front_default}>
          <a class="waves-effect waves-light btn poke-btn modal-trigger" href="#pokemon${
            poke.info.id
          }-modal">${poke.name}</a>
          <div class="modal" id="pokemon${poke.info.id}-modal">
          <div class="modal-content">
          <h4>${poke.info.species.name}</h4>
          <img src=${poke.info.sprites.front_default}>

          <div id="pokemon-type-${poke.info.id}">
          <h5>types: </h5>
          <p>${poke.info.types[0].type.name}</p>
          </div>
          <div>
         <h5>Weight:</h5>
          <p> ${poke.info.weight} pounds</p>
         <h5>Height:</h5>
          <p> ${poke.info.height} feet</p>
          </div>
          <div id = "abilities-${poke.info.id}">
           <h5>Abilities</h5>
          </div>
          <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Back</a>
          </div>

          </div>
        `;
         
          newDiv.classList.add("pokemon-container");
          containerOfPokemon.appendChild(newDiv);
          if(poke.info.types.length>1){
            let node = document.createElement('p');
            let textnode = document.createTextNode(`${poke.info.types[1].type.name}`)
            node.appendChild(textnode);
            document.getElementById(`pokemon-type-${poke.info.id}`).appendChild(node);
          }
         if(poke.info.abilities.length>1){
          let node2 = document.createElement('p');
          let textnode2 = document.createTextNode(`${poke.info.abilities[1].ability.name}`)
          node2.appendChild(textnode2);
          document.getElementById(`abilities-${poke.info.id}`).appendChild(node2);
         }
          document.getElementById("nextbtn").onclick = () => {
            displayAllPokemon(pokemons.next);
          };
          document.getElementById("backbtn").onclick = () => {
            if (!pokemons.previous) {
              return;
            } else {
              displayAllPokemon(pokemons.previous);
            }
          };

          $(`#pokemon${poke.info.id}-modal`).modal();
        });
      }, 800);
    }
    async function getAllPokemon(urlToFetch) {
      try {
        // const arrPokemons = []
        const res = await axios.get(urlToFetch);
        const pokemons = res.data.results;

        // return pokemons
        const arrPokemon = [];

        pokemons.forEach(async pokemon => {
          const obj = {
            name: pokemon.name
          };

          const pokemonInfo = await axios.get(pokemon.url);
          obj.info = pokemonInfo.data;

          arrPokemon.push(obj);
        });

        return { arrPokemon, next: res.data.next, previous: res.data.previous };
      } catch (err) {
        console.log(err);
        return err;
      }
    }

    $(".modal").modal();
    displayAllPokemon("https://pokeapi.co/api/v2/pokemon");
  },
  false
);
