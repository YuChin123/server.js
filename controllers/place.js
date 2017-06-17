var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = require('../app/model/user.js');
var Place = require('../app/model/place.js'); 

exports.postPlaces =function(req, res) {
	var place = new Place();
	place.name = req.body.name;
	place.address = req.body.address;
	place.coordinates = [req.body.latitude, req.body.longitude];
	place.facilities = [req.body.facilities];
	place.avgRating = req.body.avgRating;
	place.rating = req.body.rating;
	place.products = req.body.products;

	//review
	var review = {
		user: req.body.reviewer, 
		message: req.body.message ,
		vote: req.body.vote, 
	}

	//opening time
	var openingTime ={ 
	opening : req.body.opening,
        closed: false,
           days: req.body.days

	}

	place.user = req.user_id
	place.openingHour = [openingTime]; 

	place.save(function(err) {
		if (err)
			res.send(err);
		res.json({ message: 'Place created!' });
	});
}


exports.getPlaces = function(req, res) {
	Place.find(function(err, place) {
		if (err)
			res.send(err);
		res.json(place);
	});
}

exports.deletePlaces = function(req, res) {
	Place.remove({
		_id: req.params.place_id
	}, function(err, place) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
}

exports.getPlace = function(req, res) {
	Place.findById(req.params.place_id, function(err, place) {
		if (err)
			res.send(err);
		res.json(place);
	});
}

exports.deletePlace = function(req, res) {
	Place.remove({
		_id: req.params.place_id
	}, function(err, place) {
		if (err)
			res.send(err);
		res.json({ message: 'Successfully deleted' });
	});
}

exports.postReview = function(req, res) {
	Place.findById(req.params.place_id, function(err, place) {
		if (err)
			res.send(err);
		var newReview = {
			user : req.body.username,
			vote : req.body.vote,
			message : req.body.reviewText, 
		}
// save the review


var totalRating = place.avgRating * place.rating.length 

place.avgRating = (parseInt(totalRating) + parseInt(newReview.vote)) / (place.rating.length + 1)
 
 place.rating.push(newReview)

place.save(function(err) {
	if (err)
		res.send(err);
	res.json({ message: 'Review added!' });
})
})

}

exports.postProducts = function(req, res) {
	Place.findById(req.params.place_id, function(err, place) {
		if (err)
			res.send(err);
		var products = {
			name : req.body.name,
			description : req.body.description,
	
		}
// save the review

 
place.products.push(products)

place.save(function(err) {
	if (err)
		res.send(err);
	res.json({ message: 'Product added!' });
})
})

}

exports.getProducts = function(req, res) {
	Place.findById(req.params.place_id, function(err, place) {
		if (err)
			res.send(err);
		res.json(place.reviews)
	})
}
exports.topFivePlaces = function(req,res){
	Place.find()
.limit(5)
.sort({avgRating:'-1'})
.exec(function(err,places){
	if (err)
		res.send(err);
	res.json(places);
})
}


exports.latestplace =function(req,res){
	Place.find()
	.limit(1)
	.sort({dateAdded:'-1'})
	.exec(function(err,places){
		if(err)
		res.send(err);
	res.json(places);
	})
}


exports.searchplace = function(req,res){
	Place.find ({
		"name": /.*jaya.*/
		///.*:place_query.*/
	})
	.limit(0)
	.sort({name:'-1'})
	.exec(function(err,places){
if(err)
res.send(err);
res.json(places);
})
}


