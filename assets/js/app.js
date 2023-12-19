const newTask = document.querySelector('#new-task');
const addBtn = document.querySelector('#add-button');
const tasksList = document.querySelector('#tasks-list');
const deleteCompleted = document.querySelector('#delete-completed');

addBtn.disabled = true;
deleteCompleted.disabled = true;

function saveTaskToLocalStorage(){
    localStorage.setItem('taskEntries', JSON.stringify(saveTaskEntries));
}

let saveTaskEntries = JSON.parse(localStorage.getItem('taskEntries')) || [];

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
    saveTaskEntries.push(
        {
            task: newTaskValue
        }
    );

    saveTaskToLocalStorage();

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
    newTask.value = "";
    bindEditBtns();
    bindDeleteBtns();
});

function bindEditBtns(){
    const editBtns = document.querySelectorAll('.edit');
    for (const editBtn of editBtns) {
        editBtn.addEventListener('click',function(){
            const answer = prompt(`"${editBtn.parentElement.previousElementSibling.children[1].innerHTML}" içeriğinizi ne ile değiştirmek istersiniz ?`)
            if(answer == ""){
                alert("Bu içerik boş bırakılamaz");
            }else if(answer == null){

            }else{
                editBtn.parentElement.previousElementSibling.children[1].innerHTML = answer;
            }
        })
    }
}

function bindDeleteBtns(){
    const deleteBtns = document.querySelectorAll('.delete');
    for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click',function(){
            const answer = confirm('Bu içeriği silmek istediğinize emin misiniz?');
            if(answer){
                deleteBtn.parentElement.parentElement.remove();
            }
        })
    }
}

function getTasks(){
    tasksList.innerHTML += '';
    for(const taskEntry of saveTaskEntries){
        tasksList.innerHTML += 
        `
        <li class="task">
            <div class="left-side">
                <input type="checkbox" class="completed">
                <span class="task-content">${taskEntry.task}</span>
            </div>
            <div class="right-side">
                <button class="edit"><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
                <button class="delete"><i class="fa-solid fa-trash-can fa-2x"></i></button>
            </div>
        </li>
        `
    }
    bindDeleteBtns();
    bindEditBtns();
}

getTasks();