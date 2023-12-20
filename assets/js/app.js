const newTask = document.querySelector('#new-task');
const addBtn = document.querySelector('#add-button');
const tasksList = document.querySelector('#tasks-list');
const deleteCompletedBtn = document.querySelector('#delete-completed');
const copyright = document.querySelector('.copyright');

const date = new Date();
const getFullYear = date.getFullYear();

copyright.innerHTML = `<h3>Barış Kahraman Copyright © ${getFullYear} , Tüm Hakları Saklıdır.</h3>`

addBtn.disabled = true;
deleteCompletedBtn.disabled = true;

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
                this.parentElement.parentElement.remove();
                saveTaskEntries.splice(Number(this.parentElement.parentElement.id),1)
                getTasks();
            }
        })
    }
}

let inputCompletedCounter = 0;

function bindCompeletedInput(){
    const completedInputs = document.querySelectorAll('.completed');
    for (const completedInput of completedInputs) {
        completedInput.addEventListener('click',function(){
            if(completedInput.hasAttribute('checked','checked')){
                completedInput.removeAttribute('checked','checked');
                completedInput.nextElementSibling.style.textDecoration = "none";
                completedInput.classList.remove("checked")
                inputCompletedCounter --;
            }else{
                completedInput.setAttribute('checked','checked');
                completedInput.classList.add("checked")
                completedInput.nextElementSibling.style.textDecoration = "line-through";
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
        const completedInputsCheckeds = document.querySelectorAll('.checked');
        for (const completedInputsChecked of completedInputsCheckeds) {
            saveTaskEntries.splice(Number(completedInputsChecked.parentElement.parentElement.id),1);
            completedInputsChecked.parentElement.parentElement.remove();
            getTasks();
        }
            deleteCompletedBtn.disabled = true;
        })
    }else{
        deleteCompletedBtn.disabled = true;
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
    bindCompeletedInput();
    deleteCompletedElements();
    saveTaskToLocalStorage();
}

getTasks();