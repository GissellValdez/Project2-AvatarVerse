////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Avatar = require('../models/avatar')

/////////////////////////////////////////
// Create Router (This used to be app.path)
/////////////////////////////////////////
const router = express.Router(); // helps connect each of our paths to our router.

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////

// AUTHORIZATION Middleware   // 
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user");
  }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

/// AVATARS Index route ///   Starting Page/home page for Avatars
router.get('/', async (req, res) => {
	const avatars = await Avatar.find({})
	// find all the avatars
	res.render('../views/avatars/index.liquid', { avatars })
})

// USER - CREATE YOUR OWN AVATAR index route // this shows the logged in user's created avatar
router.get('/my-avatars', async (req, res) => {
	const avatars = await Avatar.find({ username: req.session.username })
	// find all the avatars
	res.render('../views/avatars/index-user-avatars.liquid', { avatars })
})

// NEW route  MY FAVORITE PART -TAKES YOU TO THE PAGE WHERE YOU CREATE NEW AVATAR
router.get('/my-avatars/new', (req, res) => {
	res.render('../views/avatars/new.liquid');
})

// CREATE route //  MY FAVORITE PART - THIS CREATES -THE ACTION- OF POSTING THE CREATED AVATAR TO THE DATABASE WHICH IS THEN SHOWN TO THE SHOW PAGE
router.post('/', (req, res) => {
	req.body.username = req.session.username
	// create the new avatar
	Avatar.create(req.body)
		.then((avatar) => {
			// redirect user to index page if successfully created item
			res.redirect('/avatars/my-avatars')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

// AVATARS show route for last 10 avatars
router.get('/:id', (req, res) => {
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

// SHOW IS THE ROUTE FOR THE AVATARS THE USER CREATED - WHERE THE LINK TAKES YOU
router.get('/my-avatars/:id', (req, res) => {
	// get the id from params
	const id = req.params.id

	// find the particular element from the database
	Avatar.findById(id)
		.then((avatar) => {
			// render the template with the data from the database
			res.render('./avatars/show-user-avatars.liquid', { avatar })
		})
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})


////// EDIT ROUTE/////

router.get("/my-avatars/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Avatar.findById(id)
    .then((avatars) => {
      // render edit page and send fruit data
      res.render('./avatars/edit.liquid', { avatars })
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//update route
router.put('/my-avatars/:id', (req, res) => {
	// get the id from params
	const id = req.params.id

	// update the avatar
	Avatar.findByIdAndUpdate(id, req.body, { new: true })
		.then((avatar) => {
			// redirect to main page after updating
			res.redirect('/')
		})
		// send error as json
		.catch((error) => {
			console.log(error)
			res.json({ error })
		})
})

//destroy route
router.delete('/my-avatars/:id', (req, res) => {
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
module.exports = router
