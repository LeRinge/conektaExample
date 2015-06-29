var express = require('express');
var router = express.Router();
var conekta = require('conekta');



conekta.api_version = '1.0.0';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pay', function(req, res, next) {
  charge = conekta.Charge.create({
  	"currency":'MXN',
  	"amount":4000,
  	"description":"conekta test",
  	"reference_id":"Luis Pay",
  	"bank":{
  		"type":"spei"
  	},
  	details:{
  		"name":"Luis Arturo",
  		"email":"example@gmail.com",
  		"phone":"5512345678",
  		"line_items":[{
  			"name":"Pago de renta",
  			"sku":"sku",
  			"unit_price":1000,
  			"description":"To Luis",
  			"quantity":1,
  			"type":"Pago renta marzo"
  		}]
  	 }
  	}, function (res) {
  		console.log(res.toObject());
  	}, function (err) {
  		console.log(err.message);
  	});

  res.render('index', { title: 'Express' });
});

router.get('/pays', function(req, res, next) {
	
	
		var charges = conekta.Charge.where({
		  'status.in': ['pending_payment', 'paid'],
		  'sort': 'created_at.desc'
		}, function(respondeC) {
			
			res.json({pays:respondeC.toArray()});
		  	
		}, function(err) {
		  
		});
		
		
	
	
});

module.exports = router;
