const express = require('express');
const categoryRoute = require('./routes/categoryroute');
const productRoute = require('./routes/productRoute');
const port = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Testing Node.js app'));

app.use('/categories',categoryRoute);
app.use('/products',productRoute);
// console.log(process.env.DATABASE_URL);
app.listen(port, () =>  console.log(`Server is running on port ${port}`));