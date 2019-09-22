const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

let app = express(); // Export app for other routes to use

require('./models')
app.use(require('./routes'))
  
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect( MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
).then(result => {
  console.log(`Connected with database!`)
}).catch(err => {
  console.log(err);
})
app.listen(port, () => console.log(`Server is listening on port: ${port}`));