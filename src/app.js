const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql2 = require('mysql2');
const myConnection = require('express-myconnection');

const app = express();

// importing routes
const inventoryRoutes = require('./routes/product');
const { urlencoded } = require('express');

// settings
app.set('port', process.env.PORT || 3003);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql2, {
   host: 'localhost',
   user: 'root',
   password: '' ,
   port: 3306,
   database: 'inventory_database'
}, 'single'));

app.use(express.urlencoded({extended: false}));

// routes
app.use('/', inventoryRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port 3003');
});