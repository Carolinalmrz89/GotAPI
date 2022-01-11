const endpointPersonajes = "https://thronesapi.com/api/v2/Characters"
const containerCards = document.querySelector(".cards");

const pedirInfo = () =>{
    fetch(endpointPersonajes)
    .then((res) => res.json())
    .then((data) =>{
        crearTarjeta(data);
    })
}

pedirInfo();


const crearTarjeta = (data) =>{

    const mostrarEnHtml = data.reduce((acc, curr) =>{

        return acc + 
        `<div class="card" data-id="${curr.id}">
            <div class="container-img">
                <img id="img-personaje" class="centered-img" src="${curr.imageUrl}" alt="">
            </div>
            <div class="info-personaje">
                <p id="nombre-personaje">${curr.firstName} ${curr.lastName}</p>
            </div>
        </div>
        `
    }, "");

    containerCards.innerHTML = mostrarEnHtml;
};

pedirInfo();