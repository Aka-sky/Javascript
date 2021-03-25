// Book CLass =======================================
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks =======================================
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    bookList.appendChild(row);
  }

  static showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    // Create Text node and add to div
    const textContent = document.createTextNode(message);
    div.appendChild(textContent);

    // Grab the parent of the element on top of which to insert
    // the div and also the element
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    // Insert the div
    container.insertBefore(div, form);

    // Remove div after some time (3 sec)
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearInputFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static deleteBook(el) {
    el.remove();
  }
}

// Store Class: Handles Books Storage =================================
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        // Delete this book
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books =======================================
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book =======================================
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get all input values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill all fields!", "danger");
  } else {
    // Create a book Object
    const book = new Book(title, author, isbn);

    // Now display the book
    UI.addBookToList(book);

    // Add book to localStorage
    Store.addBook(book);

    // Clear out input fields
    UI.clearInputFields();

    // Show success alert
    UI.showAlert("Book Added!", "success");
  }
});

// Event: Remove a Book =======================================
document.querySelector("#book-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Delete book from UI
    UI.deleteBook(e.target.parentElement.parentElement);

    // Remove book from localStorage
    const isbn = e.target.parentElement.previousElementSibling.textContent;
    Store.removeBook(isbn);


    // Show book deleted message
    UI.showAlert("Book Deleted!","info")
  }
});
