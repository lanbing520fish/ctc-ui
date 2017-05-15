var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MovieSchema = new Schema({
  directory: {
    type: ObjectId,
    ref: 'Directory'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  name: String,
  url: Array,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
})

MovieSchema.pre('save', function(next) {
	if (this.isNew) {
		this.createAt = this.updateAt = Date.now()
	} else {
		this.updateAt = Date.now()
	}

	next()
})

MovieSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('updateAt').exec(cb)
	},
	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb)
	}
}

module.exports = MovieSchema
