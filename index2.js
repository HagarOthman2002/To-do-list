const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const leftContainer = document.createElement("div");
    leftContainer.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        taskTextElement.style.textDecoration = "line-through";
        taskTextElement.style.color = "gray";
      } else {
        taskTextElement.style.textDecoration = "none";
        taskTextElement.style.color = "black";
      }
    });

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(taskTextElement);

    const rightContainer = document.createElement("div");
    rightContainer.className = "d-flex align-items-center";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm me-2";
    editBtn.textContent = "Edit";
    editBtn.style.color = "white";
    editBtn.style.background = "#6c757d";
    editBtn.onclick = function () {
      enableEdit(taskTextElement, editBtn);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm";
    deleteBtn.textContent = "Delete";
    deleteBtn.style.color = "white";
    deleteBtn.style.background = "#bfd641";
    deleteBtn.onclick = function () {
      taskList.removeChild(li);
    };

    rightContainer.appendChild(editBtn);
    rightContainer.appendChild(deleteBtn);

    li.appendChild(leftContainer);
    li.appendChild(rightContainer);

    taskList.appendChild(li);

    taskInput.value = "";
  } else {
    alert("Please enter a task!");
  }
}

function enableEdit(taskTextElement, editBtn) {
  const currentText = taskTextElement.textContent;

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.className = "form-control me-2";
  inputField.value = currentText;

  taskTextElement.replaceWith(inputField);

  editBtn.textContent = "Save";
  editBtn.style.background = "#bfd641";
  editBtn.onclick = function () {
    saveEdit(inputField, taskTextElement, editBtn);
  };

  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      saveEdit(inputField, taskTextElement, editBtn);
    }
  });
}

function saveEdit(inputField, taskTextElement, editBtn) {
  const newText = inputField.value.trim();

  if (newText !== "") {
    taskTextElement.textContent = newText;

    inputField.replaceWith(taskTextElement);

    editBtn.textContent = "Edit";
    editBtn.style.background = "#6c757d";
    editBtn.onclick = function () {
      enableEdit(taskTextElement, editBtn);
    };
  } else {
    alert("Task cannot be empty!");
  }
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
