
var express = require('express');
var music = require('musicmatch')({guid:"85d2e353820e89033afa96e3391ba32d"});
var server = express();



server.get('/test', function (req, res) {
  res.send("This is not a file");
});

server.get('/about', function (req, res, next) {
  res.send('about');
});

server.get('/search/*', function (req, res) {
  res.send("test" + getTitleID(req.query.artist));
  console.log(req.query.artist);
});


server.get('/', function (req, res) {
  res.send("This is not a file");
});
//server.use('/', express.static(__dirname));

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function getTitleID (artistName) {
  var songName;
  music.trackSearch({q: artistName ,page:1,page_size:3}).then(function(data) {
    songName = data.message.body.track_list[0].track.track_id;
  }).then(function(data) {
    console.log(songName); return "test";});
}
