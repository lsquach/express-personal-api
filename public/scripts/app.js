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

  $('#newSongForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/songs',
      data: $(this).serialize(),
      success: newSongSuccess,
      error: newSongError
    });
  });

$songsList.on('click', '.deleteBtn', function() {
  console.log('clicked delete button to', '/api/songs/'+$(this).attr('data-id'));
  $.ajax({
    method: 'DELETE',
    url: '/api/songs/'+$(this).attr('data-id'),
    success: deleteSongSuccess,
    error: deleteSongError
  });
});

});

function render () {
  // empty existing posts from view
  $songsList.empty();

  // pass `allSongs` into the template function
  var songsHtml = template({ songs: allSongs });

  // append html to the view
  $songsList.prepend(songsHtml);
}

function handleSuccess(json) {
  allSongs = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#songTarget').text('Failed to load songs, is the server working?');
}

function newSongSuccess(json) {
  $('#newSongForm input').val('');
  allSongs.unshift(json);
  render();
}

function newSongError() {
  console.log('newsong error!');
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

function deleteSongError() {
  console.log('deletesong error!');
}
