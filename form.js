const form = document.getElementById('formulario');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('txt_nombre').value;
  const sexo = document.getElementById('txt_sexo').value;
  const vuelo = document.getElementById('txt_vuelo').value;
  const aerolinea = document.getElementById('txt_aerolinea').value;
  const ciudadDestino = document.getElementById('txt_ciudadDestino').value;
  const ciudadPartida = document.getElementById('txt_ciudadPartida').value;
  const fechaPartida = document.getElementById('txt_fechaPartida').value;
  const horaPartida = document.getElementById('txt_horaPartida').value;
  const fechaLlegada = document.getElementById('txt_fechaLlegada').value;
  const horaLlegada = document.getElementById('txt_horaLlegada').value;
  const asiento = document.getElementById('txt_asiento').value;

  const data = {
    nombre,
    sexo,
    vuelo,
    aerolinea,
    ciudadDestino,
    ciudadPartida,
    fechaPartida,
    horaPartida,
    fechaLlegada,
    horaLlegada,
    asiento
  };

  fetch('/guardar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    alert('Datos guardados exitosamente');
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ocurrió un error al guardar los datos');
  });
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener opciones de vuelos
    fetch('/vuelos')
      .then(response => response.json())
      .then(data => {
        const vuelosSelect = document.getElementById('txt_vuelo');
        data.opciones.forEach(opcion => {
          const option = document.createElement('option');
          option.value = opcion.idVuelo; // Asignar el ID como valor
          option.text = opcion.nombre; // Mostrar el nombre
          vuelosSelect.add(option);
        });
      })
      .catch(error => {
        console.error('Error al obtener las opciones de vuelos:', error);
      });
  
    // Obtener opciones de aerolíneas
    fetch('/aerolineas')
      .then(response => response.json())
      .then(data => {
        const aerolineasSelect = document.getElementById('txt_aerolinea');
        data.opciones.forEach(opcion => {
          const option = document.createElement('option');
          option.value = opcion.idAerolinea; // Asignar el ID como valor
          option.text = opcion.nombre; // Mostrar el nombre
          aerolineasSelect.add(option);
        });
      })
      .catch(error => {
        console.error('Error al obtener las opciones de aerolíneas:', error);
      });
  
    // Obtener opciones de ciudades de destino
    fetch('/ciudadesDestino')
      .then(response => response.json())
      .then(data => {
        const ciudadesDestinoSelect = document.getElementById('txt_ciudadDestino');
        data.opciones.forEach(opcion => {
          const option = document.createElement('option');
          option.value = opcion.idCiudadDestino; // Asignar el ID como valor
          option.text = opcion.NombreCiudad; // Mostrar el nombre
          ciudadesDestinoSelect.add(option);
        });
      })
      .catch(error => {
        console.error('Error al obtener las opciones de ciudades de destino:', error);
      });
  
    // Obtener opciones de ciudades de partida
    fetch('/ciudadesPartida')
      .then(response => response.json())
      .then(data => {
        const ciudadesPartidaSelect = document.getElementById('txt_ciudadPartida');
        data.opciones.forEach(opcion => {
          const option = document.createElement('option');
          option.value = opcion.idCiudadPartida; // Asignar el ID como valor
          option.text = opcion.NombreCiudad; // Mostrar el nombre
          ciudadesPartidaSelect.add(option);
        });
      })
      .catch(error => {
        console.error('Error al obtener las opciones de ciudades de partida:', error);
      });
  });