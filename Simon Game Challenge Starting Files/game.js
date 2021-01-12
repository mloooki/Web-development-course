buttonColours = ["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];
level =0;
function nextSequence(){
  level++;
  userClickedPatter=[];
    $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()* 4);
randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);
$("."+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
console.log(gamePattern);
makeSound(randomChosenColour);

}
function makeSound(color){

  switch (color) {
    case "green":
    var audio = new Audio('sounds/green.mp3');
    audio.play();
    break;
    case "blue":
    var audio = new Audio('sounds/blue.mp3');
    audio.play();
    break;
    case "red":
    var audio = new Audio('sounds/red.mp3');
    audio.play();
    break;
    case "yellow":
    var audio = new Audio('sounds/yellow.mp3');
    audio.play();
    break;

  }
}

function animatePress(currentColour){
  $('.'+currentColour).addClass("pressed")
  setTimeout(a,100);
function a(){
  $('.'+currentColour).removeClass("pressed")
}


}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart at level "+level);
  }
}

$("body").keypress(function(event){
  nextSequence();
});

$(".btn").click(function(e){
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  //nextSequence();
    makeSound(userChosenColour);
  animatePress(userChosenColour);
    checkAnswer(userClickedPatter.length-1);

//  nextSequence();
})
