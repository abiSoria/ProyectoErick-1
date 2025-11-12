
const API_URL = 'http://localhost:4000/api/tareas'; 

// C - Crear Tarea (Usando async/await sobre la Promise de fetch)
export const createTarea = async (tareaData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tareaData)
    });
    if (!response.ok) throw new Error(`Fallo al crear la tarea. Status: ${response.status}`);
    return response.json();
};

// R - Leer Todas las Tareas (Usando la sintaxis .then() y .catch() )
export const getTareas = () => {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                // Rechaza la Promise si la respuesta HTTP es mala
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error en getTareas:', error);
            throw error; // Propaga el error para que el llamador lo maneje
        });
};

// U - Actualizar Tarea
export const updateTarea = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error(`Fallo al actualizar la tarea. Status: ${response.status}`);
    return response.json();
};

// D - Eliminar Tarea
export const deleteTarea = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Fallo al eliminar la tarea. Status: ${response.status}`);
};