///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Element = require('./element') // this is requiring from the element model.

///////////////////////////////////////
// Seed Code
///////////////////////////////////////

// Save the connection in a variable
const db = mongoose.connection // We need this to connect to mongoose to add the following data. 

// Make sure code is not run until connected.
db.on('open', () => {
	// array of all four elements
	const allFiveElements = [
		{
			name: 'Fire',
			tribe: 'Fire Nation',
			martialArt: 'ShaoLin/ Kung-Fu',
			strongestMove: '',
			notableAvatar: 'Roku',
			image: '',
		},

		{
			name: 'Air',
			tribe: 'Southern & Western Air Temple (aang cycle/era',
			martialArt: '',
			strongestMove: '',
			notableAvatar: '',
			image: '',
		},

		{
			name: 'Water',
			tribe: 'Northen & Southern Water Tribe',
			martialArt: 'Tai-chi',
			strongestMove: '',
			notableAvatar: 'Korra',
			image: '',
		},

		{
			name: 'Earth',
			tribe: 'Earth Kingdom',
			martialArt: '',
			strongestMove: '',
			notableAvatar: '',
			image: '',
		},
	]

	// Delete all elements
	Element.deleteMany({})
		.then((deletedAvatars) => {
			// add the starter elements
			Element.create(allFiveElements)
				.then((newElements) => {
					// log the new elements to confirm their creation
					console.log(newElements)
					db.close()
				})
				.catch((error) => {
					console.log(error)
					db.close()
				})
		})
		.catch((error) => {
			console.log(error)
			db.close()
		})
})
