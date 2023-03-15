const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")
const detail = data.find(element => element.id == id)
const div = document.querySelector(".card-detail")

div.innerHTML = `
    <div class="contenedor-card">
    <div>
        <picture>
            <img src="${element.image}" alt="Cinema" class="foto-card-detail">
        </picture>
    </div>
    <div class="info-card-detail">
        <h3>${detail.name}</h3>
        <p>${detail.description}</p>
        <p>${detail.date}</p>
    </div>
    </div>
`
