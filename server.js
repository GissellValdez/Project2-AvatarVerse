/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // In order to connect to Database
const express = require('express') // import express
const morgan = require('morgan') //import morgan
const methodOverride = require('method-override')
const path = require('path')
const Avatar = require("./models/avatar")
const Element = require("./models/element")


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


//////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
