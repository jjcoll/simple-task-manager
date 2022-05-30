import { Todo } from '../classes';

import { todoList } from '../index';

// Metodo que permita crear todo en HTML

// Referencias HTML
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const eliminarCompletados = document.querySelector('.clear-completed')
const ulFilter = document.querySelector('.filters')
const anfhorFiltros = document.querySelectorAll('.filtro')



export const crearTodoHtml = (todo) => {



  const htmlTodo = `
					<li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }"
						<div class="view">
							<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
					</li>`;


  // Creamos el div para encapsular todo el HTML
  const div = document.createElement('div');
  div.innerHTML = htmlTodo;
  
  // No queremos insertar el div creado asi que insertamos su primer "hijo" que en este caso es el <li>
  divTodoList.append(div.firstElementChild);

  return div;

}


// Eventos
txtInput.addEventListener('keyup', ( event ) => {
  if (event.key === 'Enter' && txtInput.value.length > 0) {

    console.log('Crear todo')
    const nuevoTodo =  new Todo(txtInput.value) 
    todoList.nuevo(nuevoTodo);

    crearTodoHtml(nuevoTodo);

    txtInput.value = '';

  }
})

// cuando se hace click en el <ul>
divTodoList.addEventListener('click', (event) => {
   // parte de la list que se hace click
  const nombreElemento = event.target.localName
  const todoElemento = event.target.parentElement;
  const todoId = todoElemento.getAttribute('data-id')


  // asegura que se hace click en el checkbox
  if ( nombreElemento.includes('input') )  {
    todoList.toggleTodo(todoId)
    todoElemento.classList.toggle('completed');
  }

  // click en el botton de eliminar
  else if ( nombreElemento.includes('button') ) {

    // eliminar todo de array
    todoList.eliminarTodo( todoId );

    // eliminar todo del HTML
    todoElemento.remove();
  }
})

eliminarCompletados.addEventListener('click', () => {

  // elimninar de la clase
  todoList.eliminarCompletados()

  // eliminar de HTML -- se tiene que hacer de abajo hacia arriba para evitar borrar un elemento no deseado
  for (let i = divTodoList.children.length - 1; i>=0 ; i--) {

    const elemento = divTodoList.children[i]
    if ( elemento.classList.contains('completed') ) {
      elemento.remove()
    }

  }


});



ulFilter.addEventListener('click', (event) => {
  
  const filtro = event.target.text
  // negar porque true es mas rapido que undefined
  if (!filtro) {return};


  // Cambiar botton filtro seleccionado
  anfhorFiltros.forEach( elemento => {
    elemento.classList.remove('selected')
  })

  event.target.classList.add('selected')


  for ( const elemento of divTodoList.children ) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    // determinar filtro -- si es todos, pues al haber quitado el hidden pues se muestran todos y como el filter es 'todos' no es evaluado en el switch
    switch( filtro ) {
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break
    }
  }

})