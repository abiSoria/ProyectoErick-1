
import { updateTarea, deleteTarea } from './api.js';

/** Genera el HTML para una sola tarea (Componente de Ítem) */
export const TareaItem = (tarea, renderListCallback) => {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${tarea.completada ? 'list-group-item-success' : ''}`;
    li.dataset.id = tarea._id;

    const tituloSpan = document.createElement('span');
    tituloSpan.textContent = tarea.titulo;
    if (tarea.completada) {
        tituloSpan.style.textDecoration = 'line-through';
    }

    const accionesDiv = document.createElement('div');

    // Botón de Completar
    const btnCompletar = document.createElement('button');
    btnCompletar.className = `btn btn-sm me-2 ${tarea.completada ? 'btn-warning' : 'btn-success'}`;
    btnCompletar.textContent = tarea.completada ? 'Deshacer' : 'Completar';
    
    // Listener asíncrono que espera la Promise de actualización
    btnCompletar.addEventListener('click', async () => {
        try {
            await updateTarea(tarea._id, { completada: !tarea.completada });
            renderListCallback(); // Vuelve a renderizar la lista
        } catch (error) {
            alert('Error al actualizar la tarea: ' + error.message);
        }
    });

    // Botón de Eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm';
    btnEliminar.textContent = 'Eliminar';
    
    // Listener asíncrono que espera la Promise de eliminación
    btnEliminar.addEventListener('click', async () => {
        if (confirm(`¿Estás seguro de eliminar "${tarea.titulo}"?`)) {
            try {
                await deleteTarea(tarea._id);
                renderListCallback(); // Vuelve a cargar la lista
            } catch (error) {
                alert('Error al eliminar la tarea: ' + error.message);
            }
        }
    });

    accionesDiv.append(btnCompletar, btnEliminar);
    li.append(tituloSpan, accionesDiv);
    return li;
};