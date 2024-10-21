document.addEventListener("DOMContentLoaded", () => {
    const myLibrary = [];

    function Book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    };

    const addBookToLibrary = (book) => myLibrary.push(book);

    const tableBody = document.querySelector("tbody");

    function addBooksToTable() {
        tableBody.innerHTML = '';
        myLibrary.forEach((book) => {
            const tableRow = document.createElement("tr");
            for (let key in book) {
                const tableData = document.createElement("td");
                tableData.textContent = book[key];
                tableRow.appendChild(tableData);
            }
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

    const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295);
    const gameOfThrones = new Book("A Clash of Kings", "George R.R. Martin", 348);

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