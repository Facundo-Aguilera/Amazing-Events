// Declaración de Variables y constantes

const contenedor = document.getElementById('contenedor')
const contenedorChecks = document.getElementById('checkContainer')
const input = document.querySelector('input')


// Eventos

input.addEventListener('input', superFiltro)

contenedorChecks.addEventListener('change', superFiltro)


//Llamadas de funciones

crearTarjetas(data);
categorias(data);


// Funciones

function crearTarjetas(data) {
    let body = ''
    data.events.forEach(element => {
        body += `
            <div class="container-cards"
            <div class="tarjetas">
                <img src= ${element.image}>
                <h5 class="name">${element.name}</h5>
                <p class="descrption">${element.description}</p>
                <div class="precio-ver-mas">
                    <p class="precio">USD $${element.price}</p>
                    <a href="./card-detail.html?id=${element._id}">See more</a>
                </div>
            </div>
            </div>
        `
    })
    contenedor.innerHTML = body;
}

function crearTarjetasFiltradas(data) {
    if (data.length == 0) {
        contenedor.innerHTML = "<h2>No hay coincidencias!</h2>"
        return
    }
    let body = ''
    data.forEach(element => {
        body += `
            <div class="container-cards"
            <div class="tarjetas">
                <img src= ${element.image}>
                <h5 class="name">${element.name}</h5>
                <p class="descrption">${element.description}</p>
                <div class="precio-ver-mas">
                    <p class="precio">USD $${element.price}</p>
                    <a href="./card-detail.html?id=${element._id}">See more</a>
                </div>
            </div>
            </div>
        `
    })
    contenedor.innerHTML = body;
}

function categorias(data) {
    let filter = ''
    let filterDuplicado = data.events.map(element => element.category)
    let actividades = new Set(filterDuplicado.sort((a, b) => {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    }))
    actividades.forEach(element => {
        filter += `
        <input type="checkbox" value="${element}" id="${element}">
        <label for="${element}">${element}</label>
        `
    })
    contenedorChecks.innerHTML = filter;
}

function filtrarPorTexto(data, texto) {
    let arrayFiltrado = data.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

function filtrarPorCatoria(data) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let arrayChecks = Array.from(checkboxes)
    let checksChecked = arrayChecks.filter(element => element.checked)
    if (checksChecked.length == 0) {
        return data
    }
    let checkValues = checksChecked.map(check => check.value)
    let arrayFiltrado = data.filter(element => checkValues.includes(element.category))
    return arrayFiltrado
}

function superFiltro() {
    let arrayFiltrado1 = filtrarPorTexto(data.events, input.value)
    let arrayFiltrado2 = filtrarPorCatoria(arrayFiltrado1)
    crearTarjetasFiltradas(arrayFiltrado2)
}