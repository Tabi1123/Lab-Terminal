const express = require('express');
const router = express.Router();

// Mock database for borrowers
let borrowers = [
    { id: 1, name: "tayyab", email: "tayyabce@example.com", phone: "1234567890", borrowedBooks: [] },
    { id: 2, name: "Ahmad", email: "ahmad@example.com", phone: "0987654321", borrowedBooks: [1] },
];

// Middleware to find a borrower by ID
function findBorrower(req, res, next) {
    const borrowerId = parseInt(req.params.id);
    const borrower = borrowers.find((b) => b.id === borrowerId);
    if (!borrower) {
        return res.status(404).json({ error: "Borrower not found" });
    }
    req.borrower = borrower; // Attach borrower to the request object
    next();
}

// GET /borrowers - Retrieve all borrowers
router.get('/', (req, res) => {
    res.json(borrowers);
});

// GET /borrowers/:id - Retrieve a single borrower by ID
router.get('/:id', findBorrower, (req, res) => {
    res.json(req.borrower);
});

// POST /borrowers - Create a new borrower
router.post('/', (req, res) => {
    const { name, email, phone, membershipType } = req.body;

    // Validate input
    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required" });
    }
    if(membershipType == premium){
        return ("You can borrow up to 10 books");
    }

    if(membershipType == standard){
        return ("You can borrow up to 5 books");
    }

    const newBorrower = {
        id: borrowers.length + 1, // Simple ID generation
        name,
        email,
        phone: phone || null,
        borrowedBooks: [], // Initialize with no borrowed books
    };

    borrowers.push(newBorrower);
    res.status(201).json(newBorrower); // Return the newly created borrower
});

// PUT /borrowers/:id - Update a borrower by ID
router.put('/:id', findBorrower, (req, res) => {
    const { name, email, phone } = req.body;

    // Update fields only if provided
    if (name) req.borrower.name = name;
    if (email) req.borrower.email = email;

    res.json(req.borrower);
});

// DELETE /borrowers/:id - Delete a borrower by ID
router.delete('/:id', findBorrower, (req, res) => {
    borrowers = borrowers.filter((b) => b.id !== req.borrower.id);
    res.json({ message: "Borrower deleted successfully" });
});

module.exports = router;
