let form = document.getElementById('form');
let title = document.getElementById('title-input');
let datetime = document.getElementById('datetime');
let taskList = document.getElementById('task-list');
// let add = document.getElementById('add');



let msg = document.getElementById("msg");

let todo = [];


form.addEventListener("submit" , (e)=>{
    e.preventDefault();
    formvalidation();
}) 

function formvalidation(){
    // datetime = datetime.replace("T", " ");
    if (title.value==="") {
        msg.innerHTML = "Task can't be blank";
    } else {
        msg.innerHTML = ""
        acceptData();
    }

}


let acceptData = ()=>{
   let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);

    todo.push(
        {
         id:        uid,
         title:     title.value,
         datetime:  datetime.value
        //  .replace("T", " ")
        }
    )
    localStorage.setItem("data" , JSON.stringify(todo))
    createTask();
    console.log(todo);
    add.setAttribute ("data-dismiss","modal");
    add.click();
    (()=>{
        add.setAttribute ("data-dismiss","");
    })()

}

let createTask =()=>{
    taskList.innerHTML = "";
    todo.map((x)=>{
     return  taskList.innerHTML += `
        <li class="list-group-item" id=${x.id}>
            <div class="todo-indicator bg-warning"></div>
            <div class="widget-content p-0">
              <div class="widget-content-wrapper">
                
                <div class="widget-content-left">
                  <div class="widget-heading">${x.title}</div>
                  <div class="widget-subheading"><i>${x.datetime}</i></div>
                </div>
              
              <div class="widget-content-right">
                <button onclick ="editTask(${x.id})" data-toggle="modal" data-target="#exampleModal" class="border-0 btn-transition btn btn-outline-success">
                  <i class="fa fa-edit"></i></button>
                  <button onclick ="deleteTask(${x.id})" class="border-0 btn-transition btn btn-outline-danger">
                 <i class="fa fa-trash"></i>
                </button>
              </div>
              </div>
            </div>
          </li>
        `
    });
    resetForm();
}


let resetForm = ()=>{
   title.value = ""
   datetime.value=""
}


let deleteTask = (e) =>{
console.log(e.id)
if (confirm("Want to delete?")) {
// alert("Deleted")
todo = todo.filter((x) => x.id!==e.id);
} 

localStorage.setItem("data" , JSON.stringify(todo))
createTask();
}


let editTask = (e) =>{
 
// console.log(e)
search = todo.find((x) => x.id===e.id); 
todo = todo.filter((x) => x.id!==e.id);

  if (search) {
    id = e.id;
    title.value= search.title;
    datetime.value= search.datetime;
  }


localStorage.setItem("data" , JSON.stringify(todo))

}
(()=>{
todo = JSON.parse(localStorage.getItem("data"))||[];
console.log(todo)
createTask();
})()