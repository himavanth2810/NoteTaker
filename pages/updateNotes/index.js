const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

console.log(noteId);

const updateNoteButton = document.querySelector(".create-note-button");
const deleteNoteButton = document.querySelector(".delete-note-button");

const apiUrl = "https://authentication-notetaker.herokuapp.com";

const token = localStorage.getItem("jwt");

let Noteheading = document.querySelector(".create-note-heading");
let Notecontent = document.querySelector(".create-note-input");

window.addEventListener("load",  () => {
  fetch(`${apiUrl}/note/update/${noteId}`, {
      method: "GET",
      headers: {
          authorization: token,
      }

  }).then((data) => {
      return data.text()
  }).then((result) => {
      const array = JSON.parse(result)
      Noteheading.value = array[0].heading;
      Notecontent.value = array[0].content;
  })
})

updateNoteButton.addEventListener("click", () => {
  const content = Notecontent.value;
  const heading = Noteheading.value;

  if (token) {
    fetch(`${apiUrl}/note/update/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ content, heading }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "/pages/dashboard/dashboard.html";
        }
      })
      .catch((err) => {
        alert("Error Creating Note!! Re-try....");
        console.log(err);
      });
  }
});

deleteNoteButton.addEventListener("click", () => {
  if (token) {
    fetch(`${apiUrl}/note/delete/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          location.href = "/pages/dashboard/dashboard.html";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error Deleting Note!! Re-try....");
      });
  }
});