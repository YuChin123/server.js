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

var places = new Schema ({ 
	name : String,
	address : String, 
	coordinates: [Number],
	facilities: [String],
	avgRating: {type:Number, default:0},
	rating: [review],
	openingHour: [openingTimes]
})

module.export = mongoose.model('Place',places)