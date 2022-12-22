//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft= 3;

// Ui element
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.getElementById('guess-btn'),
      guessInput = document.getElementById('guess-input'),
      message = document.querySelector('.message');

//  Assign UI min and max
minNum.textContent  = min;
maxNum.textContent = max;

//Play Again
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
    
    }
});

// listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // validate

  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`please enter a Number between ${min} and ${max}`,'red');
  }

  // check if won
  if(guess === winningNum){
  
  gameOver(true,`${winningNum} is correct, YOU WIN!`);

} else {
    //Wrong number
    guessesLeft -= 1;

  // game over lost
    if(guessesLeft === 0){ 

      gameOver(false, `Game over, You lost :( The correct number was ${winningNum}`);
  
      } else{
      //Game continue - answer wrong

      // change border color
    guessInput.style.borderColor = 'red';
    
    //clear Input
    guessInput.value = '';

    //tell user wrong answer
      setMessage(`${guess} is not correct :\ , ${guessesLeft} guesses left`, `red`);
    
    }
  }
});

//game over
function gameOver(won, msg){
let color;
won === true ? color = 'green' : color = 'red';

 // Disable input
guessInput.disabled = true;
 // change border color
guessInput.style.borderColor = color;

//set text color
message.style.color = color;
 //set message
setMessage(msg);



//play again
guessBtn.value = 'Play Again ';
guessBtn.className += 'play-again';
//clear Input
guessInput.value = '';

}

// Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);

}

// set message 
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
