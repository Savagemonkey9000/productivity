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
        const habit = {
            id: Date.now(),
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
            todoList.appendChild(taskElement);
        });
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
            `;
            habitStreak.appendChild(habitElement);
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
        inputTitleTodo.value = task.title;
        inputDescTodo.value = task.description;
        inputDeadlineTodo.value = task.deadline;
        inputCategoryTodo.value = task.category;
        inputTimeEstimateTodo.value = task.timeEstimate;
        isEditing = true;
        currentEditingId = id;
    };

    window.deleteTask = (id) => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    };

    window.editHabit = (id) => {
        const habits = JSON.parse(localStorage.getItem("habits"));
        const habit = habits.find((habit) => habit.id === id);
        inputTitleHabit.value = habit.title;
        inputDescHabit.value = habit.description;
        inputCategoryHabit.value = habit.priority;
        isEditing = true;
        currentEditingId = id;
    };

    window.deleteHabit = (id) => {
        let habits = JSON.parse(localStorage.getItem("habits")) || [];
        habits = habits.filter((habit) => habit.id !== id);
        localStorage.setItem("habits", JSON.stringify(habits));
        displayHabits();
    };

    displayTasks();
    displayHabits();
});
