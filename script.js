const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let classes = JSON.parse(localStorage.getItem("timetable")) || [];

function addClass() {
  const subject = document.getElementById("subject").value.trim();
  const day = document.getElementById("day").value;
  const time = document.getElementById("time").value;

  if (!subject || !day || !time) {
    alert("Please fill in all fields!");
    return;
  }

  const newClass = {
    id: Date.now(),
    subject: subject,
    day: day,
    time: time
  };

  classes.push(newClass);

  saveClasses();
  displayTimetable();

  document.getElementById("subject").value = "";
  document.getElementById("day").value = "";
  document.getElementById("time").value = "";
}

function displayTimetable() {
  const timetable = document.getElementById("timetable");

  timetable.innerHTML = "";

  const times = [...new Set(classes.map(item => item.time))].sort();

  times.forEach(time => {
    const row = document.createElement("tr");

    const timeCell = document.createElement("td");
    timeCell.textContent = time;
    row.appendChild(timeCell);

    days.forEach(day => {
      const cell = document.createElement("td");

      const classData = classes.find(
        item => item.day === day && item.time === time
      );

      if (classData) {
        cell.innerHTML = `
          <div class="class-item">
            ${classData.subject}
            <button
              class="delete-btn"
              onclick="deleteClass(${classData.id})">
              Delete
            </button>
          </div>
        `;
      }

      row.appendChild(cell);
    });

    timetable.appendChild(row);
  });
}

function deleteClass(id) {
  classes = classes.filter(item => item.id !== id);

  saveClasses();
  displayTimetable();
}

function clearTable() {
  if (confirm("Are you sure you want to clear the timetable?")) {
    classes = [];

    saveClasses();
    displayTimetable();
  }
}

function saveClasses() {
  localStorage.setItem("timetable", JSON.stringify(classes));
}

displayTimetable();
