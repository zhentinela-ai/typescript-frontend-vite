import "./style.css";

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  interface Task {
    title: string;
    description: string;
  }

  let tasks: Task[] = [];

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.push({
    title: title.value,
    description: description.value,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
});
