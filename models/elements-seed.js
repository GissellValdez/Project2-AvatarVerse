///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Element = require('./element') // this is requiring from the element model.

/// Elements Seed Route ///
router.get('/seed', (req, res) => {
	// array of all four elements
	const allFiveElements = [
		{
			name: 'Fire',
			tribe: 'Fire Nation',
			martialArt: 'ShaoLin/ Kung-Fu',
			strongestMove: 'String',
			notableAvatar: Roku,
			image: String,
		},

		{
			name: 'Air',
			tribe: 'Southern & Western Air Temple (aang cycle/era',
			martialArt: String,
			strongestMove: String,
			notableAvatar: String,
			image: String,
		},

		{
			name: 'Water',
			tribe: 'Northen & Southern Water Tribe',
			martialArt: 'Tai-chi',
			strongestMove: String,
			notableAvatar: 'Korra',
			image: String,
		},

		{
			name: 'Earth',
			tribe: 'Earth Kingdom',
			martialArt: String,
			strongestMove: String,
			notableAvatar: String,
			image: String,
		},

		{
			name: 'Metal',
			tribe: 'Tophs Metal Bending Academy',
			martialArt: String,
			strongestMove: String,
			notableAvatar: 'Aang, Korra (Not sure)',
			image: String,
		},
	]

	// Delete all elements
	Element.deleteMany({}).then((data) => {
		// Seed All Four Elements
		Element.create(lastTenAvatars).then((data) => {
			// send created elements as response to confirm creation
			res.json(data)
		})
	})
})
