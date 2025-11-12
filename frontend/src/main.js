// frontend/main.js
import { getTareas, createTarea } from '../js/api.js';
import { TareaItem } from '../js/componentes.js';

const form = document.getElementById('task-form');
const listContainer = document.getElementById('task-list');

/** Función principal que usa la Promise de getTareas para cargar datos */
export const renderTaskList = async () => {
    listContainer.innerHTML = '<li>Cargando tareas...</li>';

    try {
        // await espera a que la Promise de getTareas se resuelva
        const tareas = await getTareas(); 
        
        listContainer.innerHTML = ''; 
        if (tareas.length === 0) {
            listContainer.innerHTML = '<li class="list-group-item">No hay tareas. ¡Añade una!</li>';
            return;
        }

        tareas.forEach(tarea => {
            // Renderiza cada componente TareaItem
            listContainer.appendChild(TareaItem(tarea, renderTaskList)); 
        });

    } catch (error) {
        // Maneja el rechazo de la Promise
        listContainer.innerHTML = `<li class="list-group-item list-group-item-danger">Error al cargar: ${error.message}. Verifica el servidor (puerto 4000).</li>`;
    }
};

// Manejo del formulario (usa la Promise de createTarea)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tituloInput = document.getElementById('task-title');
    const titulo = tituloInput.value.trim();

    if (titulo) {
        try {
            await createTarea({ titulo }); // Espera la Promise de creación
            tituloInput.value = ''; // Limpiar
            renderTaskList(); // Recargar la lista
        } catch (error) {
            alert('Error al guardar la tarea: ' + error.message);
        }
    }
});

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderTaskList);