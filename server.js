/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // Load ENV Variables
const express = require('express') // import express
const morgan = require('morgan') //import morgan
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const path = require('path')

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
	//gets rid of deprecation warning
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));
  

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
const avatar = model("avatar", avatarsSchema)
 
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
const Element = model("Element", elementsSchema)

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

/// Seed Route ///
app.get('/seed', (req, res) => {
	// array of last 10 avatars
	const lastTenAvatars = [
		{ name: 'Korra', tribe: 'Northern Water Tribe', animalCompanion:'Polarbear Dog - Naga'},
		{ name: 'Aang', tribe: 'Souther Air Temple', animalCompanion:'Flying Bison - Appa' },
		{ name: 'Roku', tribe 'Fire Nation', animalCompanion: 'Dragon-Fang' },
		{ name: 'Kyoshi', tribe 'Earth Kingdom', animalCompanion: 'Unknown' },
		{ name: 'Kuruk', tribe 'Northen Water Tribe', animalCompanion: 'unknown' },
        { name: 'Yangchen', tribe: 'Western Air Temple', animalCompanion: 'unknown'},
        { name: 'Szeto', tribe: 'Fire Nation', animalCompanion: 'unknown'},
        { name: 'Salai', tribe: 'unknown', animalCompanion: 'unknown'},
        { name: 'Gun', tribe: 'unknown', animalCompanion: 'unknown'},
        { name: 'Wan', tribe: 'Fire Nation', animalCompanion: 'Lion Turtle'},
	]
    const allFourElements = [
        {name: 'Fire', tribe: 'Fire Nation', martialArt: 'Northern Shaolin Kung-Fu', subElement: 'lightening Bending', notableAvatar: 'Roku', image: 'link'},

        {name: 'Air', tribe: 'Southern & Western Air Temple (Aang cycle/era', martialArt:'Bagua', subElement: 'n/a NM: Aang - Energy Bending', notableAvatar: 'Yang Cheng', image: 'link'},

        {name: 'Water', tribe:'Northen & Southern Water Tribe', martialArt:'Tai-chi', subElement: 'Blood Bending', notableAvatar:'Korra', image: 'link'},

        {name: 'Earth', tribe: 'Earth Kingdom', martialArt:'Hung/Chow Gar & Southern Praying Mantis', subElement: 'Metal Bending', notableAvatar: 'Toph', image: "link"},



    ]


	// Delete all avatars
	Avatar.deleteMany({}).then((data) => {
		// Seed Last Ten Avatars
		Avatar.create(lastTenAvatars).then((data) => {
			// send created avatars as response to confirm creation
			res.json(data)
		})
	})

    	// Delete all elements
	Element.deleteMany({}).then((data) => {
		// Seed All Four Elements
		Avatar.create(allFiveElements).then((data) => {
			// send created elements as response to confirm creation
			res.json(data)
		})
	})
})

// AVATARS index route
app.get('/avatars', (req, res) => {
    res.render('./avatars/index', {

    })
})

// ELEMENTS index route
app.get('/elements', (req, res) => {
    res.render('./elements/index', {

    })
})

// new route
app.get('/signup', (req, res) => {
    res.render('new.liquid')
})


// AVATARS show route
app.get('/avatars/:id', (req,res) => {
    res.render('./avatars/show', {
        
    }) 
})

// ELEMENTS show route
app.get('/elements/:id', (req,res) => {
    res.render('./elements/show', {
        
    }) 
})

// create route
app.post('/avatars', (req, res) => {


})


//update route
app.put('/signup/:id', (req, res) => {

})

//destroy route
app.delete('/signup/:id', (req, res) => {

})

//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
