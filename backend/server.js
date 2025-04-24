const express = require('express');
const cors = require('cors');
const app = express();
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');
const path = require('path');

const port = process.env.PORT || 5000;

// CORS for frontend (update with actual frontend URL after deployment)
app.use(cors({
  origin: 'http://localhost:5173', // Update to Render/Netlify URL later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

// Test route
app.get('/test', (req, res) => res.send('Server is running'));

app.listen(port, () => console.log(`Server running on port ${port}`));