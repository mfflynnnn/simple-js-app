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

  return {
    getAll: getAll,
    add: add,
    getByName: getByName,
  };
})();

//Assigning the data from the repository to a new variable accessible outside of the IIFE.
let newPokemonData = pokemonRepository.getAll();

//Looping through the array of objects that contain the pokemon data and printing it to the page.
//Using a conditional to notate on the page which pokemon is the largest.
newPokemonData.forEach(function (pokemon) {
  //Adding pokemon buttons to the DOM via the ul in index.html.
  let pokemonUl = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = `${pokemon.name}`;
  button.classList.add("list-button");

  var elem = document.getElementById("list-button");
  console.log(elem, "This is the button text");

  listItem.appendChild(button);
  pokemonUl.appendChild(listItem);
});
