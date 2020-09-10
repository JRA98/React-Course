const express = require('express');
const conectarDB = require('./config/db')

// Crear el servidor
const app = express();

// Conectar a la bbdd
conectarDB();

// Habilitar express.json
app.use(express.json({ extend:true }));

// Puerto de la app
const PORT = process.env.PORT || 5000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));

// Definir la página principal
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

// Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})