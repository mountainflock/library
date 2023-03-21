const book1 = new Book("Pride and Predjudice", "Jane Austen", 345, false);
const book2 = new Book("Anna Karenina", "Leo Tolstoy", 413, true);
const book3 = new Book("L'Homme Qui Rit", "Victor Hugo", 649, false);
const book4 = new Book("Comet in Moominland", "Tove Yanson", 390, true);

let myLibrary = [book1, book2, book3, book4];

const bookList = document.querySelector("#book-list");
const form = document.querySelector(".form-main");
const inputs = document.querySelectorAll("input");
const newBookButton = document.querySelector("#new-book-button");
const submitButton = document.querySelector("#submit-button");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
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
  form.classList.remove("form-invisible");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const bookTitle = document.querySelector("#title").value;
  const bookAuthor = document.querySelector("#author").value;
  const bookPages = document.querySelector("#pages").value;
  const bookRead = document.querySelector("#read").checked;

  if (bookTitle !== "" && bookAuthor !== "" && bookPages !== 0) {
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    bookList.textContent = "";
    form.classList.add("form-invisible");
    displayBooks();
  }
});

function createElement(tag, parent, textContent, classList) {
  const el = document.createElement(tag);
  if (textContent != null) {
    el.textContent = textContent;
  }
  if (classList != null) {
    el.classList.add(...classList);
  }
  parent.appendChild(el);
  return el;
}

function createBookItem(i) {
  const bookItem = createElement("div", bookList, null, [
    "book",
    ...(myLibrary[i].read ? ["book-item-status-read"] : []),
  ]);
  bookItem.dataset.index = `${i}`;

  createElement("div", bookItem, `${myLibrary[i].title}`, [
    "book-item-text",
    "book-item-title",
  ]);

  createElement("div", bookItem, `${myLibrary[i].author}`, [
    "book-item-text",
    "book-item-author",
  ]);

  createElement("div", bookItem, `${myLibrary[i].pages} pages`, [
    "book-item-text",
    "book-item-pages",
  ]);

  createElement("div", bookItem, myLibrary[i].read ? "read" : "unread", [
    "book-item-text",
    "book-item-read",
  ]);

  const bookButtonsSection = createElement("div", bookItem, null, [
    "book-button-section",
  ]);

  const deleteButton = createElement("button", bookButtonsSection, "🗑️", [
    "delete-button",
  ]);
  deleteButton.addEventListener("click", () => {
    const itemToDelete = bookItem.dataset.index;
    removeBook(itemToDelete);
  });

  const changeStatusButton = createElement(
    "button",
    bookButtonsSection,
    "Change status",
    ["change-status-button"]
  );
  changeStatusButton.addEventListener("click", () => {
    const itemToStatusChange = bookItem.dataset.index;
    changeStatus(itemToStatusChange);
  });
}

displayBooks();
