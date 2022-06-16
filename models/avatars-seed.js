///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('./connection')
const Avatar = require('./avatar') // requiring from the avatar model.

///////////////////////////////////////
// Seed Code
///////////////////////////////////////

// Save the connection in a variable
const db = mongoose.connection // We need this to connect to mongoose to add the following data. 

// Make sure code is not run until connected.
db.on('open', () => {
	/// Avatars Seed Route ///

	// router.get('/seed', (req, res) => {  DELETE THIS WE DON'T NEED IT ANYMORE ZOOM 01:10

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

	// Delete all avatars
	  Avatar.deleteMany({})
    .then((deletedAvatars) => {
      // add the starter avatars
      Avatar.create(lastTenAvatars)
        .then((newAvatars) => {
          // log the new avatars to confirm their creation
          console.log(newAvatars);
          db.close();
        })
        .catch((error) => {
          console.log(error);
          db.close();
        });
    })
    .catch((error) => {
      console.log(error);
      db.close();
    });
})
