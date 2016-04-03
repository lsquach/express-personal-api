var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SongSchema = new Schema({
  song: String,
  artist: String,
  link: String,
  releaseDate: String
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;
