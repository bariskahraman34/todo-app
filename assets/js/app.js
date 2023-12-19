const newTask = document.querySelector('#new-task');
const addBtn = document.querySelector('#add-button');
const tasksList = document.querySelector('#tasks-list')

addBtn.addEventListener('click',function(){
    let newTaskValue = newTask.value;

    tasksList.innerHTML += 
    `
    <li class="task">
        <div class="left-side">
            <input type="checkbox" class="completed">
            <span class="task-content">${newTaskValue}</span>
        </div>
        <div class="right-side">
            <button class="edit"><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can fa-2x"></i></button>
        </div>
    </li>
    `
})