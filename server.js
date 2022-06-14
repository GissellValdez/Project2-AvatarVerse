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

/* Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error));
  */

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
   strongestMove: String,
   notableAvatar: String,
   image: String,
})
 
// make element model
const Element = model("Element", elementsSchema)
