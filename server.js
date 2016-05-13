var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');



//app.use(morgan)
app.use(express.static('client'));


var filepath = path.join(__dirname,'./music/test.mp3')

app.get('/music', function(req ,res){
  res.set({'Content-Type': 'audio/mpeg'});
  var readStream = fs.createReadStream((filepath));
  readStream.pipe(res);
});



app.listen(process.env.PORT);

console.log('listen on port '+ process.env.PORT)