const BASE_URL = 'https://playground.4geeks.com/todo';

// Crear un nuevo usuario
export const createUser = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name": username}), // Enviar el nombre del usuario
    });

    if (!response.ok) {
      throw new Error('No se pudo crear el usuario');
    }

    const data = await response.json();
    return data; // Devuelve los datos del usuario creado
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};


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

