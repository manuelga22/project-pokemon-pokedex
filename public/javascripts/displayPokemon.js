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
          <p>types: </p>
          <p>${poke.info.types[0].type.name}</p>
          </div>
          <div>
          <p>weight: ${poke.info.weight} pounds</p>
          <p>height: ${poke.info.height} feet</p>
          </div>
          <div id = "ablities-${poke.info.id}">
          
          </div>
          <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
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
      }, 300);
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
