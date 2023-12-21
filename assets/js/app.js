const newTask = document.querySelector('#new-task');
const addBtn = document.querySelector('#add-button');
const tasksList = document.querySelector('#tasks-list');
const deleteCompletedBtn = document.querySelector('#delete-completed');
const deleteAllBtn = document.querySelector('#delete-all');
const copyright = document.querySelector('.copyright');

const date = new Date();
const getFullYear = date.getFullYear();

copyright.innerHTML = `<h3>Barış Kahraman Copyright © ${getFullYear} , Tüm Hakları Saklıdır.</h3>`

addBtn.disabled = true;

let saveTaskEntries = JSON.parse(localStorage.getItem('taskEntries')) || [];

function saveTaskToLocalStorage(){
    return localStorage.setItem('taskEntries', JSON.stringify(saveTaskEntries));
}

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
            task: newTaskValue,
            completed:false
        }
    );

    saveTaskToLocalStorage();
    getTasks();
    newTask.value = "";
});

function bindEditBtns(){
    const editBtns = document.querySelectorAll('.edit');
    for (let i = 0 ; i < editBtns.length ; i++) {
        editBtns[i].addEventListener('click',function(){
            const answer = prompt(`"${editBtns[i].parentElement.previousElementSibling.children[1].innerHTML}" içeriğinizi ne ile değiştirmek istersiniz ?`)
            if(answer == ""){
                alert("Bu içerik boş bırakılamaz");
            }else if(answer == null){

            }else{
                editBtns[i].parentElement.previousElementSibling.children[1].innerHTML = answer;
                saveTaskEntries[i].task = answer;
                saveTaskToLocalStorage();
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
                saveTaskEntries.splice(i,1);
                saveTaskToLocalStorage();
                getTasks();
            }
        })
    }
}

let inputCompletedCounter = 0;

function bindCompeletedInput(){
    const completedInputs = document.querySelectorAll('.completed');
    for (let i = 0 ; i < completedInputs.length; i++) {
        completedInputs[i].addEventListener('click',function(){
            if(completedInputs[i].hasAttribute('checked','checked')){
                completedInputs[i].removeAttribute('checked','checked');
                completedInputs[i].nextElementSibling.style.textDecoration = "none";
                completedInputs[i].classList.remove("checked")
                saveTaskEntries[i] = {id: saveTaskEntries[i].id , task:saveTaskEntries[i].task, completed:false};
                saveTaskToLocalStorage();
                inputCompletedCounter --;
            }else{
                completedInputs[i].setAttribute('checked','checked');
                completedInputs[i].classList.add("checked");
                saveTaskEntries[i] = {id: saveTaskEntries[i].id , task:saveTaskEntries[i].task, completed:true};
                saveTaskToLocalStorage();
                completedInputs[i].nextElementSibling.style.textDecoration = "line-through";

                inputCompletedCounter ++;
            }
            deleteCompletedElements();
        })
    }
}
function deleteCompletedElements(){
    if(inputCompletedCounter > 0){
        deleteCompletedBtn.disabled = false;
        deleteCompletedBtn.addEventListener('click',function(){
            const completedInputs = document.querySelectorAll('.checked');
            for (const completedInput of completedInputs) {
                saveTaskEntries.splice(Number(completedInput.parentElement.parentElement.id),1);
            }
            saveTaskToLocalStorage();
            getTasks();
            deleteCompletedBtn.disabled = true;
        })
    }else{
        deleteCompletedBtn.disabled = true;
    }
}

function bindDeleteAllBtn(){
    if(saveTaskEntries.length > 0){
        deleteAllBtn.disabled = false;
        deleteAllBtn.addEventListener('click',function(){
            const answer = confirm("Tüm görevleri silmek istediğinize emin misiniz ?");
            if(answer){
                localStorage.clear();
                location.reload();
            }
        })
    }else{
        deleteAllBtn.disabled = true;
    }
}

function getTasks(){
    counter = 0;
    inputCompletedCounter = 0;
    tasksList.innerHTML = '';
    for(i = 0 ; i < saveTaskEntries.length ; i++){
        tasksList.innerHTML += 
        `
        <li class="task" id="${counter}">
            <div class="left-side">
                <input type="checkbox" ${saveTaskEntries[i].completed ? "checked = 'checked' " : ""}  class="completed ${saveTaskEntries[i].completed ? "checked" : ""}"   id="input-${counter}">
                <span class="task-content" ${saveTaskEntries[i].completed ? "style ='text-decoration: line-through' " : ""}>${saveTaskEntries[i].task}</span>
            </div>
            <div class="right-side">
                <button class="edit" ${saveTaskEntries[i].completed ? "" : "disabled"}><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
                <button class="delete"><i class="fa-solid fa-trash-can fa-2x"></i></button>
            </div>
        </li>
        `
        counter ++;
        if(saveTaskEntries[i].completed){
            inputCompletedCounter++;
        }
    }
    bindDeleteBtns();
    bindEditBtns();
    bindCompeletedInput();
    deleteCompletedElements();
    bindDeleteAllBtn();
}
getTasks();