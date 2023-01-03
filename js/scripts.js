//Primary repository holding pokemon array and functions to display it.
let pokemonRepository = (function () {
  //Array of pokemon characters.
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

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
    let pokemonUl = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.querySelector("button");

    button.setAttribute("data-bs-target", "#pokeModal");
    button.setAttribute("data-bs-toggle", "modal");
    button.innerText = `${pokemon.name}`;
    button.classList.add("list-button");
    button.classList.add("btn");
    listItem.classList.add("group-list-item");
    listItem.appendChild(button);
    pokemonUl.appendChild(listItem);
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
        console.log(details, "DETAILS");
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        console.log(item.imageUrl);
        //populateModal(details);
        //console.log((populateModal, "populateModal"));
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //Shows a "Loading" message while waiting for data from the API.
  function showLoadingMessage() {
    let container = document.querySelector(".container");
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

  // function populateModal() {
  //   let pokeModal = document.querySelector("#pokeModal");
  //   pokeModal.click(function (item) {
  //     let pokeModalLabel = document.querySelector("#pokeModalLabel");
  //     pokeModalLabel.innerText = `${item.height}`;
  //   });
  // }

  return {
    getAll: getAll,
    add: add,
    //getByName: getByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
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
