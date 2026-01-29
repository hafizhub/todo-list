const taskInput = document.getElementById("taskInput")
const taskList = document.getElementById("taskList")
const form = document.getElementById("taskForm")

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

renderTasks()

form.addEventListener("submit", e=>{
    e.preventDefault()
    const text = taskInput.value.trim()
    if(!text) return

    tasks.push({ text, completed:false })
    saveAndRender()
    taskInput.value=""
})

function renderTasks(){
    taskList.innerHTML = ""
    tasks.forEach((task,index)=>{
        taskList.innerHTML += `
        <li>
            <div class="task ${task.completed ? "completed":""}">
                <button class="check" onclick="toggleTask(${index})">✓</button>
                <span>${task.text}</span>
            </div>
            <div class="actions">
                <button class="delete" onclick="deleteTask(${index})">✕</button>
            </div>
        </li>
        `
    })
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed
    saveAndRender()
}

function deleteTask(index){
    tasks.splice(index,1)
    saveAndRender()
}

function saveAndRender(){
    localStorage.setItem("tasks",JSON.stringify(tasks))
    renderTasks()
}
