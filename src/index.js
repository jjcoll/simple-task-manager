import './styles.css'

// Importar classe Todo
// import { Todo } from './classes/todo.class'
// Importar classe TodoList
// import { TodoList } from './classes/todo-list.class';
import {Todo, TodoList} from './classes' // si no especificamos nombre, busca index.js por defecto

// importar componentes
import { crearTodoHtml } from './js/components';


export const todoList = new TodoList();




// Local storage -- session storage  (solo navegador)

// El problema es que la llave solo puede ser un string, y la informacion guardada tambine puede ser solo un string

console.log(todoList.todos)

// crear todos por cada todo que hay en local storage
todoList.todos.forEach(todo => {
  crearTodoHtml(todo);
});

// Problema es que todos estos todos del local storage no son de la clase Todo sinos que son objetos
// Al trabajar con instancias de objetos con el local storage todos los metodos se perderian, las instancias no pero si los metodos (no son almacenados).
// const newTodo = new Todo('Aprender JS');
// todoList.nuevo(newTodo)
// console.log(todoList)



// borra en 1,5 segundos
// setTimeout( () => {
//   localStorage.removeItem('mi-key');
// }, 1500)




