var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ravi:ravi@ds113606.mlab.com:13606/heroku_lpxrx2lj',(e) =>
{
  if(e)
  {
    return console.log("Error");
  }
  else {
    console.log("Connected");
  }
});
module.export = {mongoose};
