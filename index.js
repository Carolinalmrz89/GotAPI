const endpointPersonajes = "https://thronesapi.com/api/v2/Characters";
const containerCards = document.querySelector(".cards");
const containerModal = document.querySelector(".container-modal");
const containerCasas = document.querySelector("#container-houses");
const botonHouses = document.querySelector("#houses");

let resultado = [];

const pedirInfo = () => {
  fetch(endpointPersonajes)
    .then((res) => res.json())
    .then((data) => {
      resultado = data;
      crearTarjeta(resultado);
      crearListaCasas()
    });
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

pedirInfo();

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
      containerCards.classList.add("ocultar");
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
  asignarClickCerrarModal();
};

const asignarClickCerrarModal = () => {
  const cerrarModal = document.querySelector(".cerrar-modal");

  cerrarModal.onclick = () => {
    containerModal.innerHTML = "";
    containerModal.classList.add("ocultar");
    containerCards.classList.remove("ocultar");
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

  containerCasas.classList.add("ocultar");
  containerCasas.innerHTML = mostrarEnHtml;
  mostrarListaCasas();
  asignarClicksCasas();
  ocultarListaCasas();
};

const mostrarListaCasas = () => {
  botonHouses.onmouseover = () => {
    containerCasas.classList.remove("ocultar");
  }
}

const ocultarListaCasas = () => {
  botonHouses.onmouseout = () => {
    containerCasas.classList.add("ocultar");
  }
}

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

pedirInfo();