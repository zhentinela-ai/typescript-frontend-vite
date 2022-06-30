import "toastify-js/src/toastify.css";
import "./style.css";

import { v4 as uuid } from "uuid";

import Toastify from "toastify-js";

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>("#tasksList");

interface Task {
  id: string;
  title: string;
  description: string;
}

let tasks: Task[] = [];

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.push({
    title: title.value,
    description: description.value,
    id: uuid(),
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  Toastify({
    text: "Task added",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d",
    },
  }).showToast();

  renderTask(tasks);

  taskForm.reset();
  title.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  renderTask(tasks);
});

function renderTask(tasks: Task[]) {
  tasksList!.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className =
      "bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer";

    const header = document.createElement("header");
    header.className = "flex justify-between";

    const title = document.createElement("span");
    title.innerText = task.title;

    const btnDelete = document.createElement("button");
    btnDelete.className = "bg-red-500 px-2 py-1 rounded-md";
    btnDelete.innerText = "Delete";

    btnDelete.addEventListener("click", (e) => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTask(tasks);
    });

    header.append(title);
    header.append(btnDelete);

    const description = document.createElement("p");
    description.innerText = task.description;

    taskElement.append(header);
    taskElement.append(description);

    const id = document.createElement("p");
    id.innerText = task.id;
    id.className = "text-gray-400 text-xs";
    taskElement.append(id);

    tasksList?.append(taskElement);
  });
}
