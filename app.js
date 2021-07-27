const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require("./config");

const app = express();

// Connection to MongoDB
mongoose.connect(config.db.connectionUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(db => console.log('DB Connected')).catch(err => console.log(err));

// Importing routes
var indexRoutes = require('./routes/routeIndex');

// Settings
app.use('/public',express.static('public'))
app.set('port', config.app.port);
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.json());
    
// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

// Routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
});