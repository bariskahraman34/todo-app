const newTask = document.querySelector('#new-task');
const addBtn = document.querySelector('#add-button');
const tasksList = document.querySelector('#tasks-list');
const deleteCompleted = document.querySelector('#delete-completed');

addBtn.disabled = true;
deleteCompleted.disabled = true;

newTask.addEventListener('input',function(e){
    if(e.target.value == ''){
        addBtn.disabled = true;
    }else{
        addBtn.disabled = false;
    }
});
let counter = 0;

addBtn.addEventListener('click',function(){
    let newTaskValue = newTask.value;
    addBtn.disabled = true;
    counter++;
    tasksList.innerHTML += 
    `
    <li class="task">
        <div class="left-side">
            <input type="checkbox" class="completed">
            <span class="task-content" id="task-${counter}">${newTaskValue}</span>
        </div>
        <div class="right-side">
            <button class="edit"><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can fa-2x"></i></button>
        </div>
    </li>
    `
    newTask.value = "";
    bindEditBtns();

});

function bindEditBtns(){
    const editBtns = document.querySelectorAll('.edit');
    const taskContents = document.querySelector(`#task-${counter}`);
    for(const editBtn of editBtns){
        editBtn.addEventListener('click',function(){
            const answer = prompt('İçeriği yeniden yazın.');
            taskContents.innerHTML = answer;
        })
    }
}

