// crud-backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carga las variables del .env

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Conexión a MongoDB Atlas (usa Promises de Mongoose)
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => {
        console.error('❌ Error de conexión a la DB:', err.message);
        process.exit(1); 
    });

// Modelo
// Nota: Se corrigió para usar './models/Tarea' si el archivo es Tarea.js (singular)
// Si el archivo es Tareas.js (plural), dejar el plural. Aquí usamos Tarea.js basado en tu modelo.
const Tarea = require('./models/Tarea'); 

// --- Ruta de Verificación (Health Check) ---
app.get('/', (req, res) => {
    // Esta ruta se agregó para solucionar el error "Cannot GET /" en Render.
    res.send('API de Tareas funcionando correctamente.');
});

// --- Rutas CRUD (Endpoints) ---

// C - Crear Tarea (POST)
app.post('/api/tareas', async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        const tareaGuardada = await nuevaTarea.save(); 
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// R - Leer Todas las Tareas (GET)
app.get('/api/tareas', async (req, res) => {
    try {
        // .sort({ createdAt: -1 }) ordena por más reciente primero
        const tareas = await Tarea.find().sort({ createdAt: -1 }); 
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// U - Actualizar Tarea (PUT)
app.put('/api/tareas/:id', async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // new: true devuelve el documento actualizado
        );
        if (!tareaActualizada) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// D - Eliminar Tarea (DELETE)
app.delete('/api/tareas/:id', async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});