const express = require('express');
const app = express();
const env = require('dotenv');


// Enviroment variables
env.config();

// Utilizamos modulo de base de datos
require('./database');

app.use(express.json());

// Utilizo modulos de rutas
app.use(require('./routes/auth.routes'));
app.use(require('./routes/adminAuth.routes'));
app.use(require('./routes/category.routes'));
app.use(require('./routes/product.routes'));
app.use(require('./routes/cart.routes'));


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
    });