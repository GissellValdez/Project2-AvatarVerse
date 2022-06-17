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
			image: 'https://cdnb.artstation.com/p/assets/images/images/030/066/201/large/clark-coots-fire.jpg?1599502506',
		},

		{
			name: 'Air',
			tribe: 'Southern & Western Air Temple (aang cycle/era',
			martialArt: '',
			strongestMove: '',
			notableAvatar: '',
			image: 'https://cdna.artstation.com/p/assets/images/images/030/066/208/large/clark-coots-air.jpg?1599502514',
		},

		{
			name: 'Water',
			tribe: 'Northen & Southern Water Tribe',
			martialArt: 'Tai-chi',
			strongestMove: '',
			notableAvatar: 'Korra',
			image:'https://cdnb.artstation.com/p/assets/images/images/030/066/205/large/clark-coots-water.jpg?1599502510',
		},

		{
			name: 'Earth',
			tribe: 'Earth Kingdom',
			martialArt: '',
			strongestMove: '',
			notableAvatar: '',
			image: 'https://cdnb.artstation.com/p/assets/images/images/030/066/195/large/clark-coots-earth.jpg?1599502502',
		},
	]

	// Delete all elements
	Element.deleteMany({})
		.then((deletedElements) => {
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
