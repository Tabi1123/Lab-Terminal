const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes'); 
const authorRoutes = require('./routes/authorRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/borrowers', borrowerRoutes);

// Start server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
