const BASE_URL = 'https://playground.4geeks.com/todo';

// Crear un nuevo todo para un usuario existente con una tarea
export const createTodoForUser = async (userId, task) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/Jaime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ label: task.label, done: task.done }), // Enviar la tarea con el formato correcto
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
};

//Para eliminar tarea
export const deleteTask = async (userId, tasks) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tasks), // Enviar las tareas actualizadas después de eliminar
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
  }
};

// Actualizar las tareas de un usuario específico
export const updateTasks = async (userId, tasks) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tasks: tasks }), // Actualizar las tareas
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar tareas:', error);
  }
};

