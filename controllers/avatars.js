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

// CREATE route
router.post('/', (req, res) => {
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
/*
// NEW route
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
*/
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

//update route
router.put('/:id', (req, res) => {
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

////// EDIT ROUTE/////

/*
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Fruit.findById(id)
    .then((fruit) => {
      // render edit page and send fruit data
      res.render("fruits/edit.liquid", { fruit });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});
*/

//destroy route
router.delete('/:id', (req, res) => {
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
