const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const materialRoutes = require('./routes/materialRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'product-management-frontend-seven.vercel.app'}));
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/materials', materialRoutes);
app.use('/uploads', express.static('public/uploads'));

app.use('/media', mediaRoutes);


db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.stack);
      return;
    }
  
    console.log('Database connected.');
  
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  });
