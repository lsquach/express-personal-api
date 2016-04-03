// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
//
// var db = require('./models');
//
// var new_campsite = {description: "Sharp rocks. Middle of nowhere."};
//
// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }
//
//   console.log("Created new campsite", campsite._id);
//   process.exit(); // we're all done! Exit the program.
// });

var db = require('./models');

var songs_list = [
  {
  song: "What's Up?",
  artist: "4 Non Blondes",
  link: "https://www.google.com",
  releaseDate: "August 14, 1993"
  },
  {
  song: "Possum Kingdom",
  artist: "The Toadies",
  link: "https://www.google.com",
  releaseDate: "November 18, 1995"
  },
  {
  song: "I'm Gonna Be (500 Miles)",
  artist: "The Proclaimers",
  link: "https://www.google.com",
  releaseDate: "August 21, 1993"
  },
  {
  song: "No Rain",
  artist: "Blind Melon",
  link: "https://www.google.com",
  releaseDate: "October 30, 1993"
  },
  {
  song: "Good",
  artist: "Better Than Ezra",
  link: "https://www.google.com",
  releaseDate: "July 8, 1995"
  },
  {
  song: "Breakfast at Tiffany's",
  artist: "Deep Blue Something",
  link: "https://www.google.com",
  releaseDate: "January 20, 1996"
  },
  {
  song: "What I Got",
  artist: "Sublime",
  link: "https://www.google.com",
  releaseDate: "October 26, 1996"
  },
  {
  song: "The Distance",
  artist: "Cake",
  link: "https://www.google.com",
  releaseDate: "November 23, 1996"
  },
  {
  song: "How Bizarre",
  artist: "OMC",
  link: "https://www.google.com",
  releaseDate: "July 26, 1997"
  },
  {
  song: "Harvey Danger",
  artist: "Flagpole Sitta",
  link: "https://www.google.com",
  releaseDate: "August 22, 1998"
  },
  {
  song: "You Get What You Give",
  artist: "New Radicals",
  link: "https://www.google.com",
  releaseDate: "January 30, 1999"
  }
];


db.Song.remove({}, function(err, songs){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all songs');

    // create new records based on the array songs_list
    db.Song.create(songs_list, function(err, songs){
      if (err) { return console.log('err', err); }
      console.log("created", songs.length, "songs");
      process.exit();
    });
  }
});
