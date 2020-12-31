const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minLength: 2
	},
	author: {
		type: String,
		required: true,
		minLength: 4
	},
	url: {
		type: String,
		required: true,
		unique: true,
		minLength: 12
	},
	likes: Number
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)
