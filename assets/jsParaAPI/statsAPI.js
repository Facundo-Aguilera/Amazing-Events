
function generarTabla() {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then((respuesta) => respuesta.json())
    .then((datos) => {

      let eventos = datos.events;
      let past = eventos.filter(events => datos.currentDate > events.date);
      let future = eventos.filter(events => datos.currentDate < events.date);
      const tabla1 = document.getElementById('tabla1');
      const tabla2 = document.getElementById('tabla2');
      const tabla3 = document.getElementById('tabla3');
      let resultPast = [];
      let resultFuture = [];

      past.forEach(element => {
        let nombre = element.name;
        let ingresos = element.price * element.assistance;
        let asistencia = (element.assistance * 100) / element.capacity;
        let categoria = element.category;
        let capacidad = element.capacity;
        let asistenciaNeta = element.assistance;
        resultPast.push({
          name: nombre,
          category: categoria,
          revenues: ingresos,
          attendance: asistencia,
          capacity: capacidad,
          assistance: asistenciaNeta,
        });
      });


      future.forEach(element => {
        let nombre = element.name;
        let ingresos = element.price * element.estimate;
        let asistencia = (element.estimate * 100) / element.capacity;
        let categoria = element.category;
        let capacidad = element.capacity;
        let asistenciaNeta = element.estimate;
        resultFuture.push({
          name: nombre,
          category: categoria,
          revenues: ingresos,
          attendance: asistencia,
          capacity: capacidad,
          assistance: asistenciaNeta,
        });
      });

      const MaxAttendanceEvents = resultPast.reduce((acc,
        curr) => {
        return curr.attendance > acc.attendance ? curr : acc;
      });

      const MinAttendanceEvents = resultPast.reduce((acc, curr) => {
        return curr.attendance < acc.attendance ? curr : acc;
      });

      const MaxCapacityEvents = resultPast.reduce((acc, curr) => {
        return curr.capacity > acc.capacity ? curr : acc;
      });

      let categorias = {};

      for (let i = 0; i < resultPast.length; i++) {
        const categoria = resultPast[i].category;
        if (!categorias[categoria]) {
          categorias[categoria] = {
            totalRevenues: resultPast[i].revenues,
            totalAttendance: resultPast[i].attendance,
            numEvents: 1
          }
        } else {
          categorias[categoria].totalRevenues += resultPast[i].revenues;
          categorias[categoria].totalAttendance += resultPast[i].attendance;
          categorias[categoria].numEvents++;
        }
      }

      let resultado = [];

      for (const categoria in categorias) {
        resultado.push({
          category: categoria,
          totalRevenues: categorias[categoria].totalRevenues,
          averageAttendance: (categorias[categoria].totalAttendance / categorias[categoria].numEvents).toFixed(2)
        });
      }

      let categoriasPast = {};

      for (let i = 0; i < resultFuture.length; i++) {
        const categoria = resultFuture[i].category;
        if (!categoriasPast[categoria]) {
          categoriasPast[categoria] = {
            totalRevenues: resultFuture[i].revenues,
            totalAttendance: resultFuture[i].attendance,
            numEvents: 1
          }
        } else {
          categoriasPast[categoria].totalRevenues += resultFuture[i].revenues;
          categoriasPast[categoria].totalAttendance += resultFuture[i].attendance;
          categoriasPast[categoria].numEvents++;
        }
      }

      let resultadoFuturo = [];

      for (const categoria in categoriasPast) {
        resultadoFuturo.push({
          category: categoria,
          totalRevenues: categoriasPast[categoria].totalRevenues,
          averageAttendance: (categoriasPast[categoria].totalAttendance / categoriasPast[categoria].numEvents).toFixed(2)
        });
      }

      // Pintando tablas

      let contenT1 = `
          <tr>
            <td>${MaxAttendanceEvents.name} / ${MaxAttendanceEvents.attendance.toFixed(1)}%</td>
            <td>${MinAttendanceEvents.name} / ${MinAttendanceEvents.attendance.toFixed(1)}%</td>
            <td>${MaxCapacityEvents.name} / ${MaxCapacityEvents.capacity}</td>
          </tr>
          `
      tabla1.innerHTML = contenT1


      function pintarTabla2(array) {
        let contenT2 = ''
        array.forEach(event => {
          contenT2 += `
          <tr>
            <td>${event.category}</td>
            <td>${event.totalRevenues}</td>
            <td>${event.averageAttendance}%</td>
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
            <td>${event.totalRevenues}</td>
            <td>${event.averageAttendance}%</td>
          </tr>
          `
        })
        tabla3.innerHTML = contenT3
      }

      // Llamado de funciones
      pintarTabla2(resultadoFuturo)
      pintarTabla3(resultado)

    })
    .catch((error) => console.error(error));
}

generarTabla()
