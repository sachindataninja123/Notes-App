const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  const saved = localStorage.getItem("notes");
  if (saved) {
    notesContainer.innerHTML = saved; 
  }
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML); 
}


createBtn.addEventListener("click", () => {
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative"; // needed for positioning the img

  const inputBox = document.createElement("p");
  const img = document.createElement("img");

  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  inputBox.setAttribute("data-placeholder", "Write your note...");

  img.src = "delete.png";
  img.className = "delete-icon";
  img.alt = "Delete";

  wrapper.appendChild(inputBox);
  wrapper.appendChild(img);
  notesContainer.appendChild(wrapper);

  updateStorage();
});


// Click or input handling
notesContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

notesContainer.addEventListener("input", function () {
  updateStorage();
});

notesContainer.addEventListener("blur", (e) => {
  if (e.target.classList.contains("input-box") && e.target.innerText.trim() === "") {
    e.target.innerHTML = "";
    updateStorage();
  }
}, true);

// Prevent Enter from breaking layout
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});

