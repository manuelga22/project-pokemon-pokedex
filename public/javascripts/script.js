document.addEventListener(
  "DOMContentLoaded",
  () => {
    function showMyTeamOfPokemon() {
      let baseUrl = process.env.MONGODB_URI
      let myTeamContainer = document.getElementById("container-of-myteam");
      myTeamContainer.innerHTML = "";
      axios.get('/myteam/add', {useNewUrlParser: true}).then(myPokemons => { 
        console.log("pokemon data", myPokemons.data);

        myPokemons.data.team.forEach(myPokemons => {
          console.log(myPokemons);
          console.log(myPokemons.team); // loop through array to delete this thing
          let eachOfThePokemonOfMyTeam = document.createElement("div");

          eachOfThePokemonOfMyTeam.innerHTML = `
            
             
    <div class="row card-btn">
    <div class="col s12 m7 card-width">
      <div class="card">
        <div class="card-image">
        <img class="myTeamImages" src="${myPokemons.pokemonImage}">
        <span class="card-title card-header center-align">${myPokemons.nickName}</span>
      </div>
      <div class="card-content card-width center-align">
      <ul class="collapsible collapsible-size">
      <li class="collapsible-size2">
      <h4 class="collapsible-header collapsible-title center-align"><b>Details</b></h4>
       <div class = "collapsible-body">
         <p><b>type:</b>${myPokemons.pokemonType}</p>
         <p><b>Attacks:</b></p>
         <p>${myPokemons.move1}</p>
         <p>${myPokemons.move2}</p>
         <p>${myPokemons.move3}</p>
         <p>${myPokemons.move4}</p>
         <p><b>ability:</b>${myPokemons.abilities}</p> 
       </div>
      </li>
      </ul>

      <div class="btn-delete-edit">
      <button href= "#edit${myPokemons._id}" class="waves-effect waves-light btn modal-trigger">Edit</button>
      <form action="/myteam/delete/${myPokemons._id}" method="POST">       
      <button class="waves-effect waves-light btn">Delete</button>
      </form>
     
      </div>

      </div>
      </div>
    </div>

  </div>

 
             <div id="edit${myPokemons._id}" class="modal">
             <form action="/myteam/update/${
               myPokemons._id
             }" method="POST" enctype="multipart/form-data">
             <h3>Edit a Pokemon</h3>
             <div class="modal-content">
               <label for="nickName"></label>
             <input name="nickName" placeholder="Name" value="${
               myPokemons.nickName
             }">        
             <label for="pokemonImage"></label>
             <input name="pokemonImage" type="file" placeholder="image" value="">   

             <label for="pokemonType"></label>
             <input name="pokemonType" placeholder="type" value="${
               myPokemons.pokemonType
             }">        
             <label for="move1"></label>
             <input name="move1" placeholder="first move of the pokemon" value=${
               myPokemons.move1
             }>           
             <label for="move2"></label>
             <input name="move2" placeholder="second move of the pokemon" value=${
               myPokemons.move2
             }> 
             <label for="move3"></label>
             <input name="move3" placeholder=" third move of the pokemon"  value=${
               myPokemons.move3
             }> 
             <label for="move4"></label>
             <input name="move4" placeholder=" fourth move of the pokemon"  value=${
               myPokemons.move4
             }>  
             <label for="abilities"></label>
             <input name="abilities" placeholder=" abilities " value = ${
               myPokemons.abilities
             }>
             </div>
             <div class="modal-footer">
               <button  class="modal-close waves-effect waves-green btn-flat">Update</button>
             </div>
            
             </form>
             </div>
             `;

          myTeamContainer.appendChild(eachOfThePokemonOfMyTeam);
          eachOfThePokemonOfMyTeam.classList.add("mypokemon-container");
          $(`#edit${myPokemons._id}`).modal();
          $(".collapsible").collapsible();
        });
      });
    }
    showMyTeamOfPokemon();

    document.getElementById("submit-new-pokemon").onclick = () => {
      showMyTeamOfPokemon();
    };

    $("#modal1").modal();
  },
  false
);
