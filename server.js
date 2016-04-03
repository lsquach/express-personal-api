// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 });

/************
 * DATABASE *
 ************/

var db = require('./models');
var profile = [
  {
    name: 'Lotus Quach',
    github_link: 'https://github.com/lsquach',
    github_profile_image: 'https://avatars1.githubusercontent.com/u/3513100?v=3&s=460',
    current_city: 'Oakland, CA',
    pets: [
      {name: 'Samson', type: 'Dog', breed: 'Long-Hair Dachshund'},
      {name: 'Franklyn', type: 'Dog', breed: 'Mystery'}
    ],
    family_members: [
      {name: 'Emily', relationship: 'Sister'},
      {name: 'Summit', relationship: 'Brother'},
      {name: 'Adam', relationship: 'Nephew'}
    ]
  }
];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/lsquach/express-personal-api", // CHANGE ME
    base_url: "https://blueberry-surprise-52078.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/songs", description: "Add a 90s One Hit Wonder song"} // CHANGE ME
    ]
  });
});

//get all profile info
app.get('/api/profile', function index(req, res) {
  // send all todos as JSON response
  res.json({ profile: profile });
});

// get all songs
app.get('/api/songs', function (req, res) {
  // send all songs as JSON response
  db.Song.find(function(err, songs){
    if (err) { return console.log("index error: " + err); }
    res.json(songs);
  });
});

// // get one song
// app.get('/api/songs/:id', function (req, res) {
//   db.Songs.findOne({_id: req.params._id }, function(err, data) {
//     res.json(data);
//   });
// });
//
// // create new song
// app.post('/api/songs', function (req, res) {
//   // create new song with form data (`req.body`)
//   console.log('songs create', req.body);
//   var newSong = new db.Song(req.body);
//   newSong.save(function handleDBSongSaved(err, savedSong) {
//     res.json(savedSong);
//   });
// });
//
//
// // delete song
// app.delete('/api/songs/:id', function (req, res) {
//   // get song id from url params (`req.params`)
//   console.log('songs delete', req.params);
//   var songId = req.params.id;
//   // find the index of the song we want to remove
//   db.Song.findOneAndRemove({ _id: songId }, function (err, deletedSong) {
//     res.json(deletedSong);
//   });
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
