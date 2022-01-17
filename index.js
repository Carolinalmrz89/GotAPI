const endpointPersonajes = "https://thronesapi.com/api/v2/Characters";
const containerCards = document.querySelector(".cards");

const pedirInfo = () => {
  fetch(endpointPersonajes)
    .then((res) => res.json())
    .then((data) => {
      crearTarjeta(data);
    });
};

pedirInfo();

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
      console.log(data);
    });
};

const asignarClicksACards = () => {
  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = () => {
      const idPersonajes = cards[i].dataset.id;
      mostrarInfoPersonajes(idPersonajes);
      console.log(idPersonajes);
    };
  }
};

const arrayFamilias = [
  {
    name: "House Targaryen",
    img: "targaryen_logo.png",
  },
  {
    name: "House Stark",
    img: "stark_logo.png",
  },
];

const obtenerLogoFamilia = (familia) => {
  const logo = arrayFamilias.find((elemento) => {
    return elemento.name == familia;
  });

  return `./imgs/${logo.img}`;
};

const crearModal = (data) => {
  return `<div class="modal" data-id="${data.id}">
              <div class="container-boton-modal">
                  <button class="abrir-cerrar-modal">Cerrar</button>
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
