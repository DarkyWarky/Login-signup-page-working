const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')
const route = require("./routes/routers.js");
const mongoose = require('mongoose')
const user_routes =require('./routes/userroute.js')

require('dotenv').config()

const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)

app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
}));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/', route);

app.use('/api',user_routes);

app.listen(3000,()=>{
  console.log("http://localhost:3000")
});