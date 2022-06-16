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

// make Avatars Schema
const avatarsSchema = new Schema({
	name: String,
	img: String,
	tribe: String,
	animalCompanion: String,
	avatarStateAge: Number,
	rival: String,
	signatureMove: String,
	accomplishments: String, // should have an option of 3 different accomplishments - use an array.
	goToElement: String,
	ageOfDeath: Number,
	username: String,
})

// make model
const Avatar = model('avatar', avatarsSchema)


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////

module.exports = Avatar