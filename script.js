const form = document.getElementById("form-list");
const alertBox = document.getElementById("alert-box");

class Book {
  constructor(title, author, isbn, dateAdded) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.dateAdded = dateAdded;
  }
}

class Store {
  static getBooks() {
    return localStorage.getItem("books")
      ? JSON.parse(localStorage.getItem("books"))
      : [];
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert ${type} show`;
  setTimeout(() => (alertBox.className = "alert"), 2500);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const isbn = document.getElementById("isbn").value.trim();

  if (title === "" || author === "" || isbn === "") {
    showAlert("Please fill all fields!", "error");
  } else {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const book = new Book(title, author, isbn, formattedDate);

    Store.addBook(book);
    showAlert("New Book Added!", "success");
    form.reset();
  }
});
