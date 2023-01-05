let pokemonRepository = (function () {
  let e = [],
    t = ["name", "detailsUrl"];
  function n() {
    return e;
  }
  function i(n) {
    var i;
    if (
      "object" == typeof n &&
      ((i = n),
      Object.keys(i).forEach((e) => {
        if (-1 === t.indexOf(e)) return !1;
      }),
      1)
    )
      return e.push(n);
  }
  function a(e) {
    return (
      l(),
      fetch(e.detailsUrl)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          s(), o(e);
        })
        .catch(function (e) {
          s(), console.error(e);
        })
    );
  }
  function o(e) {
    let t = $(".modal-body"),
      n = $(".modal-title");
    n.empty(), t.empty();
    let i = $("<h1>" + e.name + "</h1>"),
      a = `<img src=${e.sprites.front_default} />`,
      o = `<img src=${e.sprites.back_default} />`,
      l = $("<p>height: " + e.height + "</p>"),
      s = $("<p>weight: " + e.weight + "</p>"),
      d = $(
        "<p>types: " +
          (e.types || []).map((e) => e.type && e.type.name).join(", ") +
          "</p>"
      ),
      r = $(
        "<p>abilities: " +
          (e.abilities || [])
            .map((e) => e.ability && e.ability.name)
            .join(", ") +
          "</p>"
      );
    n.append(i),
      t.append(a),
      t.append(o),
      t.append(l),
      t.append(s),
      t.append(d),
      t.append(r);
  }
  function l() {
    let e = document.querySelector(".list-container"),
      t = document.createElement("div");
    return (
      (t.innerText = "Loading"),
      t.classList.add("loading-message"),
      e.prepend(t),
      t
    );
  }
  function s() {
    document.querySelector(".loading-message").classList.add("hidden");
  }
  return {
    getAll: n,
    add: i,
    addListItem: function e(t) {
      let n = document.querySelector(".list-container"),
        i = document.createElement("div"),
        o = document.createElement("div"),
        l = document.createElement("button");
      (o.innerText = `${t.name}`),
        l.classList.add("btn"),
        l.classList.add("list-button"),
        l.classList.add("col-12"),
        l.classList.add("col-md-4"),
        l.setAttribute("data-toggle", "modal"),
        l.setAttribute("data-target", "#exampleModal"),
        i.classList.add("card"),
        o.classList.add("card-body"),
        i.appendChild(o),
        l.appendChild(i),
        n.appendChild(l),
        l.addEventListener("click", function (e) {
          a(t);
        });
    },
    loadList: function e() {
      return (
        l(),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=90")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            s(),
              e.results.forEach(function (e) {
                i({ name: e.name, detailsUrl: e.url });
              });
          })
          .catch(function (e) {
            s(), console.error(e);
          })
      );
    },
    loadDetails: a,
    showDetails: o,
    showLoadingMessage: l,
    hideLoadingMessage: s,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
}),
  (function () {
    let e = window.scrollY,
      t = document.querySelector(".scroll-dialogue"),
      n = document.querySelector(".dialogue-link"),
      i = document.createElement("h5");
    i.innerText = "Scroll to top";
    (document.createElement("button").innerText = "Close"),
      n.append(i),
      (window.onscroll = function (n) {
        e < window.scrollY
          ? t.classList.add("hidden")
          : t.classList.remove("hidden"),
          (e = window.scrollY);
      });
  })();
