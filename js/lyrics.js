var music = require('musicmatch')({guid:"85d2e353820e89033afa96e3391ba32d"});
if(music){
var log = console.log("Success")
console.log(music)
}





music.trackSearch({q:"Lukas Graham" ,page:1,page_size:3})
.then(function(data){
  var songName = data.message.body.track_list[0].track.track_id
  console.log(songName)
music.trackLyrics({track_id:songName}).then(function(data){
  console.log(data.message.body.lyrics.lyrics_body)
  })
}).catch(function(err){
   console.log(err);
})





				//expect(data).to.be.an('object');
				//expect(data.message.body.track_list[0].track.track_name).to.eql('Got Love');
				//expect(data.message.body.track_list[0].track.album_name).to.eql('Queen of the Clouds');
				//expect(data.message.body.track_list[0].track.artist_name).to.eql('Tove Lo');
				//expect(data.message.body.track_list[0].track.commontrack_vanity_id).to.eql('Tove-Lo/Got-Love');
