var express = require('express');
var app = express();
var morgan = require('morgan');

//app.use(morgan)
app.use(express.static('client'));

app.listen(process.env.PORT);

console.log('listen on port '+ process.env.PORT)