console.log("Sanity Check: JS is working!");

var template;
var $songsList;
var allSongs = [];

$(document).ready(function(){

  $songsList = $('#songTarget');

    // compile handlebars template
    var source = $('#songs-template').html();
    template = Handlebars.compile(source);

    $.ajax({
      method: 'GET',
      url: '/api/songs',
      success: handleSuccess,
      error: handleError
    });

});

function render () {
  // empty existing posts from view
  $songsList.empty();

  // pass `allSongs` into the template function
  var songsHtml = template({ songs: allSongs });

  // append html to the view
  $songsList.append(songsHtml);
}

function handleSuccess(json) {
  allSongs = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#songTarget').text('Failed to load songs, is the server working?');
}

function deleteSongSuccess(json) {
  var song = json;
  console.log(json);
  var songId = song._id;
  console.log('delete song', songId);
  // find the song with the correct ID and remove it from our allSongs array
  for(var index = 0; index < allSongs.length; index++) {
    if(allSongs[index]._id === songId) {
      allSongs.splice(index, 1);
      break;  // we found our song - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}
