var buttonColour = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStatus = false;

$(document).keydown(function () {
  if (gameStatus === false) {
    $("#head").text("Level " + level);
    nextOrder();
    gameStatus = true;
  }
});

$(".square").click(function () {
  var userChosenColor = $(this).attr("id");
  userPattern.push(userChosenColor);
  PlaySound(userChosenColor);
  PlayAnimation(userChosenColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length === userPattern.length) {
      setTimeout(function () {
        nextOrder();
      }, 1000);
    }
  } else {
    PlaySound("wrong");
    $("body").addClass("game-over");
    $("#head").text("Game Over! Press Any key to restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    tryAgain();
  }
}

function nextOrder() {
  userPattern = [];
  level++;
  $("#head").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColour[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  PlaySound(randomChosenColor);
}

function PlaySound(soundName) {
  var audio = new Audio("sounds/" + soundName + ".mp3");
  audio.play();
}

function PlayAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 200);
}

function tryAgain() {
  level = 0;
  gamePattern = [];
  gameStatus = false;
}
