
function generarTabla() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((respuesta) => respuesta.json())
    .then((datos) => {

      let eventos = datos.events;
      let past = eventos.filter(events => datos.currentDate > events.date);
      let future = eventos.filter(events => datos.currentDate < events.date);


      let resultPast = [];
      let resultFuture = [];


      past.forEach(element => {
        let nombre = element.name
        let ingresos = element.price * element.assistance;
        let asistencia = (element.assistance * 100) / element.capacity;
        let categoria = element.category;
        resultPast.push({
          name: nombre,
          category: categoria,
          revenues: ingresos,
          attendance: asistencia
        });
      });

      
      future.forEach(element => {
        let ingresos = element.price * element.estimate;
        let asistencia = (element.estimate * 100) / element.capacity;
        let categoria = element.category;
        resultFuture.push({
          category: categoria,
          revenues: ingresos,
          attendance: asistencia
        });
      });

      let reducePast = resultPast.reduce((objeto, tarea) => {
        if (!objeto[tarea.category]) {
          objeto[tarea.category] = [];
        }
        objeto[tarea.category].push({
          revenues: tarea.revenues,
          attendance: tarea.attendance
        });
        
        return objeto;
      });
      
      let reduceFuture = resultFuture.reduce((objeto, tarea) => {
        if (!objeto[tarea.category]) {
          objeto[tarea.category] = [];
        }
        objeto[tarea.category].push({
          revenues: tarea.revenues,
          attendance: tarea.attendance
        });
        
        return objeto;
      });
      
       console.log(eventos);
      const tabla1 = document.getElementById('tabla1');
      const tabla2 = document.getElementById('tabla2');
      const tabla3 = document.getElementById('tabla3');

      function pintarTabla1(array) {
        let contenT1 = ''
        array.forEach(event => {
          contenT1 += `
          <tr>
            <td>${event.name} / ${event.attendance}%</td>
            <td>${event.revenues}</td>
            <td>${event.attendance}</td>
          </tr>
          `
        })
        tabla1.innerHTML = contenT1
      }

      function pintarTabla2(array) {
        let contenT2 = ''
        array.forEach(event => {
          contenT2 += `
          <tr>
          <td>${event.category}</td>
          <td>${event.revenues}</td>
          <td>${event.attendance}%</td>
          </tr>
          `
        })
        tabla2.innerHTML = contenT2
      }
      
      function pintarTabla3(array) {
        let contenT3 = ''
        array.forEach(event => {
          contenT3 += `
          <tr>
            <td>${event.category}</td>
            <td>${event.revenues}</td>
            <td>${event.attendance}%</td>
          </tr>
          `
        })
        tabla3.innerHTML = contenT3
      }

      pintarTabla1(resultPast)
      pintarTabla2(resultFuture)
      pintarTabla3(resultPast)

    })
    .catch((error) => console.error(error));
}

generarTabla()
