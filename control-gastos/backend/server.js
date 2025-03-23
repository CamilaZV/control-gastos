const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); //Para procesar JSON en las peticiones
app.use(cors()); //Permite peticiones desde el frontend

//Conectaar base de datos SQLite
const db = new sqlite3.Database(
  './transactions.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error('Error al conectar con la base de datos: ', err.message);
    } else {
      console.log('Conectado a SQLite');
    }
  }
);

//Crear la table si no existe
db.run(
  `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL
    )
  `,
  (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err.message);
    } else {
      console.log('Tabla de transacciones verificada/correctamente creada');
    }
  }
);

// Obtener todas las transacciones
app.get('/transactions', (req, res) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

//Agregar una nueva transaccion
app.post('/transactions', (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { name, amount, type } = req.body;
  if (!name || !amount || !type) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  db.run(
    'INSERT INTO transactions(description, amount, type) VALUES (?, ?, ?)',
    [name, amount, type],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log('Transacción guardada con ID:', this.lastID);
      res.json({ id: this.lastID, name, amount, type });
    }
  );
});

//Eliminar una transaccion
app.delete('/transactions/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM transactions WHERE id = ?', id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Transaccion eliminada correctamente' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
