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

  //Function that returns the whole pokemonList array.
  function getAll() {
    return pokemonList;
  }

  //Function that enables adding data to pokemonList array.
  function add(character) {
    return pokemonList.push(character);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

//Looping through the array of objects that contain the pokemon data and printing it to the page.
//Using a conditional to notate on the page which pokemon is the largest.
pokemonList.forEach(function (character) {
  if (character.height > 1) {
    let largeAlert = "- Wow, that's big!";
    document.write(
      `<ul><li>${character.name} (height: ${character.height}m) ${largeAlert}</li></ul>`
    );
  } else {
    document.write(
      `<ul><li>${character.name} (height: ${character.height}m)</li></ul>`
    );
  }
});
