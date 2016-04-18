var music = require('musicmatch')({guid:"85d2e353820e89033afa96e3391ba32d"});
if(music){
var log = console.log("Success")
console.log(music)
}





music.trackSearch({q:"Lukas Graham" ,page:1,page_size:3})
.then(function(data){
  var songName = data.message.body.track_list[0].track.track_id
music.trackLyrics({track_id:songName}).then(function(data){
  var lyrics = data.message.body.lyrics.lyrics_body
  var result = lyrics.split('\n')
  console.log(result[0])
  })
}).catch(function(err){
   console.log(err);
})
