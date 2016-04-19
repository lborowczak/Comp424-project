$.getJSON({

  data: {
        apikey:"85d2e353820e89033afa96e3391ba32d",
        q_artist: "Lose Yourself",
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
        console.log(data.message.body);
    },

  });

/*
var music = require('musicmatch')({guid:"85d2e353820e89033afa96e3391ba32d"});
if(music){var log = console.log("Success")}
music.trackSearch({q:"Jay-Z" ,page:1,page_size:10})
.then(function(data){
  var songName = data.message.body.track_list[8].track.track_id
music.trackLyrics({track_id:songName}).then(function(data){
  var lyrics = data.message.body.lyrics.lyrics_body
  var result = lyrics.split('\n')
  for(var i = 0, len = result.length; i <len; i++)
      console.log(result[i])
  })
}).catch(function(err){
   console.log(err);
})
*/
