//show form area 
let formArea=document.getElementById("formTask");
let cancelBtn=document.getElementById("Cancel");
let showFormbtn=document.querySelector(".container-details button");
let formOverlay=document.querySelector(".form-overlay");
let formBody=document.getElementById("form")
let goHome=function(){
    formArea.style.display="none";
 formOverlay.style.zIndex="1";
 formBody.reset()
 inputTitle.value=""
 textarea.value=""

}
showFormbtn.onclick=function(){
    formArea.style.display="flex";
    formOverlay.style.zIndex="-1";
}
cancelBtn.addEventListener("click",(ev)=>{
    ev.preventDefault()
    goHome()
    
})
//finish show form area
//start collect innformation
let taskContainer=document.querySelector(".tasksArea");
let tasks=[]


let submit =document.getElementById("submit");
let inputTitle=document.getElementById("title");
let textarea=document.querySelector("textarea");
let selectDay=document.querySelector("form select")
let form=document.querySelector("form")
submit.addEventListener("click",(ev) =>{
ev.preventDefault() 
let selectedLevel=document.querySelector("input[name='level']:checked");
 if(inputTitle.value && textarea.value && selectedLevel){
    let date=new Date();
let time=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let task={
    title:inputTitle.value,
    description:textarea.value,
    day:selectDay.value,
    level:selectedLevel.value,
    time:time,
    done:false,
 }

console.log(task)
 tasks.push(task)
 console.log(tasks)
 displayTasks(tasks)
 saveData()
 goHome()
}
else{window.alert("please enter the Task")}
})

let addTask=function(array){
  let taskDiv=document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.innerHTML=`<h3>The title: <span>${array.title}</span></h3>
    <p>Day of the task: <span>${array.day}</span></p>
    <p class="importance">The importance : <span>${array.level}</span></p>
    <p class="the-description" style="line-height:1.6">The description : <span>${array.description}</span></p>
    <button class="delete">Delete</button>
    <button class="done">Done</button>
    <p> created at : <span class="timeOfCreated">${array.time}</span></p>
    `
    if(array.done){
    taskDiv.classList.add("doneTask")
    }
    taskContainer.appendChild(taskDiv);

}

let displayTasks=function(array){
    taskContainer.innerHTML="";
    for(let i=0;i<array.length;i++){
        addTask(array[i])
    }
    
}
let saveData=function(){
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

taskContainer.addEventListener("click",(ev)=>{
if(ev.target.classList.contains("delete")){
    ev.target.parentElement.remove()
    tasks=tasks.filter((task)=>{
        return task.time!==ev.target.parentElement.querySelector("p .timeOfCreated").innerHTML
    })
    localStorage.setItem("tasks",JSON.stringify(tasks))

}
 if(ev.target.classList.contains("done")){
    ev.target.parentElement.classList.toggle("doneTask");
    let taskTime=ev.target.parentElement.querySelector("p .timeOfCreated").innerHTML;
    let task=tasks.find((task)=>{
        return task.time===taskTime;
    })
    if(task){
        task.done=!task.done;
        localStorage.setItem("tasks",JSON.stringify(tasks))
    
 }
 }
})
let getData=function(){
    let data=localStorage.getItem("tasks");
    if(data){
        tasks=JSON.parse(data);
    }
    displayTasks(tasks)
}
getData()
//end collect innformation
//start filter tasks
let filterDay=document.getElementById("listOfDays");
let days=document.querySelectorAll("#listOfDays li");
filterDay.addEventListener("click",(ev)=>{
    for(let i=0;i<days.length;i++){
        days[i].classList.remove("active")
    }
    let selectedDay=ev.target.dataset.day;
    console.log(selectedDay)
    ev.target.classList.add("active")
    if(selectedDay==="all"){
        displayTasks(tasks)
    }else{
        let filteredTasks=tasks.filter((task)=>{
            return task.day===selectedDay;
    })
    displayTasks(filteredTasks)
    }
})
let allBtn=document.querySelector(".container-details ul .all")
let activeBtn=document.querySelector(".container-details ul li:nth-child(2)");
let filterDonefunction=function(){
    allBtn.classList.remove("active")
    activeBtn.classList.remove("active")
    filterDone.classList.add("active")
    
       let tasksDone=tasks.filter((task)=>{
            return task.done===true;
        })
        displayTasks(tasksDone)}
let filterDone=document.querySelector(".filterDone");
filterDone.addEventListener("click",filterDonefunction
    )
 activeBtn.addEventListener("click",(ev)=>{
 
    allBtn.classList.remove("active")
    filterDone.classList.remove("active")
    activeBtn.classList.add("active")
    
         let tasksActive=tasks.filter((task)=>{
            return task.done===false;
        })
        displayTasks(tasksActive)
    })
    allBtn.addEventListener("click",(ev)=>{
    allBtn.classList.add("active")
    filterDone.classList.remove("active")
    activeBtn.classList.remove("active")
    displayTasks(tasks)
    })
 