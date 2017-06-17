
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

var User = require('./app/model/user.js');
var Place = require('./app/model/place.js'); 

var passport = require('passport')
var authController = require('./controllers/auth.js')
var placeController = require ('./controllers/place.js')

var mongoose = require('mongoose');
mongoose.connect('mongodb://ADA_yc:ADAyc@ds161041.mlab.com:61041/ada')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port
var router = express.Router();
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });  
});


router.route('/places')
.post(authController.isAuthenticated, placeController.postPlaces)
.delete(authController.isAuthenticated, placeController.deletePlaces)
.get(placeController.getPlaces)


router.route('/places/:place_id')
.get(placeController.getPlace)
.delete(placeController.deletePlace)

//review 

router.route('/places/:place_id/reviews')
.post(placeController.postReview)


//review 

router.route('/places/:place_id/products')
.post(placeController.postProducts)
.get(placeController.getProducts)


router.route('/topfiveplaces')
.get(placeController.topFivePlaces)


router.route('/latestplace')
.get(placeController.latestplace)

router.route('/search/place/:place_query')
.get(placeController.searchplace)





router.route('/login')
.post(function(req,res){
	User.find()
	.where('username').equals(req.body.username)
	.where('password').equals(req.body.password)
	.exec(function(err,user){
		
		if (err)
			res.send(err);
		res.json(user)

	})
})

router.route('/register')
.post(function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password
	user.save(function(err){
		if (err) 
			res.send(err);

		res.json({message: 'User created!' });
	});
})


app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);