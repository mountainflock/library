const book1 = new Book("Pride and Predjudice", "Jane Austen", 345, false);
const book2 = new Book("Anna Karenina", "Leo Tolstoy", 413, true);
const book3 = new Book("L'Homme Qui Rit", "Victor Hugo", 649, false);
const book4 = new Book("Comet in Moominland", "Tove Yanson", 390, true);

let myLibrary = [book1, book2, book3, book4];

const bookList = document.querySelector("#book-list");
const form = document.querySelector("#form-main");
const inputs = document.querySelectorAll("input");
const newBookButton = document.querySelector("#new-book-button");
const submitButton = document.querySelector("#submit-button");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, isRead) {
  if (document.querySelector("#read").checked === true) {
    isRead = true;
  }
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    createBookItem(i);
  }
}

function changeStatus(item) {
  if (myLibrary[item].read === true) {
    myLibrary[item].read = false;
  } else {
    myLibrary[item].read = true;
  }
  bookList.textContent = "";
  displayBooks();
}

function removeBook(item) {
  myLibrary = myLibrary.filter(function (books) {
    return books !== myLibrary[item];
  });
  bookList.textContent = "";
  displayBooks();
}

newBookButton.addEventListener("click", () => {
  form.classList.add("form-visible");
});

submitButton.addEventListener("click", function (event) {
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").value;

  if (bookTitle !== "" && bookAuthor !== "" && bookPages !== 0) {
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    bookList.textContent = "";
    displayBooks();
    event.preventDefault();
  }
});

function createBookItem(i) {
  const bookItem = document.createElement("div");
  bookList.appendChild(bookItem);

  const bookItemTitle = document.createElement("div");
  bookItemTitle.textContent = `${myLibrary[i].title}`;
  bookItemTitle.classList.add("book-item-text");
  bookItemTitle.classList.add("book-item-title");
  bookItem.appendChild(bookItemTitle);

  const bookItemAuthor = document.createElement("div");
  bookItemAuthor.textContent = `${myLibrary[i].author}`;
  bookItemAuthor.classList.add("book-item-text");
  bookItemAuthor.classList.add("book-item-author");
  bookItem.appendChild(bookItemAuthor);

  const bookItemPages = document.createElement("div");
  bookItemPages.textContent = `${myLibrary[i].pages} pages`;
  bookItemPages.classList.add("book-item-text");
  bookItemPages.classList.add("book-item-pages");
  bookItem.appendChild(bookItemPages);

  const bookItemRead = document.createElement("div");
  bookItemRead.textContent = `${
    myLibrary[i].read === true ? "read" : "unread"
  }`;
  if (myLibrary[i].read === true) {
    bookItem.classList.add("book-item-status-read");
  }
  bookItemRead.classList.add("book-item-text");
  bookItemRead.classList.add("book-item-read");
  bookItem.appendChild(bookItemRead);

  bookItem.classList.add("book");
  bookItem.dataset.index = `${i}`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🗑️";
  deleteButton.classList.add("delete-button");

  const bookButtonsSection = document.createElement("div");
  bookButtonsSection.classList.add("book-button-section");
  bookButtonsSection.appendChild(deleteButton);
  bookItem.appendChild(bookButtonsSection);

  deleteButton.addEventListener("click", () => {
    const itemToDelete = bookItem.dataset.index;
    removeBook(itemToDelete);
  });
  const changeStatusButton = document.createElement("button");
  changeStatusButton.setAttribute("id", "change-status-button");
  changeStatusButton.textContent = "Change status";
  bookButtonsSection.appendChild(changeStatusButton);
  changeStatusButton.addEventListener("click", () => {
    const itemToStatusChange = bookItem.dataset.index;
    changeStatus(itemToStatusChange);
  });
}

displayBooks();
