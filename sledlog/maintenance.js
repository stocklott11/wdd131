const addButton = document.getElementById("add-entry");
const entryList = document.getElementById("entry-list");
const newSledInput = document.getElementById("new-sled-name");
const addSledButton = document.getElementById("add-sled");
const sledSelect = document.getElementById("filter-sled");
const sledHistoryFilter = document.getElementById("filter-sled-history");
const dateFilter = document.getElementById("filter-date");
const serviceFilter = document.getElementById("filter-service-history");

const serviceIcons = {
  "Oil Change": "images/oil.webp",
  "Track Inspection": "images/track.webp",
  "Clutch": "images/Clutch.webp",
  "Pre-Season": "images/preseason.webp",
  "Repairs": "images/repairs.webp",
  "Other": "images/other.webp",
};

let allEntries = [];
let sleds = [];

// Load from localStorage
function loadFromStorage() {
  const storedEntries = localStorage.getItem("sledlog-entries");
  const storedSleds = localStorage.getItem("sledlog-sleds");

  if (storedEntries) allEntries = JSON.parse(storedEntries);
  if (storedSleds) sleds = JSON.parse(storedSleds);
}

// Save to localStorage
function saveToStorage() {
  localStorage.setItem("sledlog-entries", JSON.stringify(allEntries));
  localStorage.setItem("sledlog-sleds", JSON.stringify(sleds));
}

// Populate sled dropdowns
function updateSledOptions() {
  sledSelect.innerHTML = "";
  sledHistoryFilter.innerHTML = '<option value="all">All Sleds</option>';
  sleds.forEach(sled => {
    const option1 = document.createElement("option");
    option1.value = option1.textContent = sled;
    sledSelect.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = option2.textContent = sled;
    sledHistoryFilter.appendChild(option2);
  });

  if (sleds.length === 0) {
    const emptyOption = document.createElement("option");
    emptyOption.disabled = true;
    emptyOption.selected = true;
    emptyOption.textContent = "No sleds available";
    sledSelect.appendChild(emptyOption);
  }  
}

// Update date dropdown
function updateDateOptions() {
  const uniqueDates = [...new Set(allEntries.map(e => e.date))];
  dateFilter.innerHTML = '<option value="all">All Dates</option>';
  uniqueDates.forEach(date => {
    const option = document.createElement("option");
    option.value = option.textContent = date;
    dateFilter.appendChild(option);
  });
}

// Render the filtered list
function renderEntries() {
  entryList.innerHTML = "";
  const selectedDate = dateFilter.value;
  const selectedService = serviceFilter.value;
  const selectedSled = sledHistoryFilter.value;

  const filtered = allEntries.filter(entry =>
    (selectedDate === "all" || entry.date === selectedDate) &&
    (selectedService === "all" || entry.service === selectedService) &&
    (selectedSled === "all" || entry.sled === selectedSled)
  );

  filtered.forEach((entry, index) => {
    const li = document.createElement("li");
    const icon = document.createElement("img");
    icon.src = serviceIcons[entry.service] || "";
    icon.alt = `${entry.service} icon`;
    icon.style.height = "40px";
    icon.style.width = "40px";
    icon.style.marginRight = "0.5em";
    icon.style.verticalAlign = "middle";

    li.appendChild(icon);
    li.append(`${entry.date} - ${entry.sled} - ${entry.service} - Notes: ${entry.notes}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-entry");
    deleteBtn.addEventListener("click", () => {
      allEntries.splice(index, 1);
      saveToStorage();
      updateDateOptions();
      renderEntries();
    });

    li.appendChild(deleteBtn);
    entryList.appendChild(li);
  });
}

// Add Entry
addButton.addEventListener("click", () => {
    const date = document.getElementById("log-date").value;
    const [year, month, day] = date.split("-");
    const formattedDate = `${month}/${day}/${year}`;
    const notes = document.getElementById("log-notes").value.trim();
    const sled = sledSelect.value;
    const service = document.getElementById("filter-service").value;
  
    if (!date || !notes || !sled || !service || service === "All") return;
  
    const entry = { date: formattedDate, notes, sled, service };
    allEntries.push(entry);
    saveToStorage();
  
    updateDateOptions();
    renderEntries();
  
    document.getElementById("log-date").value = "";
    document.getElementById("log-notes").value = "";
  });  

// Add Sled
addSledButton.addEventListener("click", () => {
  const newSled = newSledInput.value.trim();
  if (!newSled || sleds.includes(newSled)) return;

  sleds.push(newSled);
  saveToStorage();
  updateSledOptions();

  newSledInput.value = "";
});

// Filter listeners
[dateFilter, serviceFilter, sledHistoryFilter].forEach(filter => {
  filter.addEventListener("change", renderEntries);
});

// INIT
loadFromStorage();
updateSledOptions();
updateDateOptions();
renderEntries();
