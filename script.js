class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }

    getLibrary() {
        return this.library;
    }

    renderTable() {
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = '';
        this.library.forEach((book) => {
            // create the book info
            const tableRow = document.createElement("tr");
            for (let property of book.getProperties()) {
                const tableData = document.createElement("td");
                tableData.textContent = property;
                tableRow.appendChild(tableData);
            }

            // create button for toggling read
            const toggleReadCell = document.createElement("td");
            const toggleReadButton = document.createElement("button");
            toggleReadButton.textContent = 'Toggle read';
            toggleReadButton.setAttribute("data-index", this.library.indexOf(book));
            toggleReadButton.setAttribute("data-action", "toggle-read");
            toggleReadCell.appendChild(toggleReadButton);
            tableRow.appendChild(toggleReadCell);

            // create remove row button
            const removeCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = 'Remove';
            removeButton.setAttribute("data-index", this.library.indexOf(book));
            removeButton.setAttribute("data-action", "remove");
            removeCell.appendChild(removeButton);
            tableRow.appendChild(removeCell);

            tableBody.appendChild(tableRow);
        });
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }

    getProperties() {
        return [this.title, this.author, this.pages, this.read];
    }
}

class DisplayController {
    constructor() {
        this.library = new Library();
        this.dialog = document.querySelector("#dialog");
        this.showDialogButton = document.querySelector("#show-dialog-button");
        this.confirmButton = document.querySelector("#confirm");
        this.titleInput = document.querySelector("#title");
        this.authorInput = document.querySelector("#author");
        this.pagesInput = document.querySelector("#pages");
        this.table = document.querySelector("table");

        this.init();
    }

    init() {
        const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295, true);
        const gameOfThrones = new Book("A Clash of Kings", "George R.R. Martin", 348, false);

        this.library.addBookToLibrary(harryPotter);
        this.library.addBookToLibrary(gameOfThrones);

        this.addEventListeners();
        this.library.renderTable();
    }

    addEventListeners() {
        this.showDialogButton.addEventListener("click", () => {
            this.dialog.showModal();
        });

        this.confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.dialog.close(e.target.value);
        });

        this.dialog.addEventListener("close", () => {
            if (dialog.returnValue === "default") {
                const newBook = new Book(this.titleInput.value, 
                    this.authorInput.value, 
                    parseInt(this.pagesInput.value), 
                    false);
                this.library.addBookToLibrary(newBook);
                this.library.renderTable();
            }

            this.titleInput.value = '';
            this.authorInput.value = '';
            this.pagesInput.value = '';
        });

        this.table.addEventListener("click", (e) => {
            if (e.target.getAttribute("data-action") === 'toggle-read') {
                this.library.getLibrary().at(e.target.getAttribute("data-index")).toggleRead();
                this.library.renderTable();
            } else if (e.target.getAttribute("data-action") === 'remove') {
                this.library.getLibrary().splice(e.target.getAttribute("data-index"), 1);
                this.library.renderTable();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const displayController = new DisplayController();
})