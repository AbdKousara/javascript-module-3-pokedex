let pokemonsNum = 20;

let pokemonName = document.querySelector('.search_field');
let searchBtn = document.querySelector('.search_btn');

searchBtn.addEventListener('click', async ()=>{
  try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${
        typeof pokemonName === 'string' ?
        pokemonName.value : pokemonName.value.toLowerCase() 
      }`);
      const pokemon = await res.json(); 
      document.querySelector('.poke_cards').innerHTML = "";
      createPokemonCard(pokemon)

  }catch (error) {
    console.error(error);    
  }
});

for(let i = 1; i <= pokemonsNum; i++){
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((data) => data.json())
        .then((data) => createPokemonCard(data))
        .catch((error) => console.log(error))
}

function createPokemonCard(pokemon){
    let cardElement = document.createElement('div');
    let pokeID =  (pokemon.id + 1000).toString().slice(1);
    let pokeName = pokemon.name[0].toUpperCase()+pokemon.name.slice(1)
    let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
    cardElement.classList.add('card');
    cardElement.innerHTML=`<div class="card_head">
         <img id="poke_img" src="${imgSrc}" alt="pokemon img">
         </div>
         <div class="card_body">
            <span>#${pokeID}</span>
            <h4>${pokeName}</h4>
            ${pokemon.types.length == 2 ?
             `<p class="pill">${pokemon.types[0].type.name}</p> 
              <p class="pill">${pokemon.types[1].type.name}</p>` 
            : 
             `<p class="pill">${pokemon.types[0].type.name}</p>`}
         </div>`;
    document.querySelector('.poke_cards').appendChild(cardElement);
}
