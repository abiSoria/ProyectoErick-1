// crud-backend/models/Tarea.js
const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    completada: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Tareas', TareaSchema);