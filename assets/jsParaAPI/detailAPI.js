const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const div = document.querySelector(".card-detail")

const traerInfo = async () => {
    try {
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        let eventsObjet = await respuesta.json()
        let eventsArray = eventsObjet.events.find(element => element._id == id)


div.innerHTML = `
    <div class="contenedor-card">
    <div>
        <picture>
            <img src="${eventsArray.image}" alt="Cinema" class="foto-card-detail">
        </picture>
    </div>
    <div class="info-card-detail">
        <h3>${eventsArray.name}</h3>
        <p>${eventsArray.description}</p>
        <div class="precio-ver-mas-Card-Detail">
            <p>${eventsArray.date}</p>
            <p>USD ${eventsArray.price}</p>
        </div>
    </div>
    </div>
`


} catch (error) {
    console.log(error);
    alert('Error')
}
}

traerInfo();