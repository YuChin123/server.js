var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var openingTimes = new Schema({
	day: String,
	time: String, 
	closed: Boolean, 

 });

var review = new Schema ({
	user: {type: String, required: true},
	review_date :{ type: Date, default :Date.now}, 
	message: String,
	vote: {type: Number, default:0, min: 0, max: 5 }, 

})

var price = new Schema({
	price: Number,
	discountedPrice: Number,
	Discount : {type: Boolean, default: false}
})

var products = new Schema ({
	name: String, 
	description: String,
	image_url: String,
	price: {type:Number, default:0},
	reviews: [review],
	avgRating: Number,
	price: {type:Number, default:0},
})

var places = new Schema ({ 
	name : String,
	address : String, 
	coordinates: [Number],
	facilities: [String],
	avgRating: {type:Number, default:0},
	rating: [review],
	openingHour: [openingTimes],
	dateAdded: {type:Date, default: Date.now},
	products: [products],
})



module.exports = mongoose.model('Place',places)