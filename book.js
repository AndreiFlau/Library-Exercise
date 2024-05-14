let books = [];
const bookCard = document.querySelector(".books");
const body = document.querySelector("body");
const dialog = document.querySelector(".book-dialog");
const addBook = document.querySelector(".addB");
const dialogClose = document.querySelector(".book-dialog > .close-btn");
const dialogAdd = document.querySelector(".book-dialog > .add-btn");
let deleteBook = "";
let bookContainers = "";
let readBook = "";
let read = "";

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read: ${this.read}`;
  };
}

function addBookToLibrary(book) {
  books.push(book);
}

let counter = 0;
function displayBooks() {
  books.forEach((book) => {
    let div = document.createElement("div");
    div.classList = "book-container";
    for (let i = 0; i < 4; i++) {
      let bookInfo = Object.keys(book);
      let bookContent = Object.values(book);
      if (!body.innerHTML.includes(bookContent[0])) {
        let bookInfoCap = bookInfo.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        let remove = document.createElement("button");
        remove.textContent = "Delete Book";
        let read = document.createElement("button");
        read.textContent = "I have read this book";
        read.classList = "readB";
        h2.classList = "item";

        if (i === 3) {
          p.setAttribute("read", `${counter}`);
          read.setAttribute("read", `${counter}`);
        }

        h2.textContent = bookInfoCap[i];
        p.textContent = bookContent[i];
        console.log(bookInfo[1]);
        console.log(bookContent[1]);

        div.appendChild(h2);
        div.appendChild(p);
        console.log(h2);

        if (i === 3) {
          div.setAttribute("book", `${counter}`);
          remove.setAttribute("book", `${counter}`);
          div.appendChild(remove);
          div.appendChild(read);
          document.body.appendChild(div);
          counter += 1;
        }
      }
    }
  });
  deleteBook = document.querySelectorAll(".book-container > button");
  bookContainers = document.querySelectorAll(".book-container");
  readBook = document.querySelectorAll(".readB");
  read = document.querySelectorAll("[read]:not(button)");
}

addBook.addEventListener("click", (e) => {
  dialog.showModal();
});

dialogClose.addEventListener("click", (e) => {
  dialog.close();
});

dialogAdd.addEventListener("click", (e) => {
  const titleError = document.querySelector("#title+ span.error");
  const authorError = document.querySelector("#author+ span.error");
  const pagesError = document.querySelector("#pages+ span.error");
  const readError = document.querySelector("#read+ span.error");
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let pages = document.querySelector("#pages");
  let read = document.querySelector("#read");

  if (title.validity.valueMissing) {
    titleError.textContent = "A title is required";
  } else if (author.validity.valueMissing) {
    authorError.textContent = "A book needs an author";
  } else if (pages.validity.valueMissing) {
    pagesError.textContent = "A book needs pages";
  } else if (read.validity.valueMissing) {
    readError.textContent = "Have you read it?";
  } else {
    titleError.textContent = "";
    authorError.textContent = "";
    pagesError.textContent = "";
    readError.textContent = "";
    let book = new Book(title.value, author.value, pages.value, read.value);

    addBookToLibrary(book);

    displayBooks();
    deleteBooks();
    addReadBook();

    dialog.close();
  }
});

function deleteBooks() {
  deleteBook.forEach((button) => {
    bookContainers.forEach((book) => {
      if (
        button.getAttribute("book") === book.getAttribute("book") &&
        !button.classList.contains("listener")
      ) {
        button.classList = "listener";
        button.addEventListener("click", () => {
          book.remove();
          books.splice(0, 1);
        });
      }
    });
  });
}

function addReadBook() {
  readBook.forEach((button) => {
    read.forEach((read) => {
      if (button.getAttribute("read") === read.getAttribute("read")) {
        button.addEventListener("click", () => {
          if (read.textContent === "Yes") {
            read.textContent = "No";
          } else {
            read.textContent = "Yes";
          }
        });
      }
    });
  });
}

const lotr = new Book("Lord of The Rings", "J.R.R. Tolkien", 500, "Yes");
const pingas = new Book("Pingas", "Dr. Robotnik", 30, "No");

addBookToLibrary(lotr);
addBookToLibrary(pingas);

displayBooks();
deleteBooks();
addReadBook();

// console.log(books[0].author);

// console.log(lotr.info());

// console.log(Object.getPrototypeOf(lotr) === Book.prototype);

// console.log(lotr.valueOf());
