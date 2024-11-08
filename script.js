document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

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

        addBookToLibrary(library) {
            library.push(this);
        }

        getProperties() {
            return [this.title, this.author, this.pages, this.read];
        }
    }

    class Table {
        constructor(name) {
            this._name = name;
        }

        renderTable(library) {
            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = '';
            library.forEach((book) => {
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
                toggleReadButton.setAttribute("data-index", library.indexOf(book));
                toggleReadButton.setAttribute("data-action", "toggle-read");
                // TO DO: handle event listener in display class
                toggleReadCell.appendChild(toggleReadButton);
                tableRow.appendChild(toggleReadCell);

                // create remove row button
                const removeCell = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.textContent = 'Remove';
                removeButton.setAttribute("data-index", library.indexOf(book));
                removeButton.setAttribute("data-action", "remove");
                removeCell.appendChild(removeButton);
                tableRow.appendChild(removeCell);

                tableBody.appendChild(tableRow);
            })
        }
    }

    function addBooksToTable() {
        tableBody.innerHTML = '';
        myLibrary.forEach((book) => {
            const tableRow = document.createElement("tr");
            for (let key in book) {
                if (typeof book[key] !== 'function') {
                    const tableData = document.createElement("td");
                    tableData.textContent = book[key];
                    tableRow.appendChild(tableData);
                }
            }
            const toggleReadCell = document.createElement("td");
            const toggleReadButton = document.createElement("button");
            toggleReadButton.textContent = 'Toggle read';
            toggleReadButton.setAttribute("data-index", myLibrary.indexOf(book));
            toggleReadButton.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                myLibrary.at(index).toggleRead();
                addBooksToTable(myLibrary);
            });
            toggleReadCell.appendChild(toggleReadButton);
            tableRow.appendChild(toggleReadCell);
            const removeCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = 'Remove';
            removeButton.setAttribute("data-index", myLibrary.indexOf(book));
            removeButton.addEventListener("click", (e) => {
                const index = e.target.getAttribute('data-index');
                myLibrary.splice(index, 1);
                addBooksToTable(myLibrary);
            })
            removeCell.appendChild(removeButton);
            tableRow.appendChild(removeCell);
            tableBody.appendChild(tableRow);
        });
    };

    const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295, true);
    const gameOfThrones = new Book("A Clash of Kings", "George R.R. Martin", 348, false);

    addBookToLibrary(harryPotter);
    addBookToLibrary(gameOfThrones);

    addBooksToTable(myLibrary);

    const dialog = document.querySelector("#dialog");
    const showDialogButton = document.querySelector("#show-dialog-button");
    const confirmButton = document.querySelector("#confirm");
    const titleInput = document.querySelector("#title");
    const authorInput = document.querySelector("#author");
    const pagesInput = document.querySelector("#pages");
    
    showDialogButton.addEventListener("click", () => {
        dialog.showModal();
    });

    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close(e.target.value);
    });

    dialog.addEventListener("close", (e) => {
        if (dialog.returnValue === "default"){
            const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);
            addBookToLibrary(newBook);
            addBooksToTable(myLibrary);
        }

        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
    });


})