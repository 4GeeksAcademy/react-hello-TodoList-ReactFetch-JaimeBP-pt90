import React, { useState, useEffect } from 'react';
import { createTodoForUser, updateTasks, deleteTask } from './api';
import "../../styles/index.css";

const Home = () => {
  const [taskLabel, setTaskLabel] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const username = 'Jaime'; // Nombre del usuario siempre es Jaime

  // Obtener el ID de Jaime cuando se carga la página
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('https://playground.4geeks.com/todo/users');
        const data = await response.json();
        const user = data.users.find(user => user.name === username);
        if (user) {
          setUserId(user.id); // Establecer el ID de Jaime
        }
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
      }
    };

    fetchUserId();
  }, []);

  // Manejar la adición de tareas
  const handleAddTask = async (event) => {
    if (event.key === 'Enter' && taskLabel && userId) {
      const newTask = { label: taskLabel, done: false };
      try {
        // Crear una tarea para el usuario Jaime utilizando su ID
        const newTodo = await createTodoForUser(userId, newTask); // Pasar el ID de Jaime junto con la tarea

        // Actualizar las tareas en el estado
        setTasks(prevTasks => [...prevTasks, newTodo]); // Agregar la nueva tarea al estado

        setTaskLabel(''); // Limpiar el input
      } catch (error) {
        console.error('Error al añadir la tarea:', error);
      }
    }
  };

  // Manejar la eliminación de tareas
  const handleDeleteTask = async (index) => {
    try {
      // Crear una nueva lista de tareas excluyendo la tarea eliminada
      const updatedTasks = tasks.filter((_, i) => i !== index);

      // Llamar a la API para actualizar las tareas del usuario
      if (userId) {
        await deleteTask(userId, updatedTasks);
      }

      // Actualizar el estado local
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className="todo-app">
      <div className="input-container">
        <h1>Añadir Tarea para Jaime</h1>
        <input
          type="text"
          placeholder="Escribe una tarea y presiona Enter"
          value={taskLabel}
          onChange={(e) => setTaskLabel(e.target.value)}
          onKeyDown={handleAddTask} // Manejar la tarea al presionar Enter
        />
      </div>

      <div>
        <h2>Tareas de Jaime</h2>
        <ul className="task-list">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index} className="task-item">
                <span>{task.label}</span>
                <span
                  className="delete-icon"
                  onClick={() => handleDeleteTask(index)} // Llamar a la función al hacer clic
                >
                  ❌
                </span>
              </li>
            ))
          ) : (
            <p className="no-tasks">No hay tareas pendientes</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
