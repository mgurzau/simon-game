"use strict";

const green = $(".green");
const red = $(".red");
const yellow = $(".yellow");
const blue = $(".blue");
const squares = [green, red, yellow, blue];
const buttonColors = ["green", "red", "yellow", "blue"];

const greenAudio = new Audio("./sounds/green.mp3");
const redAudio = new Audio("./sounds/red.mp3");
const yellowAudio = new Audio("./sounds/yellow.mp3");
const blueAudio = new Audio("./sounds/blue.mp3");
const wrong = new Audio("./sounds/wrong.mp3");
const audios = [greenAudio, redAudio, yellowAudio, blueAudio];

let sequence = [];
let userSequence = [];
let level = 0;

const startOver = function () {
  level = 0;
  sequence = [];
  userSequence = [];
  $("h1").text("Press A Key to Start");
};

const nextSequence = function () {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  const square = squares[randomNumber];

  square.fadeOut(50).fadeIn(50);
  playSound(audios[randomNumber]);

  $("h1").text(`Level ${level}`);

  sequence.push(randomChosenColor);
  level++;
  userSequence = [];
};

const playSound = function (audio) {
  audio.play();
};

const animatePress = function (currentColor) {
  currentColor.addClass("pressed");
  setTimeout(function () {
    currentColor.removeClass("pressed");
  }, 100);
};

const checkAnswer = function (currentLevel) {
  if (userSequence[currentLevel] === sequence[currentLevel]) {
    if (userSequence.length === sequence.length)
      setTimeout(function () {
        nextSequence();
      }, 1000);
  } else {
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
};

$(document).keypress(function () {
  nextSequence();
});

$(".btn").click(function (e) {
  const userChosenColour = e.target.id;
  userSequence.push(userChosenColour);

  checkAnswer(userSequence.length - 1);

  const index = buttonColors.indexOf(userChosenColour);
  playSound(audios[index]);

  animatePress(squares[index]);
});
