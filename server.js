/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // In order to connect to Database
const express = require('express') // import express
const morgan = require('morgan') //import morgan
const methodOverride = require('method-override')
const path = require('path')
const mongoose =require("./models/connection") // imported from connections' export

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
	tribe: String,
	animalCompanion: String,
	avatarStateAge: Number,
	rival: String,
	signatureMove: String,
	accomplishments: String, // should have an option of 3 different accomplishments - use an array.
	goToElement: String,
	ageOfDeath: Number,
})

// make model
const Avatar = model('avatar', avatarsSchema)

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

/////////////////////////////////////////////////
// Create our Express Application Object Bind Liquid Templating Engine
/////////////////////////////////////////////////
const app = require('liquid-express-views')(express(), {
	root: [path.resolve(__dirname, 'views/')],
})

/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan('tiny')) //logging
app.use(methodOverride('_method')) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static('public')) // serve files from public statically

////////////////////////////////////////////
// Routes
////////////////////////////////////////////

/// Root Route ///

app.get('/', (req, res) => {
	res.render('root.liquid')
})

/// Avatars Seed Route ///
app.get('/avatars/seed', (req, res) => {
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

/// Elements Seed Route ///
app.get('/elements/seed', (req, res) => {
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

/// AVATARS Index route ///
app.get('/avatars', async (req, res) => {
	const avatars = await Avatar.find({})
	// find all the avatars
	res.render('avatars/index.liquid', { avatars })
})

/// ELEMENTS Index Route ///
app.get('/elements', async (req, res) => {
	const elements = await Element.find({})
	res.render('elements/index.liquid', { elements })
})

// new route
app.get('/signup', (req, res) => {
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
app.post('/avatars', (req, res) => {
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
app.get('/avatars/:id', (req, res) => {
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

// ELEMENTS show route
app.get('/elements/:id', (req, res) => {
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

//update route
app.put('/signup/:id', (req, res) => {
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
app.delete('/signup/:id', (req, res) => {
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

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
