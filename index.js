const endpointPersonajes = "https://thronesapi.com/api/v2/Characters";
const containerCards = document.querySelector(".cards");
const containerModal = document.querySelector(".container-modal");
const containerCasas = document.querySelectorAll(".container-houses");
const botonHouses = document.querySelector("#houses");
const botonCharacters = document.querySelectorAll(".boton-characters");
const formBuscador = document.querySelectorAll(".form-buscador");
const inputBuscador = document.querySelectorAll(".input-buscador");
const body = document.querySelector("body");
const botonAbrirNav = document.querySelector(".boton-abrir-nav");
const botonCerrarNav = document.querySelector(".boton-cerrar-nav");
const iconoMobile = document.querySelector(".fas");
const navMobile = document.querySelector(".lista-nav-mobile");
const paginationButtons = document.querySelector(".pagination-buttons");

let resultado = [];
let paginaActual = 1;
let cardsPorPagina = 10;

const pedirInfo = () => {
  fetch(endpointPersonajes)
    .then((res) => res.json())
    .then((data) => {
      resultado = data;
      iniciar();
    });
};

const iniciar = () => {
  abrirMenuMobile();
  cerrarMenuMobile();

  mostrarTodosPersonajes();

  crearListaCasas();
  searchForms();
  crearBotonesPaginacion();

  crearTarjeta(
    resultado.slice(
      (paginaActual - 1) * cardsPorPagina,
      (paginaActual - 1) * cardsPorPagina + cardsPorPagina
    )
  );
};

const crearTarjeta = (data) => {
  const mostrarEnHtml = data.reduce((acc, curr) => {
    return (
      acc +
      `<div class="card" data-id="${curr.id}">
            <div class="container-img">
                <img id="img-personaje" class="centered-img" src="${curr.imageUrl}" alt="">
            </div>
            <div class="info-personaje">
                <p id="nombre-personaje">${curr.firstName} ${curr.lastName}</p>
            </div>
        </div>
        `
    );
  }, "");

  containerCards.innerHTML = mostrarEnHtml;
  asignarClicksACards();
};

const mostrarInfoPersonajes = (id) => {
  fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
    .then((res) => res.json())
    .then((data) => {
      abrirModal(data);
    });
};

const asignarClicksACards = () => {
  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = () => {
      body.style.position = "relative";
      const idPersonajes = cards[i].dataset.id;
      mostrarInfoPersonajes(idPersonajes);
    };
  }
};

const obtenerLogoFamilia = (familia) => {
  const logo = arrayFamilias.find((elemento) => {
    return elemento.name == familia;
  });

  return `./imgs/${logo.img}`;
};

const crearModal = (data) => {
  return `<div class="modal" data-id="${data.id}">
              <div class="container-boton-modal">
                  <button class="cerrar-modal">X</button>
              </div>
              <div class="info-personaje">
                  <div class="container-img-modal">
                      <img class="img-modal" src="${data.imageUrl}" alt="">
                  </div>
                  <div class="info-principal">
                      <img src="${obtenerLogoFamilia(data.family)}">
                      <div class="datos">
                          <p id="nombre-personaje">Fullname: ${
                            data.firstName
                          } ${data.lastName}</p>
                          <p id="nombre-personaje">Title: ${data.title} </p>
                          <p id="nombre-personaje">Family: ${data.family} </p>
                      </div>
                  </div>
              </div>
          </div>`;
};

const abrirModal = (data) => {
  containerModal.innerHTML = crearModal(data);
  containerModal.classList.remove("ocultar");
  containerModal.classList.add("mostrar-modal");
  asignarClickCerrarModal();
};

const asignarClickCerrarModal = () => {
  const cerrarModal = document.querySelector(".cerrar-modal");

  cerrarModal.onclick = () => {
    containerModal.innerHTML = "";
    containerModal.classList.add("ocultar");
    containerModal.classList.remove("mostrar-modal");
    body.style.position = "inherit";
  };
};

const crearListaCasas = () => {
  const mostrarEnHtml = arrayFamilias.reduce((acc, curr) => {
    return (
      acc +
      `<li>
          <button class="casa" data-id="${curr.name}">${curr.name}</button>
       </li>
      `
    );
  }, "");

  for (let i = 0; i < containerCasas.length; i++) {
    containerCasas[i].innerHTML = mostrarEnHtml;
  }
  asignarClicksCasas();
};

const asignarClicksCasas = () => {
  const casas = document.querySelectorAll(".casa");

  for (let i = 0; i < casas.length; i++) {
    casas[i].onclick = () => {
      const idCasa = casas[i].dataset.id;
      filtrarPorCasa(idCasa);
    };
  }
};

const filtrarPorCasa = (casa) => {
  const arrayCasa = resultado.filter((personaje) => {
    return personaje.family == casa;
  });
  crearTarjeta(arrayCasa);
};

const buscarPersonaje = (busqueda) => {
  const resultadoBusqueda = resultado.filter((personaje) => {
    return personaje.fullName.toLowerCase().includes(busqueda.toLowerCase());
  });

  crearTarjeta(resultadoBusqueda);
};

const abrirMenuMobile = () => {
  botonAbrirNav.onclick = (e) => {
    e.preventDefault();
    botonAbrirNav.classList.add("ocultar");
    botonCerrarNav.classList.remove("ocultar");
    navMobile.classList.add("mostrar-nav-mobile");
  };
};

const cerrarMenuMobile = () => {
  botonCerrarNav.onclick = (e) => {
    e.preventDefault();
    botonAbrirNav.classList.remove("ocultar");
    botonCerrarNav.classList.add("ocultar");
    navMobile.classList.remove("mostrar-nav-mobile");
  };
};

const searchForms = () => {
  for (let i = 0; i < formBuscador.length; i++) {
    formBuscador[i].onsubmit = (e) => {
      e.preventDefault();
      buscarPersonaje(inputBuscador[i].value);
      inputBuscador[i].value = "";
    };
  }
};

const mostrarTodosPersonajes = () => {
  for (let i = 0; i < botonCharacters.length; i++) {
    botonCharacters[i].onclick = () => {
      crearTarjeta(resultado);
    };
  }
};

const crearBotonesPaginacion = () => {
  paginationButtons.innerHTML = `
    <div class="container-buttons">
       <button class="prev-button"><i class="fa-solid fa-angle-left"></i> Prev </button>
       <button class="next-button"> Next <i class="fa-solid fa-angle-right"></i></button>
    </div>`;

  cambiarPagina();
};

const cambiarPagina = () => {
  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");
  let ultimaPagina = Math.ceil(resultado.length / cardsPorPagina);

  prevButton.onclick = () => {
    paginaActual--;
    iniciar();
  };

  nextButton.onclick = () => {
    paginaActual++;
    iniciar();
  };

  nextButton.disabled = paginaActual === ultimaPagina;
  prevButton.disabled = paginaActual === 1;
};

pedirInfo();
