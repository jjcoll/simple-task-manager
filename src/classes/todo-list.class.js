// Al tener que manejar todos los todos, para hacer acciones como por ejemplo borrar alguno, esconder los que esten completados etc.
// Lo mejor es hacer una clase que sirva para eso

import { Todo } from "./todo.class";

export class TodoList {

  constructor() {
    // this.todos = [];
    this.cargarLocalStorage();
  }

  nuevo( todo ) {
    this.todos.push(todo)
    this.guardarLocalStorage();
  }

  eliminarTodo( id ) {

    // LOGICA: el nuevo array de todos sera igual a todos los todos que hay menos el que tiene el id del que queremos borrar
    this.todos =  this.todos.filter( todo => todo.id != id)
    this.guardarLocalStorage()

  }

  toggleTodo( id ) {

    for( const todo of this.todos) {
      // recibimos string evaluamos numero
      if(todo.id == id) {
        todo.completado = !todo.completado;
        break;
      }
    }

  }

  eliminarCompletados() {

    // quita todos los todos que esten completados
    this.todos = this.todos.filter(todo => !todo.completado)
    this.guardarLocalStorage()

  }

  guardarLocalStorage() {

    // hay que transformarlo a un objeto
    localStorage.setItem('todos', JSON.stringify(this.todos) )

  }

  cargarLocalStorage() {

    console.log('Loading local Storage')
    
    this.todos = localStorage.getItem('todos') 
        ? JSON.parse(localStorage.getItem('todos')) 
        : [];

    
    // convertir objetos JSON a instancias de Todo
    this.todos = this.todos.map( obj => Todo.fromJson(obj) )
  }


}