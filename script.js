let todoInput
let errorInfo
let addBtn
let ulList
let newTodo

let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', addTodoByKey)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		createToolsArea()
		ulList.append(newTodo)

		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}

const createToolsArea = () => {
	const divTools = document.createElement('div')
	const btnComplete = document.createElement('button')
	const btnEdit = document.createElement('button')
	const btnDelete = document.createElement('button')

	btnComplete.classList.add('complete')
	btnComplete.innerHTML = '<i class="fas fa-check"></i>'

	btnEdit.classList.add('edit')
	btnEdit.textContent = 'EDIT'

	btnDelete.classList.add('delete')
	btnDelete.innerHTML = '<i class="fas fa-times"></i>'

	divTools.classList.add('tools')
	divTools.append(btnComplete, btnEdit, btnDelete)

	newTodo.append(divTools)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		e.target.closest('li').classList.toggle('edit')
		editTodo(e)
	} else if (e.target.matches('.delete')) {
		e.target.closest('li').classList.toggle('delete')
		deleteTodo(e)
	}
}

const editTodo = e => {
	todoToEdit = e.target.closest('li')

	popup.style.display = popup.style.display === 'flex' ? 'none' : 'flex'
	popupInput.value = todoToEdit.firstChild.textContent
	popupInfo.textContent = ''
}

const closePopup = () => {
	popup.style.display = 'none'
}

const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove()
	const allTodos = ulList.querySelectorAll('li')

	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście!'
	}
}

const addTodoByKey = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)
