// class Pokemon {
//   constructor(nome, immagine) {
//     this.nome = nome;
//     this.immagine = immagine;
//   }
// }

// class Pokedex {
//   constructor() {
//     this.allPokemon = [];
//   }
//   fetchPokemonName = async () => {
//     let httpPokemon = await fetch("https://pokeapi.co/api/v2/pokemon");
//     let allPokemon = await httpPokemon.json();

//     for (let pokemon of allPokemon.results) {
//       let pokemonName = new Pokemon(pokemon.name);
//       this.allPokemon.push(pokemonName);
//     }
//   };
//   fetchPokemonImage = async () => {
//     let httpPokemonImage = await fetch("https://pokeapi.co/api/v2/pokemon");
//     let pokemonImage = await httpPokemonImage.json();
//     console.log(pokemonImage);
//   };
// }
// let pokedex = new Pokedex();
// pokedex.fetchPokemonName();
// fetchPokemonImage();

class Pokemon {
  constructor(name, abilities, img, imgShiny) {
    this.name = name;
    this.abilities = abilities;
    this.img = img;
    this.imgShiny = imgShiny;
  }
}
class Pokedex {
  constructor() {
    this.allPokemon = [];
  }
  getAll = async () => {
    try {
      let res = await fetch("https://pokeapi.co/api/v2/pokemon");
      let pkmn = await res.json();
      // ho la fetch dei pokemon

      for (const singlePokemon of pkmn.rusults) {
        let resDet = await fetch(singlePokemon.url);
        let single = await resDet.json();

        let nuovoPokemon = new Pokemon(single.name, single.abilities, single.sprites.other.home.front_default, single.sprites.other.home.front_shiny);
        // dopo aver fatto terminare il then precedente posso farne un altro e qui vado a prendermi i valori del singolo pokemon che andranno inseriti nell'instanza
        this.allPokemon.push(nuovoPokemon);
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderAll = async () => {
    let row = document.querySelector(".container .row");
    console.log(this.allPokemon);
    let cards = this.allPokemon.map((pkmn) => {
      return `<div class="col col-3">
         <div class="card">
         <img src=${pkmn.img} class='card-img-top' alt= pokemon image ${pkmn.name}>
            <div class'card-body'>
                <h5 class='card-title'>${pkmn.name}</h5>
                <div class="abilities">
                ${pkmn.abilities}.map(ab) => {
return <div>${ab.ability.name}</div>
                })}
                 </div>
             </div>
          </div>
           </div>`;
    });
  };
}

window.onload = async () => {
  let pokedex = new Pokedex();
  await pokedex.getAll();
  await pokedex.renderAll();
};
