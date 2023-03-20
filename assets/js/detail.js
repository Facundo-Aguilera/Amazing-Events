const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const detail = data.events.find(element => element._id == id)
const div = document.querySelector(".card-detail")
div.innerHTML = `
    <div class="contenedor-card">
    <div>
        <picture>
            <img src="${detail.image}" alt="Cinema" class="foto-card-detail">
        </picture>
    </div>
    <div class="info-card-detail">
        <h3>${detail.name}</h3>
        <p>${detail.description}</p>
        <div class="precio-ver-mas-Card-Detail">
            <p>${detail.date}</p>
            <p>USD ${detail.price}</p>
        </div>
    </div>
    </div>
`
