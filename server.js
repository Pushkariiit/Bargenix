const express = require('express');
const app = express();
const couponRoutes = require('./routes/couponRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/api/coupons', couponRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
