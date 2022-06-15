////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Fruit = require('../models/element')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

/// Elements Seed Route ///
router.get('/elements/seed', (req, res) => {
	const allFourElements = [
		{
			name: 'Fire',
			tribe: 'Fire Nation',
			martialArt: 'Northern Shaolin Kung-Fu',
			subElement: 'lightening Bending',
			notableAvatar: 'Roku',
			image: 'link',
		},

		{
			name: 'Air',
			tribe: 'Southern & Western Air Temple (Aang cycle/era',
			martialArt: 'Bagua',
			subElement: 'n/a NM: Aang - Energy Bending',
			notableAvatar: 'Yang Cheng',
			image: 'link',
		},

		{
			name: 'Water',
			tribe: 'Northen & Southern Water Tribe',
			martialArt: 'Tai-chi',
			subElement: 'Blood Bending',
			notableAvatar: 'Korra',
			image: 'link',
		},

		{
			name: 'Earth',
			tribe: 'Earth Kingdom',
			martialArt: 'Hung/Chow Gar & Southern Praying Mantis',
			subElement: 'Metal Bending',
			notableAvatar: 'Toph',
			image: 'link',
		},
	]

	// Delete all elements
	Element.deleteMany({}).then((data) => {
		// Seed All Four Elements
		Element.create(allFourElements).then((data) => {
			// send created elements as response to confirm creation
			res.json(data)
		})
	})
})

/// ELEMENTS Index Route ///
router.get('/elements', async (req, res) => {
	const elements = await Element.find({})
	res.render('elements/index.liquid', { elements })
})


// ELEMENTS show route
router.get('/elements/:id', (req, res) => {
	// get the id from params
	const id = req.params.id

	// find the particular element from the database
	Element.findById(id)
		.then((element) => {
			// render the template with the data from the database
			res.render('./elements/show.liquid', { element })
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
