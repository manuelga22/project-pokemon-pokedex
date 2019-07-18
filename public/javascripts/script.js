document.addEventListener(
  "DOMContentLoaded",
  () => {
    function showMyTeamOfPokemon() {
      let myTeamContainer = document.getElementById("container-of-myteam");
      myTeamContainer.innerHTML = "";
      axios.get("http://localhost:3000/myteam/add").then(myPokemons => {
        console.log("pokemon data",myPokemons.data);
          
          myPokemons.data.team.forEach(myPokemons => {
            console.log(myPokemons)
            console.log(myPokemons.team) // loop through array to delete this thing
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
             <form action = "/myteam/delete/${myPokemons._id}" method="POST">       
             <button  class="waves-effect waves-light btn" >Delete</button>
             </form>
            
             <a href= "#edit${myPokemons._id}" class="waves-effect waves-light btn modal-trigger">Edit</a>

             <div id="edit${myPokemons._id}" class="modal">
             <form action="/myteam/update/${myPokemons._id}" method="POST">
             <h3>Edit a Pokemon</h3>
             <div class="modal-content">
               <label for="pokemonName"></label>
             <input name="pokemonName" placeholder="Name" value="${myPokemons.nickName}">        
             <label for="pokemonImage"></label>
             <input name="pokemonImage" type="file" placeholder="image" value=${myPokemons.pokemonImage}>         
             <label for="pokemon-types"></label>
             <input name="pokemonTypes" placeholder="type" value=${myPokemons.pokemonType}>        
             <label for="pokemonMoves1"></label>
             <input name="pokemonMoves1" placeholder="enter the first move of the pokemon" value=${myPokemons.move1}>           
             <label for="pokemonMoves2"></label>
             <input name="pokemonMoves2" placeholder="enter the second move of the pokemon" value=${myPokemons.move2}> 
             <label for="pokemonMoves3"></label>
             <input name="pokemonMoves3" placeholder="enter the third move of the pokemon"  value=${myPokemons.move3}> 
             <label for="pokemonMoves4"></label>
             <input name="pokemonMoves4" placeholder="enter the fourth move of the pokemon"  value=${myPokemons.move4}>  
             <label for="pokemon-abilities"></label>
             <input name="pokemonAbilities" placeholder="enter abilities of the pokemon" value = ${myPokemons.abilities}>
             </div>
             <div class="modal-footer">
               <button  class="modal-close waves-effect waves-green btn-flat">Update</button>
             </div>
            
             </form>
             </div>
             `;
            
            myTeamContainer.appendChild(eachOfThePokemonOfMyTeam);
            eachOfThePokemonOfMyTeam.classList.add("pokemon-container");
            $(`#edit${myPokemons._id}`).modal();
        
          })
      });
    }
    showMyTeamOfPokemon();
   
    document.getElementById('submit-new-pokemon').onclick = ()=>{
      showMyTeamOfPokemon();
    }
    

   
    
  


  },
  false
);
