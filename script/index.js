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
  constructor(name, abilities, img, imgShiny, id) {
    this.name = name;
    this.abilities = abilities;
    this.img = img;
    this.imgShiny = imgShiny;
    this.id = id;
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

      for (let singlePokemon of pkmn.results) {
        let resDet = await fetch(singlePokemon.url);
        let single = await resDet.json();
        // ciclo per avere i singoli pokemon dall'array e per ogni pochemon fa la fetch e la conversione in jason
        let nuovoPokemon = new Pokemon(single.name, single.abilities, single.sprites.other.home.front_default, single.sprites.other.home.front_shiny, single.id);
        // dopo aver fatto terminare il then precedente posso farne un altro e qui vado a prendermi i valori del singolo pokemon che andranno inseriti nell'instanza
        this.allPokemon.push(nuovoPokemon);
        //il pokemon creato verra messo nell'array
      }
    } catch (error) {
      console.log(error);
    }
  };
  renderAll = async () => {
    // funzione per mostrare a schermo
    let row = document.querySelector(".container .row");
    // seleziono un contenitore nell'html
    let cards = this.allPokemon.map((pkmn) => {
      //do una funzione con un parametro che sarà il pokemon per ogni carta e creo un array con le carte da stampare, html compreso
      return `<div class="col col-3">
         <div class="card mb-5">
         <img src="${pkmn.img}" class="card-img-top" alt="pokemon image ${pkmn.name}">
            <div class'card-body'>
                <h5 class='card-title'>${pkmn.name}</h5>
                <div class="abilities">
                ${pkmn.abilities
                  .map((ab) => {
                    // uso un altro map perchè l'array delle abilità può avere lunghezza diversa quindi creo una div con 'abilità ogni volta che può
                    return `<div>-${ab.ability.name}</div>`;
                  })
                  .join("")}
                 </div>
                 <a class="button" href=/details.html?id=${pkmn.id}> See details </a>
             </div>
          </div>
           </div>`;
    });
    let cardString = cards.join("");
    row.innerHTML = cardString;
  };
}

window.onload = async () => {
  let pokedex = new Pokedex();
  await pokedex.getAll();
  await pokedex.renderAll();
};
