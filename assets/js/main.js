function CrearTarjetas(data) {
    let body = ``;

    const tagToUpdate = document.getElementById("importarTarjetas");

    for (let i = 0; i < data.events.length; i++) {
        body += `
            <div class="container-cards"
            <div class="tarjetas">
                <img src= ${data.events[i].image}>
                <h5 class="name">${data.events[i].name}</h5>
                <p class="descrption">${data.events[i].description}</p>
                <div class="precio-ver-mas">
                    <p class="precio">USD $${data.events[i].price}</p>
                    <a href="./card-detail.html">See more</a>
                </div>
            </div>
            </div>
        `
    }
    tagToUpdate.innerHTML = body;
    console.log(body);
}

CrearTarjetas(data);