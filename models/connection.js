/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config() // In order to connect to Database
const mongoose = require('mongoose')

/////////////////////////////////////////////
// Database Connection CONNECTING APPLICATION TO DATABASE MONGODB
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.MONGODB_URI
const CONFIG = {
	//gets rid of deprecation warning
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
	.on('open', () => console.log('Connected to Mongoose'))
	.on('close', () => console.log('Disconnected from Mongoose'))
	.on('error', (error) => console.log(error))

////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose;  // When you export mongoose you don't need to require it again in another module.