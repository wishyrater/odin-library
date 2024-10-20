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
    
    const table = document.querySelector("#library");
    
    myLibrary.forEach((book) => {
        const tableRow = document.createElement("tr");
        for (let key in book) {
            const tableData = document.createElement("td");
            tableData.textContent = book[key];
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    });

    const dialog = document.querySelector("dialog");
    const addButton = document.querySelector("#add");
    const submitButton = document.querySelector("button[type='submit']");

    addButton.addEventListener("click", () => {
        dialog.showModal();
    });

    submitButton.addEventListener("click", () => {
        dialog.close();
    })

});
