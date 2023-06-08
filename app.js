const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 4000;

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'BDAeroLima'
});

// Conexión a MySQL
connection.connect(error => {
  if (error) {
    console.error('Error de conexión a MySQL:', error);
    return;
  }
  console.log('Conectado a MySQL');
});

// Configurar el análisis del cuerpo de la solicitud como JSON
app.use(express.json());
app.use(express.static(__dirname));

// Ruta para guardar los datos en MySQL
app.post('/guardar', (req, res) => {
  const { nombre, sexo, vuelo, aerolinea, ciudadDestino, ciudadPartida, fechaPartida, horaPartida, fechaLlegada, horaLlegada, asiento } = req.body;

  const query = `INSERT INTO InfoPasaje (Nombre, Sexo, Vuelo, Aerolinea, CiudadDestino, CiudadPartida, FechaPartida, HoraPartida, FechaLlegada, HoraLlegada, Asiento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, [nombre, sexo, vuelo, aerolinea, ciudadDestino, ciudadPartida, fechaPartida, horaPartida, fechaLlegada, horaLlegada, asiento], (error, result) => {
    if (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).json({ error: 'Error al guardar los datos' });
      return;
    }

    res.json({ message: 'Datos guardados exitosamente' });
  });
});

// Ruta para obtener los datos de vuelos de la base de datos y generar las opciones del select
app.get('/vuelos', (req, res) => {
    const query = 'SELECT idVuelo, nombre FROM Vuelo';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener los datos de vuelos:', error);
        res.status(500).json({ error: 'Error al obtener los datos de vuelos' });
        return;
      }
  
      res.json({ opciones: results });
    });
  });
  
  // Ruta para obtener los datos de aerolíneas de la base de datos y generar las opciones del select
  app.get('/aerolineas', (req, res) => {
    const query = 'SELECT idAerolinea, nombre FROM Aerolinea';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener los datos de aerolíneas:', error);
        res.status(500).json({ error: 'Error al obtener los datos de aerolíneas' });
        return;
      }
  
      res.json({ opciones: results });
    });
  });
  
  // Ruta para obtener los datos de ciudades de destino de la base de datos y generar las opciones del select
  app.get('/ciudadesDestino', (req, res) => {
    const query = 'SELECT idCiudadDestino, NombreCiudad FROM CiudadDestino';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener los datos de ciudades de destino:', error);
        res.status(500).json({ error: 'Error al obtener los datos de ciudades de destino' });
        return;
      }
  
      res.json({ opciones: results });
    });
  });
  
  // Ruta para obtener los datos de ciudades de partida de la base de datos y generar las opciones del select
  app.get('/ciudadesPartida', (req, res) => {
    const query = 'SELECT idCiudadPartida, NombreCiudad FROM CiudadPartida';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener los datos de ciudades de partida:', error);
        res.status(500).json({ error: 'Error al obtener los datos de ciudades de partida' });
        return;
      }
  
      res.json({ opciones: results });
    });
  });




// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});