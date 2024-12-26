
const express = require('express');
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017/tayyab';

const bookSchema = new mongoose.Schema({   // Book Schema Definition
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    availableCopies: {
        type: Number,
        required: true,
        min: [0, 'Copies must be non-negative'],
    }
});

const authorSchema = new mongoose.Schema({   // Author Schema Defination ...
    tname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
    
});

const borrowerSchema = new mongoose.Schema({    // Borrower Schema Definition
    name: {
        type: String,
        required: true
    },
    borrowedBooks: {
        type: String,
        required: true
    },
    membershipActive: {
        type: Boolean,
        required: true
    },
    membershipType: {
        Enum: standard,
        required: true
    }
    
});

module.exports = mongoose.model('Book', bookSchema);
module.exports = mongoose.model('Author', authorSchema);
module.exports = mongoose.model('Borrower', borrowerSchema);

// MongoDB Connection ....

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
  console.log('Connected to MongoDB!');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});



