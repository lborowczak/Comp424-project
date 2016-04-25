
var express = require('express');
var music = require('musicmatch')({guid:"85d2e353820e89033afa96e3391ba32d"});
var server = express();
var path = require('path')


server.get('/', function(req,res) {
  //res.sendFile(path.join(__dirname + '/index.html'))
  res.sendFile(path.join(__dirname + '/gameControls.html'));
  console.log("Loaded");
});

//Use static routes to serve our js, css, and assets
server.use('/js', express.static('js'));

server.use('/css', express.static('css'));

server.use('/assets', express.static('assets'));



server.get('/search/*', function (req, res) {
  //Get the song title ID
  getTitleID(req.query.searchString)

  //When the id is found, look up the lyrics for that song id
  .done(function (data) {
    getLyricsFromID(data)

    //Send the song lyrics as jsonp when they are found
    .done(function (data) {
      res.jsonp(data);
    })
  })
});

server.listen(3000, function () {
  console.log('Server running');
});

function getTitleID (searchString) {
  var songName;
  var promise = music.trackSearch({q: searchString, page:1,page_size:3}).then(function(data) {
    songName = data.message.body.track_list[0].track.track_id;
    return songName;
  });

    return promise;
}


function getLyricsFromID (songID) {
  var lyrics;
  var promise = music.trackLyrics({track_id:songID}).then(function(data) {
    lyrics = data.message.body.lyrics.lyrics_body;
    return lyrics;
  });
    return promise;
}
