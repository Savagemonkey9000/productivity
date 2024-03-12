document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const inputTitle = document.getElementById("task-title");
    const inputDesc = document.getElementById("task-desc");
    const inputDeadline = document.getElementById("task-deadline");
    const inputCategory = document.getElementById("task-category");
    const inputTimeEstimate = document.getElementById("task-time-estimate");
    const todoList = document.getElementById("todo-list");
    const completedTasksList = document.getElementById("completed-tasks");
    let isEditing = false;
    let currentEditingId = null;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (isEditing) {
        updateTask(
          currentEditingId,
          inputTitle.value,
          inputDesc.value,
          inputDeadline.value,
          inputCategory.value,
          inputTimeEstimate.value
        );
      } else {
        addTask(
          inputTitle.value,
          inputDesc.value,
          inputDeadline.value,
          inputCategory.value,
          inputTimeEstimate.value
        );
      }
    });
  
    const addTask = (title, description, deadline, category, timeEstimate) => {
      const task = {
        id: Date.now(),
        title,
        description,
        deadline,
        category,
        timeEstimate,
        done: false
      };
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
      form.reset();
    };
  
    const updateTask = (
      id,
      title,
      description,
      deadline,
      category,
      timeEstimate
    ) => {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const taskIndex = tasks.findIndex((task) => task.id === id);
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title,
        description,
        deadline,
        category,
        timeEstimate
      };
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
      form.reset();
      isEditing = false;
      currentEditingId = null;
    };
  
    const displayTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      todoList.innerHTML = "";
      completedTasksList.innerHTML = "";
      tasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = `
                  <h3>${task.title}</h3>
                  <p>${task.description}</p>
                  <p><strong>Deadline:</strong> ${task.deadline}</p>
                  <p><strong>Time Estimate:</strong> ${task.timeEstimate}</p>
                  <p><strong>Category:</strong> ${task.category}</p>
                  <button onclick="toggleTaskStatus(${task.id})">${
          task.done ? "Mark as Not Done" : "Mark as Done"
        }</button>
                  <button onclick="editTask(${task.id})">Edit</button>
                  <button onclick="deleteTask(${task.id})">Delete</button>
              `;
        if (task.done) {
          completedTasksList.appendChild(taskElement);
        } else {
          todoList.appendChild(taskElement);
        }
      });
    };
  
    window.toggleTaskStatus = (id) => {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const taskIndex = tasks.findIndex((task) => task.id === id);
      tasks[taskIndex].done = !tasks[taskIndex].done;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };
  
    window.editTask = (id) => {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      const task = tasks.find((task) => task.id === id);
      inputTitle.value = task.title;
      inputDesc.value = task.description;
      inputDeadline.value = task.deadline;
      inputCategory.value = task.category;
      inputTimeEstimate.value = task.timeEstimate;
      isEditing = true;
      currentEditingId = id;
    };
  
    window.deleteTask = (id) => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };
  
    displayTasks();
  });
  
  function logOut(){
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href="../Registeringsida/login.html";
}