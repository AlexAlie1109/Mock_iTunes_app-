const inquirer = require('inquirer')
const db = require('./iTunes_db.js');

const login = require('./login.js');

const accountUser = (user) => {
  const iUser = user.user_name;
  // console.log(user.user_name)

  const iUserID = user.id
  // console.log(iUserID)
  inquirer.prompt([
    {
      type: "list",
      message: "Welcome" + " " + iUser,
      choices: ['View Songs', 'Add Song', 'Sign Out'],
      name: "accountOptions"
    }
  ]).then(function(profile){
    if(profile.accountOptions == 'View Songs'){
      console.log("Your Songs")
      viewPlaylist(user);
    }else if(profile.accountOptions == 'Add Song'){
      // console.log("Added Song");
      addSong(user);
    }else{
      console.log("Goodbye");
      login(user);
    }
  })
}

function addSong(user){
  let buyMusic = "SELECT songs.id FROM songs INNER JOIN bought_songs ON bought_songs.song_id = songs.id WHERE bought_songs.user_id="
  buyMusic += "'"+user+"'"
  db.query(buyMusic, function(err, data){
    let ownedSongs = data.map((song) => song.id)
    console.log(ownedSongs);
    db.query("SELECT * FROM songs", function(err2, data2){
      // console.log("this is data2")
      // console.log(data2)
      let allSongs = data2.map((song) => song.id)
      // console.log(allSongs)

      let notBoughtSongs = allSongs.filter(val => !ownedSongs.includes(val));
      // console.log("not bought songs")
      // console.log(notBoughtSongs);
      db.query("SELECT * FROM songs WHERE id in ("+notBoughtSongs+")", function(err3, data3){
        // console.log("this is data 3")
        // console.log(data3);
        const songs4sale = [];
        data3.forEach((songs, i) => {
          // console.log(songs);
          // console.log(i);
          songs4sale.push((i + 1) + "." + " " +data3[i].artist+ ":" + " " +data3[i].song_name);
        })
        songs4sale.push("Back");
        // console.log("Songs 4 Sale");
        // console.log(songs4sale);
        inquirer.prompt([
          {
            type: "list",
            message: "Pick a song to buy",
            choices: songs4sale,
            name: "songChoices"
          }
        ]).then(function(music){
          if(music.songChoices != "Back"){
            db.query("SELECT id FROM songs WHERE artist = '"+music.songChoices.split(":")[0].split(".")+"'", function(err, data){
              if(err){
                throw new Error(err5);
              }
              console.log("this is data5")
              console.log(data);
              db.query("INSERT INTO bought_songs (user_id, song_id) VALUES ("+user.id+", "+data3[0].id+")", function(err6, data6){
                if(err){
                  throw new Error(err6)
                }
                console.log("Succesfully Purchased")
                // console.log(music.songChoices);
                accountUser(user);
              })
            })
          }else{
            console.log("Going Back");
            accountUser(user);
          }
        })
      })
    })
  })
};


function viewPlaylist(user){
  db.query("SELECT * FROM songs INNER JOIN bought_songs ON bought_songs.song_id = songs.id WHERE bought_songs.user_id =" +user.id, function(err4, data4){
    data4.forEach((pSongs, i) => {
      console.log((i + 1) + "." + pSongs.song_name + "," + pSongs.artist);
    })
    accountUser(user);
  })
}

module.exports = accountUser;
