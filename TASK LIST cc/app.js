//Define UI vars 
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const fliter = document.querySelector('#filter');
const taskInput= document.querySelector('#task');

// load all event listners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event 
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  fliter.addEventListener('keyup', filterTasks);
}

//Get taskmfrom LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create text node and append li 
    li.appendChild(document.createTextNode(task));
    //  create a new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
     //append li to ul
    taskList.appendChild(li);


  });

  
}
// add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task');
    }

    // create li element
    const li = document.createElement('li');
    //add class
    li.className = "collection-item";
    // create text node and append li 
    li.appendChild(document.createTextNode(taskInput.value));
    //  create a new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
  //append li to ul
   taskList.appendChild(li);

   

    // store in Ls 
    storeTaskInLocalStorage(taskInput.value);
    
    //clear input
    taskInput.value = '';

  

  e.preventDefault();
}

    //store in LS
    function storeTaskInLocalStorage (task) {
      let tasks;
      if(localStorage.getItem('tasks') === null){
        tasks = [];
      } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));

    }


// remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure ?')) {
    e.target.parentElement.parentElement.remove();

    // remove fro ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Ls
function removeTaskFromLocalStorage(taskItem) {
  
  let tasks;
      if(localStorage.getItem('tasks') === null){
        tasks = [];
      } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
          tasks.splice(index, 1);
        }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
}


//clear task
function clearTasks() {
 // taskList.innerHTML = "";

  // faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

//clear Tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }
    else{
      task.style.display = 'none';

    }
  });
  
}