////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Fruit = require('../models/avatar')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router(); // helps connect each of our paths to our router.

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

/// Avatars Seed Route ///
router.get('/avatars/seed', (req, res) => {
	// array of last 10 avatars
	const lastTenAvatars = [
		{
			name: 'Korra',
			tribe: 'Northern Water Tribe',
			animalCompanion: 'Polarbear Dog - Naga',
		},
		{
			name: 'Aang',
			tribe: 'Souther Air Temple',
			animalCompanion: 'Flying Bison - Appa',
		},
		{
			name: 'Roku',
			tribe: 'Fire Nation',
			animalCompanion: 'Dragon-Fang',
		},
		{
			name: 'Kyoshi',
			tribe: 'Earth Kingdom',
			animalCompanion: 'Unknown',
		},
		{
			name: 'Kuruk',
			tribe: 'Northern Water Tribe',
			animalCompanion: 'unknown',
		},
		{
			name: 'Yangchen',
			tribe: 'Western Air Temple',
			animalCompanion: 'unknown',
		},
		{
			name: 'Szeto',
			tribe: 'Fire Nation',
			animalCompanion: 'unknown',
		},
		{
			name: 'Salai',
			tribe: 'unknown',
			animalCompanion: 'unknown',
		},
		{
			name: 'Gun',
			tribe: 'unknown',
			animalCompanion: 'unknown',
		},
		{
			name: 'Wan',
			tribe: 'Fire Nation',
			animalCompanion: 'Lion Turtle',
		},
	]

	// Delete all elements
	Avatar.deleteMany({}).then((data) => {
		// Seed All Four Elements
		Avatar.create(lastTenAvatars).then((data) => {
			// send created elements as response to confirm creation
			res.json(data)
		})
	})
})


/// AVATARS Index route ///
router.get('/avatars', async (req, res) => {
	const avatars = await Avatar.find({})
	// find all the avatars
	res.render('avatars/index.liquid', { avatars })
})


// new route
router.get('/signup', (req, res) => {
	// create the new avatar
	Avatar.create(req.body)
		.then((avatar) => {
			// redirect user to index page if successfully created item
			res.redirect('/avatars')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// create route
router.post('/avatars', (req, res) => {
	// create the new avatar
	Avatar.create(req.body)
		.then((avatar) => {
			// redirect user to index page if successfully created item
			res.redirect('/avatars')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// AVATARS show route
router.get('/avatars/:id', (req, res) => {
	// get the id from params
	const id = req.params.id

	// find the particular element from the database
	Avatar.findById(id)
		.then((avatar) => {
			// render the template with the data from the database
			res.render('./avatars/show.liquid', { avatar })
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})


//update route
router.put('/signup/:id', (req, res) => {
	// get the id from params
	const id = req.params.id

	// update the avatar
	Avatar.findByIdAndUpdate(id, req.body, { new: true })
		.then((avatar) => {
			// redirect to main page after updating
			res.redirect('/avatars')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

//destroy route
router.delete('/signup/:id', (req, res) => {
	// get the id from params
	const id = req.params.id
	// delete the avatar
	Avatar.findByIdAndRemove(id)
		.then((avatars) => {
			// redirect to main page after deleting
			res.redirect('/avatars')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
