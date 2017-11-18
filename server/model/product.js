var mongoose = require('mongoose');

var Product = mongoose.model('Product', {
  name: {
    type: String
  },
  description: {
    type: String
  },
  category:
  {
    type: String
  },
  size:
  {
    type: String
  },
  price: {
    type: String
  },
  sellingprice: {
    type: String
  }

});

module.exports = {Product};
