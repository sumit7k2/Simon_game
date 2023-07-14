var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var gameStarted = false;
var level = 0;

function nextSequence() {
    level++;

    $("#level-title").text("Level " + level); 

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100)
}

$(document).keypress(function(){
    if ( gameStarted === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted= true;
        
    }

})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(level){
    if (userClickedPattern[level] === gamePattern[level]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            nextSequence();
            userClickedPattern = [];
        }
    }else{
        console.log("wrong");
        const soundName = "wrong";
        playSound(soundName);
        $("body").addClass("game-over ");
        setTimeout(function(){
            $("body").removeClass("game-over ");
        },100);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern =[];
    gameStarted = false;
    userClickedPattern =[];
}