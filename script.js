// Seleccionamos los elementos
let form = document.getElementById("user-form");
let nameInput = document.getElementById("full-name");
let bookInput = document.getElementById("book-name");
let commentInput = document.getElementById("comment-input");
let commentSection = document.getElementById("comment-section");

// Función para manejar el envío del formulario
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue

    let nameValue = nameInput.value.trim();
    let bookValue = bookInput.value.trim();
    let commentValue = commentInput.value.trim();

    if (nameValue === "" || bookValue === "" || commentValue === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Obtener la fecha y hora actual
    let now = new Date();
    let dateTimeString = now.toLocaleString(); // Formato local de fecha y hora

    // Crear un nuevo comentario
    let commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `<strong>${nameValue}</strong><br>${bookValue}<small>${dateTimeString}</small><br>${commentValue}`;

  // Crear el botón de eliminar
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.classList.add("delete-button");

   // Agregar evento para eliminar el comentario
   deleteButton.addEventListener("click", function() {
    commentElement.remove(); // Borra el comentario al hacer clic
});
   
    // Agregar el botón al comentario
    commentElement.appendChild(deleteButton);

    // Agregar el comentario a la sección de comentarios
    commentSection.appendChild(commentElement);

    // Almanenar los datos en el local storage
    let comment = JSON.parse(localStorage.getItem("comment")) || [];
    comment.push({ name: nameValue, book: bookValue, comment: commentValue, date: dateTimeString });
    localStorage.setItem("comment", JSON.stringify(comment));

    // Limpiar los campos del formulario
    form.reset();
});

// Funcion para cargar los comentarios almacenados en el local storage
window.addEventListener("load", function() {
    let comment = JSON.parse(localStorage.getItem("comment")) || [];

    comment.forEach(function(comment) {
        let commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `<strong>${comment.name}</strong><br>${comment.book}<small>${comment.date}</small><br>${comment.comment}`;

        // Crear el botón de eliminar
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");

        // Agregar evento para eliminar el comentario
        deleteButton.addEventListener("click", function() {
            commentElement.remove(); // Borra el comentario al hacer clic
        });

        // Agregar el botón al comentario
        commentElement.appendChild(deleteButton);

        // Agregar el comentario a la sección de comentarios
        commentSection.appendChild(commentElement);
    });
})
