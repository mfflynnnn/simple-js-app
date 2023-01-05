//Primary repository holding pokemon array and functions to display it.
let pokemonRepository = (function () {
  //Array of pokemon characters.
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=90";

  //Array of expected keys
  let expectedKeys = ["name", "detailsUrl"];

  // //Function that filters data based on passed in criteria.
  // function getByName(criteria) {
  //   let result = pokemonList.filter((filterName) => filterName === criteria);
  //   return result[0] ? result[0] : {};
  // }

  //Function that returns the whole pokemonList array.
  function getAll() {
    return pokemonList;
  }

  //Function that enables adding data to pokemonList array.
  function add(pokemon) {
    if (typeof pokemon === "object" && verifyKeys(pokemon)) {
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
  //Creating an eventListener to the click of the buttons.
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-container");
    let pokeCard = document.createElement("div");
    let pokeCardBody = document.createElement("div");
    let button = document.createElement("button");

    pokeCardBody.innerText = `${pokemon.name}`;
    button.classList.add("btn");
    button.classList.add("list-button");
    button.classList.add("col-12");
    button.classList.add("col-md-4");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    pokeCard.classList.add("card");
    pokeCardBody.classList.add("card-body");
    pokeCard.appendChild(pokeCardBody);
    button.appendChild(pokeCard);
    pokemonList.appendChild(button);
    button.addEventListener("click", function (event) {
      loadDetails(pokemon);
    });
  }

  //Fetches the full list of data from the API.
  function loadList() {
    showLoadingMessage();

    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //Fetches just the item details from the API. This gets called onClick.
  function loadDetails(item) {
    showLoadingMessage();

    let url = item.detailsUrl;

    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        showDetails(details);
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //Showing the pokemon details once the modal is clicked open.
  function showDetails(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageFrontSrc = item.sprites.front_default;
    let imageElementFront = `<img src=${imageFrontSrc} />`;
    let imageBackSrc = item.sprites.back_default;
    let imageElementBack = `<img src=${imageBackSrc} />`;
    let heightElement = $("<p>" + "height: " + item.height + "</p>");
    let weightElement = $("<p>" + "weight: " + item.weight + "</p>");
    let typesValue = (item.types || [])
      .map((item) => item.type && item.type.name)
      .join(", ");
    let typesElement = $("<p>" + "types: " + typesValue + "</p>");
    let abilitiesValue = (item.abilities || [])
      .map((item) => item.ability && item.ability.name)
      .join(", ");
    let abilitiesElement = $("<p>" + "abilities: " + abilitiesValue + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // loadDetails(item).then(function () {
  //   showDetails(item.name, item.imageUrl, `Height: ${item.height}`);
  // });

  //Shows a "Loading" message while waiting for data from the API.
  function showLoadingMessage() {
    let container = document.querySelector(".list-container");
    let div = document.createElement("div");
    div.innerText = "Loading";
    div.classList.add("loading-message");
    container.prepend(div);
    return div;
  }

  //Removes the "Loading" message once the data from the API has loaded.
  function hideLoadingMessage() {
    let element = document.querySelector(".loading-message");
    element.classList.add("hidden");
  }

  return {
    getAll: getAll,
    add: add,
    //getByName: getByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

//Loading the list from the API, then returning the list and its items.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//A div with a link that redirects user to the top of the page. The div
//only shows on scroll up.
(function () {
  let oldScrollY = window.scrollY;
  //let scrollTop = window.pageYOffset;
  let dialogueContainer = document.querySelector(".scroll-dialogue");
  let dialogueLink = document.querySelector(".dialogue-link");

  let titleElement = document.createElement("h5");
  titleElement.innerText = "Scroll to top";

  let closeButtonElement = document.createElement("button");
  closeButtonElement.innerText = "Close";

  dialogueLink.append(titleElement);

  window.onscroll = function (e) {
    if (oldScrollY < window.scrollY) {
      //hide element on downscroll
      dialogueContainer.classList.add("hidden");
    } else {
      //make element visible on upscroll
      dialogueContainer.classList.remove("hidden");
    }
    oldScrollY = window.scrollY;
  };
})();
