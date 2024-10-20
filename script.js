document.addEventListener("DOMContentLoaded", function () {
    const myLibrary = [];

    function Book(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    
    function addBookToLibrary(book) {
        myLibrary.push(book);
    }
    
    const harryPotter = new Book("Harry Potter", "J.K. Rowling", 295);
    const gameOfThrones = new Book("A Clash of Kings", "George R.R. Martin", 473);
    
    addBookToLibrary(harryPotter);
    addBookToLibrary(gameOfThrones);
    
    const tableBody = document.querySelector("#library tbody");
    
    myLibrary.forEach((book) => {
        const tableRow = document.createElement("tr");
        for (let key in book) {
            const tableData = document.createElement("td");
            tableData.textContent = book[key];
            tableRow.appendChild(tableData);
        }
        tableBody.appendChild(tableRow);
    });

    const showButton = document.querySelector("#show-dialog-button");
    const dialog = document.querySelector("dialog");
    const confirmButton = document.querySelector("#confirm");
    const titleEl = document.querySelector("#title");
    const authorEl = document.querySelector("#author");
    const pagesEl = document.querySelector("#pages");

    showButton.addEventListener("click", () => {
        dialog.showModal();
    });

    dialog.addEventListener("close", () => {
        if (dialog.returnValue === "default" && (titleEl.value && authorEl.value && pagesEl.value)) {
            let newBook = new Book(titleEl.value, authorEl.value, pagesEl.value);
            const tableRow = document.createElement("tr");
            for (key in newBook) {
                const tableData = document.createElement("td");
                tableData.textContent = newBook[key];
                tableRow.appendChild(tableData);
            }
            tableBody.appendChild(tableRow);
        }
    });

    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close(confirmButton.value);
    });
});
