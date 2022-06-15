/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection') // imported from connections' export

////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////

// const Schema = mongoose.Schema
// const model = mongoose.model
// is equal to :

// This short hand is called destructuring and it's creating two variables to pull schema and model from mongoose at the same time.
const { Schema, model } = mongoose

// make elements schema
const elementsSchema = new Schema({
	name: String,
	tribe: String,
	martialArt: String,
	subElement: String,
	notableAvatar: String,
	image: String,
})

// make element model
const Element = model('Element', elementsSchema)

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////

module.exports = Element
