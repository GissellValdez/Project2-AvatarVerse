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
			img: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/avatar-the-last-airbender/1/17/Korra_img.jpg',
			animalCompanion: 'Polarbear Dog - Naga',
		},
		{
			name: 'Aang',
			tribe: 'Souther Air Temple',
			img: 'https://static.wikia.nocookie.net/avatar/images/a/ae/Aang_at_Jasmine_Dragon.png',
			animalCompanion: 'Flying Bison - Appa',
		},
		{
			name: 'Roku',
			tribe: 'Fire Nation',
			img: 'https://static.wikia.nocookie.net/avatar/images/f/f6/Roku.png',
			animalCompanion: 'Dragon-Fang',
		},
		{
			name: 'Kyoshi',
			tribe: 'Earth Kingdom',
			img: 'https://static.wikia.nocookie.net/avatar/images/0/07/Avatar_Kyoshi.png',
			animalCompanion: 'Unknown',
		},
		{
			name: 'Kuruk',
			tribe: 'Northern Water Tribe',
			img: 'https://static.wikia.nocookie.net/avatar/images/d/d1/Kuruk.png',
			animalCompanion: 'unknown',
		},
		{
			name: 'Yangchen',
			tribe: 'Western Air Temple',
			img: 'https://static.wikia.nocookie.net/avatar/images/c/c6/Yangchen_cover_image.png',
			animalCompanion: 'unknown',
		},
		{
			name: 'Szeto',
			tribe: 'Fire Nation',
			img: 'https://static.wikia.nocookie.net/avatar/images/9/92/Szeto.png',
			animalCompanion: 'unknown',
		},
		{
			name: 'Salai',
			tribe: 'unknown',
			img: 'https://pbs.twimg.com/media/Ez-185JXIAQl-Y4.jpg',
			animalCompanion: 'unknown',
		},
		{
			name: 'Gun',
			tribe: 'unknown',
			img: 'https://static.wikia.nocookie.net/avatar/images/3/32/Gun.png',
			animalCompanion: 'unknown',
		},
		{
			name: 'Wan',
			tribe: 'Fire Nation',
			img: 'https://static.wikia.nocookie.net/avatar/images/5/51/Wan.png',
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
