let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=90";
  let expectedKeys = ["name", "detailsUrl"];
  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (typeof pokemon === "object" && verifyKeys(pokemon)) {
      return pokemonList.push(pokemon);
    }
  }
  function verifyKeys(obj) {
    Object.keys(obj).forEach((key) => {
      if (expectedKeys.indexOf(key) === -1) {
        return !1;
      }
    });
    return !0;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-container");
    let pokeCard = document.createElement("div");
    let pokeCardBody = document.createElement("div");
    let button = document.createElement("button");
    pokeCardBody.innerText = `${pokemon.name}`;
    button.classList.add(pokemon.name);
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
    button.addEventListener("click", function () {
      loadDetails(pokemon);
    });
  }
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = { name: item.name, detailsUrl: item.url };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }
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
  function showLoadingMessage() {
    let container = document.querySelector(".list-container");
    let div = document.createElement("div");
    div.innerText = "Loading";
    div.classList.add("loading-message");
    container.prepend(div);
    return div;
  }
  function hideLoadingMessage() {
    let element = document.querySelector(".loading-message");
    element.classList.add("hidden");
  }
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
$(function () {
  let pokemonSearch = document.querySelector("#search");
  pokemonSearch.addEventListener("keyup", () => {
    let value = pokemonSearch.value;
    let pokemon = pokemonRepository.getAll();
    pokemon.forEach(function (poke) {
      if (poke.name.indexOf(value)) {
        $(`.${poke.name}`).addClass("hidden");
      } else {
        $(`.${poke.name}`).removeClass("hidden");
      }
    });
  });
});
(function () {
  let oldScrollY = window.scrollY;
  let dialogueContainer = document.querySelector(".scroll-dialogue");
  let dialogueLink = document.querySelector(".dialogue-link");
  let titleElement = document.createElement("h5");
  titleElement.innerText = "Scroll to top";
  let closeButtonElement = document.createElement("button");
  closeButtonElement.innerText = "Close";
  dialogueLink.append(titleElement);
  window.onscroll = function () {
    if (oldScrollY < window.scrollY) {
      dialogueContainer.classList.add("hidden");
    } else {
      dialogueContainer.classList.remove("hidden");
    }
    oldScrollY = window.scrollY;
  };
})();
