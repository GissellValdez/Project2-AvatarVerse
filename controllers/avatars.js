////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require('express')
const Avatar = require('../models/avatar')

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router(); // helps connect each of our paths to our router.

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////

// Authorization Middleware
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

/// AVATARS Index route ///
router.get('/', async (req, res) => {
	const avatars = await Avatar.find({})
	// find all the avatars
	res.render('../views/avatars/index.liquid', { avatars })
})

// USER AVATARS index route
router.get('/my-avatars', async (req, res) => {
	const avatars = await Avatar.find({ username: req.session.username })
	// find all the avatars
	res.render('../views/avatars/index-user-avatars.liquid', { avatars })
})

// NEW route
router.get('/my-avatars/new', (req, res) => {
	res.render('../views/avatars/new.liquid');
})

// CREATE route
router.post('/', (req, res) => {
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

// AVATARS show route
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

// USER AVATARS show route
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
