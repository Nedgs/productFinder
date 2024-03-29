const express = require('express');
const cron = require('node-cron');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Cron job to check product availability twice a day at 9 AM and 6 PM
cron.schedule('0 9,18 * * *', () => {
  console.log('Cron job running...');
  // Add logic to check product availability here
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
