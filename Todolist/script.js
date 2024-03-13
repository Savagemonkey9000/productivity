document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const habitForm = document.getElementById("habit-form");
  const inputTitleTodo = document.getElementById("task-title");
  const inputDescTodo = document.getElementById("task-desc");
  const inputDeadlineTodo = document.getElementById("task-deadline");
  const inputCategoryTodo = document.getElementById("task-category");
  const inputTimeEstimateTodo = document.getElementById("task-time-estimate");
  const inputTitleHabit = document.getElementById("habits-title");
  const inputDescHabit = document.getElementById("habits-desc");
  const inputCategoryHabit = document.getElementById("Habit-Priority");
  const habitStreak = document.getElementById("streak");
  const completedTasksList = document.getElementById("completed-tasks");
  let isEditing = false;
  let currentEditingId = null;

  todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (isEditing) {
          updateTask(
              currentEditingId,
              inputTitleTodo.value,
              inputDescTodo.value,
              inputDeadlineTodo.value,
              inputCategoryTodo.value,
              inputTimeEstimateTodo.value
          );
      } else {
          const title = inputTitleTodo.value.trim();
          const desc = inputDescTodo.value.trim();
          const deadline = inputDeadlineTodo.value;
          const category = inputCategoryTodo.value;
          const timeEstimate = inputTimeEstimateTodo.value.trim();

          if (title && desc && deadline && category && timeEstimate) {
              addTask(title, desc, deadline, category, timeEstimate);
              todoForm.reset();
          }
      }
  });

  habitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (isEditing) {
          updateHabit(
              currentEditingId,
              inputTitleHabit.value,
              inputDescHabit.value,
              inputCategoryHabit.value
          );
      } else {
          const title = inputTitleHabit.value.trim();
          const desc = inputDescHabit.value.trim();
          const priority = inputCategoryHabit.value;

          if (title && desc && priority) {
              addHabit(title, desc, priority);
              habitForm.reset();
          }
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
      isEditing = false;
      currentEditingId = null;
  };

  const addHabit = (title, description, priority) => {
      const currentDate = new Date();
      const creationDate = currentDate.toISOString().slice(0, 19).replace("T", " "); // Format timestamp
      const habit = {
          id: Date.now(),
          timestamp: creationDate,
          title,
          description,
          priority,
          streak: 0
      };
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits.push(habit);
      localStorage.setItem("habits", JSON.stringify(habits));
      displayHabits();
  };

  const updateHabit = (
      id,
      title,
      description,
      priority
  ) => {
      const habits = JSON.parse(localStorage.getItem("habits"));
      const habitIndex = habits.findIndex((habit) => habit.id === id);
      habits[habitIndex] = {
          ...habits[habitIndex],
          title,
          description,
          priority
      };
      localStorage.setItem("habits", JSON.stringify(habits));
      displayHabits();
      isEditing = false;
      currentEditingId = null;
  };

  


  const displayTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    completedTasksList.innerHTML = ""; // Clear the completedTasksList

    tasks.forEach((task) => {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p><strong>Time Estimate:</strong> ${task.timeEstimate}</p>
            <p><strong>Category:</strong> ${task.category}</p>
            <button onclick="toggleTaskStatus(${task.id})">
                ${task.done ? "Mark as Not Done" : "Mark as Done"}
            </button>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        if (task.done) {
            completedTasksList.appendChild(taskElement);
            // Add event listeners for editing and deleting tasks in completedTasksList
            const editButton = taskElement.querySelector("button:nth-of-type(2)");
            const deleteButton = taskElement.querySelector("button:nth-of-type(3)");
            editButton.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent event propagation to the task's parent elements
                editTask(task.id);
            });
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent event propagation to the task's parent elements
                deleteTask(task.id);
            });
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




   window.editTask = (id) => {    const tasks = JSON.parse(localStorage.getItem("tasks"));
   const task = tasks.find((task) => task.id === id);
   inputTitleTodo.value = task.title;
   inputDescTodo.value = task.description;
    inputDeadlineTodo.value = task.deadline;
   inputCategoryTodo.value = task.category;
   inputTimeEstimateTodo.value = task.timeEstimate;
   isEditing = true;
    currentEditingId = id;

     // Scroll to the todo section
    const todoSection = document.getElementById("todoApp");
    window.scrollTo({
        top: todoSection.offsetTop,
        behavior: "smooth"
    });
  };

  

  window.deleteTask = (id) => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();

    // Remove task from completedTasksList if it is marked as done
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement && taskElement.parentElement === completedTasksList) {
        taskElement.remove();
    }
};
  
  const displayHabits = () => {
      const habits = JSON.parse(localStorage.getItem("habits")) || [];
      habitStreak.innerHTML = "";
      habits.forEach((habit) => {
          const habitElement = document.createElement("div");
          habitElement.innerHTML = `
              <h3>${habit.title}</h3>
              <p>${habit.description}</p>
              <p><strong>Priority:</strong> ${habit.priority}</p>
              <p><strong>Streak:</strong> ${habit.streak}</p>
              <button onclick="editHabit(${habit.id})">Edit</button>
              <button onclick="deleteHabit(${habit.id})">Delete</button>
              <button onclick="iterateStreak(${habit.id})">streak</button>
          `;
          habitStreak.appendChild(habitElement);
      });
  };

 

  window.editHabit = (id) => {
      const habits = JSON.parse(localStorage.getItem("habits"));
      const habit = habits.find((habit) => habit.id === id);
      inputTitleHabit.value = habit.title;
      inputDescHabit.value = habit.description;
      inputCategoryHabit.value = habit.priority;
      isEditing = true;
      currentEditingId = id;


      // Scroll to the habit section
    const habitSection = document.getElementById("habitsTracker");
    window.scrollTo({
        top: habitSection.offsetTop,
        behavior: "smooth"
    });
  };

  window.deleteHabit = (id) => {
      let habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits = habits.filter((habit) => habit.id !== id);
      localStorage.setItem("habits", JSON.stringify(habits));
      displayHabits();
  };
  
  window.iterateStreak = (id) => {
      let habits = JSON.parse(localStorage.getItem("habits")) || [];
      habits = habits.map(habit => {
          if (habit.id === id) {
              const currentTime = Date.now();
              const timeSinceCreation = currentTime - habit.timestamp; // Calculate time since habit creation
              
              // Check if it's been at least 24 hours since habit creation
              if (timeSinceCreation >= 24 * 60 * 60 * 1000) {
                  const lastStreakIncrement = habit.lastStreakIncrement || 0;
                  
                  
                  if (currentTime - lastStreakIncrement >= 24 * 60 * 60 * 1000) {
                      habit.streak += 1; 
                      habit.lastStreakIncrement = currentTime; 
                  } else {
                      console.log("Cannot increment streak yet. Less than 24 hours since last increment.");
                  }
              } else {
                  console.log("Cannot increment streak yet. Less than 24 hours since habit creation.");
              }
          }
          return habit;
      });
      localStorage.setItem("habits", JSON.stringify(habits));
      displayHabits(); 
  };
  
  
  

  displayTasks();
  displayHabits();
});

function logOut(){
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  window.location.href="../Registeringsida/login.html";
}