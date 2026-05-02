let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() { // получение списка задач 
	const savedTasks = localStorage.getItem("tasks");
	if(savedTasks){
		return JSON.parse(savedTasks); // Преобразуем JSON-строку в массив
	}
	return items;
}

function createItem(item) { // отвечает за создание готовой разметки элемента задачи
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	// так как кнопки создаются динамически, слушатели добавляем внутри функции 
	deleteButton.addEventListener("click", function(){ // удаление задачи
		clone.remove();
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", function(){ // копирование задачи
		let itemName = textElement.textContent;
		let newItem = createItem(item);
		
		listElement.prepend(newItem);
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	// редактирование 
	editButton.addEventListener("click", function(){
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", function(){ // событие, которое срабатывает, когда элемент теряет фокус
		textElement.setAttribute("contenteditable", "false");
		let tasks = getTasksFromDOM();
		saveTasks(tasks);
	});

	textElement.textContent = item;

	return clone;
}

function getTasksFromDOM() { // собирает список задач из текущей разметки и возвращает его в виде массива строк
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	let tasks = [];
	itemsNamesElements.forEach(function(el){
		tasks.push(el.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", function(evt){
	evt.preventDefault();
	const element = createItem(inputElement.value);
	listElement.prepend(element);
	
	items = getTasksFromDOM(); 
	saveTasks(items);
	formElement.reset();
});

items = loadTasks(items);
items.forEach(function(a){
	listElement.append(createItem(a));
})


