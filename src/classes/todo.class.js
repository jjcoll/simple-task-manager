
export class Todo {


  static fromJson ( {id, tarea, completado, creado} ) {
    const tempTodo = new Todo( tarea )
    tempTodo.id = id;
    tempTodo.completado = completado;
    tempTodo.creado = creado;

    return tempTodo
  }


  constructor( tarea ) {

    this.tarea = tarea;

    // automatico
    this.id = new Date().getTime(); // 1312315 -- sirve como id
    this.completado = false;
    this.creado = new Date();

  }
}
