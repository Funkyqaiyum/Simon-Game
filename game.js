// Variables
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var click = 0;


// Click title to start the game
$('h1').click(function() {
  if (level === 0) {
    $('h1').fadeOut(100).fadeIn(100);
    setTimeout(nextSequence, 700);
  }
});

// Click Coloured buttons
$(".btn").click(function() {
  if (level != 0) {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    $(this).fadeOut(100).fadeIn(100).fadeIn(100);
    animatePressed(userChosenColour);
    playSound(userChosenColour);
    click += 1;
    checkAnswer();
  }
});


function nextSequence() {
  //reset values
  click = 0;
  userClickedPattern = [];
  level += 1;

  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);

}

function checkAnswer() {
  var x = userClickedPattern;
  var y = gamePattern;

  if (x[click - 1] != y[click - 1]) gameOver();
  if (click == y.length) {
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").html("Game Over, Tap Here To Restart");
  startOver();
}


function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  click = 0;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePressed(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}
