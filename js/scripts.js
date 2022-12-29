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
    let button = document.createElement("button");

    button.innerText = `${pokemon.name}`;
    button.classList.add("list-button");
    listItem.appendChild(button);
    pokemonUl.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  //Logging data from eventListener.
  function showDetails(item) {
    let getModal = (function () {
      function showModal(title, image, text) {
        let modalContainer = document.querySelector("#modal-container");

        //Clear all existing modal content
        modalContainer.innerHTML = "";
        let modal = document.createElement("div");
        modal.classList.add("modal");

        //Add new modal content
        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";

        let titleElement = document.createElement("h1");
        titleElement.innerText = title;

        let contentImage = document.createElement("img");
        contentImage.classList.add("modal-image");
        contentImage.src = image;

        let contentElement = document.createElement("p");
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentImage);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add("is-visible");

        //Exit modal via different escape/close means.
        function hideModal() {
          let modalContainer = document.querySelector("#modal-container");
          modalContainer.classList.remove("is-visible");
        }

        //Exit modal on click of "Close".
        closeButtonElement.addEventListener("click", hideModal);

        //Exit modal on escape key.
        window.addEventListener("keydown", (e) => {
          let modalContainer = document.querySelector("#modal-container");
          if (
            e.key === "Escape" &&
            modalContainer.classList.contains("is-visible")
          ) {
            hideModal();
          }
        });

        //Exit modal on click outside of modal.
        modalContainer.addEventListener("click", (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
      }

      return {
        showModal: showModal,
      };
    })();

    loadDetails(item).then(function () {
      getModal.showModal(item.name, item.imageUrl, `Height: ${item.height}`);
    });
  }

  //Shows a "Loading" message while waiting for data from the API.
  function showLoadingMessage() {
    let container = document.querySelector(".container");
    let div = document.createElement("div");
    div.innerText = "Loading";
    div.classList.add("loading-message");
    container.append(div);
    return div;
  }

  //Removes the "Loading" message once the data from the API has loaded.
  function hideLoadingMessage() {
    let element = document.querySelector(".loading-message");
    element.classList.remove();
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
