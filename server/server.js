var express = require('express');
const _ = require('lodash')
var {ObjectID} = require('mongodb');
var bodyParser = require('body-parser');
var {mongoose} = require('./db-connect/db-connect');
var {Product} = require('./model/product');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.post('/',(req,res) => {

});

app.post('/create', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("create request from server");
  console.log("resutl is"+req.body.name);
  var product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    size: req.body.size,
    price: req.body.price,
    sellingprice: req.body.sellingprice,
    color: req.body.color
  }); 
      product.save().then((doc) => {
      res.send(doc)
      }
  );
});

app.get('/listProduct',(req,res) => {
  Product.find().then((result) =>
{
  res.send(result);
}
);
});

app.get('/getCategory', (req, res) => {
  Product.find().distinct('category').then((result) => {
    res.send(result);
  }
  );
});

app.delete('/delete/:id', (req, res) => {
  var id = req.params.id;
  console.log("ID is "+id);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Product.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});


app.patch('/update/:id', (req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var id = req.params.id;
  console.log(id);
   var body = _.pick(req.body, ['name', 'description', 'category','size','color','price','sellingprice']);

   console.log(body);

  Product.findByIdAndUpdate(id, {$set: body}, {new : true }).then((todo) => {
    if (!todo)
      {
      return res.status(404).send();
      }

      res.send({todo});
      
  }).catch((e) => {
     res.status(404).send();
  })
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
