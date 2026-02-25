const addBtn = document.getElementById("addBtn");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function displayNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        noteDiv.innerHTML = `
            ${note}
            <span class="delete-btn" onclick="deleteNote(${index})">Delete</span>
        `;

        notesContainer.appendChild(noteDiv);
    });
}

addBtn.addEventListener("click", function () {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note!");
        return;
    }

    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    displayNotes();
});

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();
    const noteElements = document.querySelectorAll(".note");

    noteElements.forEach(note => {
        if (note.textContent.toLowerCase().includes(searchText)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});

displayNotes();