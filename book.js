const bookList = document.getElementById("book-list");
const alertBox = document.getElementById("alert-box");

function getBooks() {
  return localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
}

function displayBooks() {
  const books = getBooks();
  bookList.innerHTML = "";

  if (books.length === 0) {
    bookList.innerHTML = `<tr><td colspan="5" style="text-align:center;">No books available.</td></tr>`;
  } else {
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.dateAdded}</td>
        <td><a href="#" class="delete">X</a></td>
      `;
      bookList.appendChild(row);
    });
  }
}

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const isbn = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    let books = getBooks().filter((b) => b.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(books));
    e.target.parentElement.parentElement.remove();
    showAlert("Book Removed!", "success");
  }
});

function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert ${type} show`;
  setTimeout(() => (alertBox.className = "alert"), 2500);
}

document.addEventListener("DOMContentLoaded", displayBooks);
