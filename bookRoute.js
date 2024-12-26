const express = require('express');
const router = express.Router();

// Mock database for books...

let books = [
    { id: 1, title: "JavaScript Basics", author: "John Doe", availableCopies: 16 },
    { id: 2, title: "Python", author: "Jane Smith", availableCopies: 15 },
];

// Middleware to find a book by ID ...

function findBook(req, res, next) {
    const bookId = parseInt(req.params.id);
    const book = books.find((b) => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }
    req.book = book; // Attach book to the request object
    next();
}

// GET /books - Retrieve all books ...

router.get('/', (req, res) => {
    res.json(books);
});

// GET /books/:id - Retrieve a single book by ID ...

router.get('/:id', findBook, (req, res) => {
    res.json(req.book);
});

// POST /books - Create a new book ...

router.post('/', (req, res) => {
    const { author, bookBorrowed } = req.body;

    // Validate constraints ...

    if (author > 5) {
        return res.status(400).json({ error: "An Author can not be linked with more than 5 books " });
    }
    if (bookBorrowed > 10) {
        return res.status(400).json({ error: "Copies cannot allowed as 100 copies limit is exceded" });
    }

    const newBook = {
        id: books.length + 1, // Simple ID generation ...
        author,
        bookBorrowed: bookBorrowed || 0, // Default to 0 if not provided ...
    };

    books.push(newBook);
    res.status(201).json(newBook); // Return the newly created book ....
});

// PUT /books/:id - Update a book by ID ....

router.put('/:id', findBook, (req, res) => {
    const { title, author, availableCopies } = req.body;

    // Update fields only if provided ...

    if (title) req.book.title = title;
    if (author) req.book.author = author;
    if (availableCopies >= 0) req.book.availableCopies = availableCopies;

    res.json(req.book);
});

// DELETE /books/:id - Delete a book by ID ....

router.delete('/:id', findBook, (req, res) => {
    books = books.filter((b) => b.id !== req.book.id);
    res.json({ message: "Book deleted successfully" });
});

module.exports = router;
