document.addEventListener(
  "DOMContentLoaded",
  () => {
    function showMyTeamOfPokemon() {
      let myTeamContainer = document.getElementById("container-of-myteam");
      myTeamContainer.innerHTML = "";
      axios.get("http://localhost:3000/myteam/add").then(myPokemons => {
        console.log(myPokemons.data);
        myPokemons.data.team.forEach(myPokemons => {

          let eachOfThePokemonOfMyTeam = document.createElement("div");
          eachOfThePokemonOfMyTeam.innerHTML = `
           <img class="myTeamImages" src="${myPokemons.pokemonImage}">
           <h4>${myPokemons.nickName}</h4>
           <p>${myPokemons.abilities}</p>
           <p>${myPokemons.move1}</p>
           <p>${myPokemons.move2}</p>
           <p>${myPokemons.move3}</p>
           <p>${myPokemons.move4}</p>
           <p>${myPokemons.abilities}</p>           
           <button href="/myteam/delete/${myPokemons._id}" class="waves-effect waves-light btn">Delete</button>
           <button href= "/myteam/edit/${
             myPokemons._id
           }" class="waves-effect waves-light btn">Edit</button>
           `;

          myTeamContainer.appendChild(eachOfThePokemonOfMyTeam);
          eachOfThePokemonOfMyTeam.classList.add("pokemon-container");
        });
      });
    }
    $(".modal").modal();
    document.getElementById('submit-new-pokemon').onclick = ()=>{
      showMyTeamOfPokemon();
    }

    showMyTeamOfPokemon();
    
  


  },
  false
);
