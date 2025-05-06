let updatedScore = JSON.parse(localStorage.getItem('updatedScore')) || {
  wins: 0,
  Losses: 0,
  Tie: 0
};
scoreBoard();
let isAutoPlaying = false;
let intervalid;
function autoPlay(){
  if(!isAutoPlaying){
  intervalid = setInterval(function(){
    const playerMove =pickComputerMove();
    playGame(playerMove);
  }, 1000);
  isAutoPlaying = true;
}else{
  clearInterval(intervalid);
  isAutoPlaying = false;
}
  }
  
function resetGame(){
  updatedScore.wins = 0;
  updatedScore.Losses = 0;
  updatedScore.Tie = 0;
  document.querySelector('.js-result').innerHTML = "";
  document.querySelector('.js-compare').innerHTML = "";
  localStorage.removeItem('updatedScore');
  scoreBoard(); 
}

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = "";
  if (computerMove === "Rock"){
    if (playerMove === "Paper"){
      result = "You Won";
    }else if (playerMove === "Scissors"){
      result = "You Lose";
    }else{
      result = "Tie";
    }
  }else if (computerMove === "Paper"){
    if (playerMove === "Scissors"){
      result = "You won";
    }else if (playerMove === "Rock"){
      result = "You Lose";
    }else{
      result = "Tie";
    }
  }else if (computerMove === "Scissors"){
    if (playerMove === "Rock"){
      result = "You Won";
    }else if (playerMove === "Paper"){
      result = "You Lose";
    }else{
      result = "Tie";
    }
  }
  if(result === "You Won"){
    updatedScore.wins += 1;
  }else if(result === "You Lose"){
    updatedScore.Losses += 1;
  }else{
    updatedScore.Tie += 1;
  }
  scoreBoard();
  localStorage.setItem('updatedScore', JSON.stringify(updatedScore));
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-compare').innerHTML = `You <img src="./images/${playerMove}-emoji.png" alt=""> <img src="./images/${computerMove}-emoji.png" alt=""> computer`;
}

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1/2 ){
    computerMove = "Rock";
  }else if(randomNumber >= 1/2 && randomNumber < 2/3){
    computerMove = "Paper";
  }else if(randomNumber >= 2/3 && randomNumber <= 1){
    computerMove = "Scissors";
  }
return computerMove
}

function scoreBoard(){
  let scoreDetails = document.querySelector('.score-board');
  scoreDetails.innerHTML = `wins : ${updatedScore.wins}, Losses : ${updatedScore.Losses}, Tie : ${updatedScore.Tie}`;
}