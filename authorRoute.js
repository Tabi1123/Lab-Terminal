const express = require('express');
const router = express.Router();

// Mock database for authors
let authors = [
    { id: 1, name: "John Doe", bio: "Author of the JavaScript Basics", booksWritten: 5 },
    { id: 2, name: "Jane Smith", bio: "Author of the Python", booksWritten: 5 },
];

// Middleware to find an author by ID ...

function findAuthor(req, res, next) {
    const authorId = parseInt(req.params.id);
    const author = authors.find((a) => a.id === authorId);
    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }
    req.author = author; // Attach author to the request object
    next();
}

// GET /authors - Retrieve all authors
router.get('/', (req, res) => {
    res.json(authors);
});

// GET /authors/:id - Retrieve a single author by ID
router.get('/:id', findAuthor, (req, res) => {
    res.json(req.author);
});

// POST /authors - Create a new author
router.post('/', (req, res) => {
    const { name, bio, booksWritten, linkedBooks } = req.body;

    // Validate input
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Name is required" });
    }
    if (booksWritten < 0) {
        return res.status(400).json({ error: "Books written must be a non-negative number" });
    }
    if (linkedBooks > 5) {
        return res.status(400).json({ error: "Author cannot be linked with more than 5 bokks" });  
    }

    const newAuthor = {
        id: authors.length + 1, // Simple ID generation
        name: name.trim(),
        bio: bio || "No bio available", // Default bio
        booksWritten: booksWritten || 0, // Default to 0
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor); // Return the newly created author
});

// PUT /authors/:id - Update an author by ID
router.put('/:id', findAuthor, (req, res) => {
    const { name, bio, booksWritten } = req.body;

    // Update fields only if provided
    if (name) req.author.name = name.trim();
    if (bio) req.author.bio = bio;
    if (booksWritten >= 0) req.author.booksWritten = booksWritten;

    res.json(req.author);
});

// DELETE /authors/:id - Delete an author by ID
router.delete('/:id', findAuthor, (req, res) => {
    authors = authors.filter((a) => a.id !== req.author.id);
    res.json({ message: "Author deleted successfully" });
});

module.exports = router;

