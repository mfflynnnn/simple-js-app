//Primary repository holding pokemon array and functions to display it.
let pokemonRepository = (function () {
  //Array of pokemon characters.
  let pokemonList = [
    { name: "Squirtle", height: 0.5, types: ["water"], weight: 9 },
    { name: "Pidgey", height: 0.3, types: ["flying", "normal"], weight: 1.8 },
    { name: "Pikachu", height: 0.4, types: ["electric"], weight: 6 },
    {
      name: "Jigglypuff",
      height: 0.5,
      types: ["fairy", "normal"],
      weight: 5.5,
    },
    { name: "Bouffalant", height: 1.6, types: ["normal"], weight: 94.6 },
  ];

  //Array of expected keys
  let expectedKeys = Object.keys(pokemonList[0]);

  //Function that filters data based on passed in criteria.
  function getByName(criteria) {
    let result = pokemonList.filter((filterName) => filterName === criteria);
    return result[0] ? result[0] : {};
  }
  //Function that returns the whole pokemonList array.
  function getAll() {
    return pokemonList;
  }

  //Function that enables adding data to pokemonList array.
  function add(pokemon) {
    if (typeof pokemon === "Object" && verifyKeys(pokemon)) {
      return pokemonList.push(pokemon);
    }
  }

  function verifyKeys(obj) {
    Object.keys(obj).forEach((key) => {
      if (expectedKeys.indexOf(key) === -1) {
        return false;
      }
    });
    return true;
  }

  //Adding pokemon buttons to the DOM via the ul in index.html.
  function addListItem(pokemon) {
    let pokemonUl = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = `${pokemon.name}`;
    button.classList.add("list-button");

    listItem.appendChild(button);
    pokemonUl.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    getByName: getByName,
    addListItem: addListItem,
  };
})();

//Assigning the data from the repository to a new variable accessible outside of the IIFE.
let newPokemonData = pokemonRepository.getAll();

//Looping through the array of objects that contain the pokemon data and printing it to the page.
newPokemonData.forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
