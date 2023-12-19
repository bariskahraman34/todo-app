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
let counter;


addBtn.addEventListener('click',function(){
    counter = saveTaskEntries.length;
    let newTaskValue = newTask.value;
    addBtn.disabled = true;
    saveTaskEntries.push(
        {
            id:counter,
            task: newTaskValue
        }
    );

    saveTaskToLocalStorage();
    getTasks();
    newTask.value = "";
});

function bindEditBtns(){
    counter = 0;
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
    for (let i = 0 ; i < deleteBtns.length ; i++) {
        deleteBtns[i].addEventListener('click',function(){
            const answer = confirm('Bu içeriği silmek istediğinize emin misiniz?');
            if(answer){
                counter = 0;
                this.parentElement.parentElement.remove();
                saveTaskEntries.splice(Number(this.parentElement.parentElement.id),1)
                localStorage.clear();
                saveTaskToLocalStorage();

                getTasks();
            }
        })
    }
}

function getTasks(){
    counter = 0;
    tasksList.innerHTML = '';
    for(i = 0 ; i < saveTaskEntries.length ; i++){
        tasksList.innerHTML += 
        `
        <li class="task" id="${counter}">
            <div class="left-side">
                <input type="checkbox" class="completed">
                <span class="task-content">${saveTaskEntries[i].task}</span>
            </div>
            <div class="right-side">
                <button class="edit"><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
                <button class="delete"><i class="fa-solid fa-trash-can fa-2x"></i></button>
            </div>
        </li>
        `
        counter ++;
    }
    bindDeleteBtns();
    bindEditBtns();
}

getTasks();