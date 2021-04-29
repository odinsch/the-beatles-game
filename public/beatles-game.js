
var buttonName = ["john", "ringo", "george", "paul"];
var playedSongs = []
var started = false;
var level = -1;
var currentName = "";
var currentChosenName = "";
var playingSong = ""
var sec = 0
var min = 0




$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Who sings this song?");
    gamePlay()
    started = true;

    chronoStart()
  }

});



$(document).click(function() {
  if (!started) {
    $("#level-title").text("Who sings this song?");
    gamePlay()
    started = true;

    chronoStart()
  }

});




$(".btn").click(function() {
  var userChosenName = $(this).attr("id");
  currentChosenName = userChosenName

  animatePress(userChosenName)

  if (min < 1) {
    checkAnswer(currentChosenName)
  } else {
    gameOver();
  }



});

function checkAnswer(currentLevel) {
  if (currentChosenName === currentName) {


    playingSong.pause();
    $("#level-title").text("That's correct!");
    var audio = new Audio("/sounds/correct-sound.mp3");
    audio.play();
    setTimeout(function() {
      $("#level-title").text("Who sings this song?");
      gamePlay()
    }, 200);




  } else {

    playingSong.pause();
    var audio = new Audio("/sounds/AAA LOOSER.mp3");
    audio.play();

    $("body").addClass("game-over");
    $("#level-title").text("That's incorrect!");
    $("#level-title").addClass("game-over-text");
    $("#score").text("You score " + level + " in " + sec + " seconds.");
    $("#score").addClass("game-over-text");

    $("#time").addClass("game-over-time");
    const image = document.createElement('img')
    image.src = '/images/incorrect1.jpg'
    document.querySelector('.container').appendChild(image)
    $('.btn').hide();

    setTimeout(function() {
      $(document).click(function() {
        $("#level-title").text("Try again!");
        $('.container').hide();

        setTimeout(function() {
          $(document).click(function() {
            location.reload();


          });
        }, 200);
      });
    }, 200);


  }
}



function gamePlay() {
  level++;
  $("#score").text("Score: " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomSongNumber = Math.floor((Math.random() * 22) + 1);
  var randomName = buttonName[randomNumber];
  var songId = randomName + " (" + randomSongNumber + ")"
  currentName = randomName
  var check = playedSongs.includes(songId)

  if (check === false) {
    playedSongs.push(songId)
    playSound(songId)
  } else {
    while (check === true) {
      var randomNumber = Math.floor(Math.random() * 4);
      var randomSongNumber = Math.floor((Math.random() * 22) + 1);
      var randomName = buttonName[randomNumber];
      var songId = randomName + " (" + randomSongNumber + ")"

      currentName = randomName
      var check = playedSongs.includes(songId);
      if (check === false) {
        playedSongs.push(songId)
        playSound(songId)
      }
    }
  }

}

function gameOver() {
  playingSong.pause();
  const image = document.createElement('img')
  image.src = '/images/correct.jpg'
  document.querySelector('.container').appendChild(image)
  $('.btn').hide();
  var audio = new Audio("/sounds/AAA GREATEST.mp3");
  audio.play();
  $("#level-title").text("Congratulations!");
  $("body").addClass("game-over");
  $("#level-title").addClass("game-over-text")
  $("#score").text("You score " + level + " in one minute!");
  $("#score").addClass("game-over-text");

  $("#time").addClass("game-over-time");
  setTimeout(function() {
    $(document).click(function() {
      $("#level-title").text("Try again!");
      $('.container').hide();

      setTimeout(function() {
        $(document).click(function() {
          location.reload();


        });
      }, 200);
    });
  }, 200);
}

function animatePress(currentName) {
  $("body").addClass("pressed-background");
  $("#" + currentName).addClass("pressed");
  setTimeout(function() {

    $("body").removeClass("pressed-background");
    $("#" + currentName).removeClass("pressed");
  }, 100);

}

function playSound(name) {
  var playSong = new Audio("/sounds/" + name  + ".mp3");

  playSong.play()
  playingSong = playSong
    console.log(playedSongs);
}


function chrono() {
  var end = new Date()
  var diff = end - start
  var diff = new Date(diff)
  var timerID = 0
  sec = diff.getSeconds()
  min = diff.getMinutes()

  // $("#time").text(sec)
  timerID = setTimeout("chrono()", 10)
}

function chronoStart() {
  start = new Date()
  chrono()
}

function chronoStop() {

  clearTimeout(timerID)

}
