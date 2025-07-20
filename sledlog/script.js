document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-entry");
  const entryList = document.getElementById("entry-list");

  addButton.addEventListener("click", () => {
    const date = document.getElementById("log-date").value;
    const notes = document.getElementById("log-notes").value;
    const sled = document.getElementById("filter-sled").value;
    const service = document.getElementById("filter-service").value;

    if (!date || !notes || !sled || !service) return;

    const item = document.createElement("li");
    item.textContent = `${date} - ${sled} - ${service} - Notes: ${notes}`;
    entryList.appendChild(item);

    document.getElementById("log-date").value = "";
    document.getElementById("log-notes").value = "";
  });
});
