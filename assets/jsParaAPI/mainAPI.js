// Declaración de Variables y constantes

const contenedor = document.getElementById('contenedor')
const contenedorChecks = document.getElementById('checkContainer')
const input = document.querySelector('input')

// Llamada a la API

const traerInfo = async () => {
    try {
        const respuesta = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
        let eventsObjet = await respuesta.json()
        let eventsArray = eventsObjet.events
        input.addEventListener('input', ()=>crearTarjetasFiltradas(superFiltro(eventsArray, input.value)))
        contenedorChecks.addEventListener('change', ()=>filtrarPorCatoria(superFiltro(eventsArray)))
        categorias(eventsArray);
        crearTarjetas(eventsArray);

        function crearTarjetas(array) {
            let body = ''
            array.forEach(element => {
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
        
        function crearTarjetasFiltradas(array) {
            if (array.length == 0) {
                contenedor.innerHTML = "<h2>No hay coincidencias!</h2>"
                return
            }
            let body = ''
            array.forEach(element => {
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
        
        function categorias(array) {
            let filter = ''
            let filterDuplicado = array.map(element => element.category)
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
        
        function filtrarPorTexto(array,texto) {
            let arrayFiltrado = array.filter(element => element.name.toLowerCase().includes(texto.toLowerCase()))
            return arrayFiltrado
        }
        
        function filtrarPorCatoria(eventsObjet) {
            let checkboxes = document.querySelectorAll("input[type='checkbox']")
            let arrayChecks = Array.from(checkboxes)
            let checksChecked = arrayChecks.filter(element => element.checked)
            if (checksChecked.length == 0) {
                return eventsObjet
            }
            let checkValues = checksChecked.map(check => check.value)
            let arrayFiltrado = eventsArray.filter(element => checkValues.includes(element.category))
            return arrayFiltrado
        }

        function superFiltro() {
            let arrayFiltrado1 = filtrarPorTexto(eventsArray, input.value)
            let arrayFiltrado2 = filtrarPorCatoria(arrayFiltrado1)
            crearTarjetasFiltradas(arrayFiltrado2)
        }
    } catch (error) {
        console.log(error);
        alert('Error')
    }
}

traerInfo();