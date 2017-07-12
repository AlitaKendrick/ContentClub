// ******************************************************************************
// Reply.js 
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var mongoose = require('mongoose');

// =============================================================
// *** Create Schema
// =============================================================
var Schema = mongoose.Schema;

var Reply = new Schema ({
	author: {
		type: String,
		required: true
	},
	text: {
		type: String,
		minlength: 1
	},
	createdAt: {
	    type: Date,
	    default: Date.now
  	}
});


// =============================================================
// *** Create Comment Model
// =============================================================
var Comment = mongoose.model('Reply', Reply);

// =============================================================
// *** Export the Reply Model
// =============================================================
module.exports = Reply;