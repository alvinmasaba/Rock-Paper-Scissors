const display = document.querySelector('#results-display');
const body = document.body;

// Create global variables to store the user and cpu scores
let userScore = 0;
let cpuScore = 0;
let printWinner = true;

// Create 'p' to display the user score
const userScoreDisplay = document.createElement('p');
userScoreDisplay.classList.add('score');
userScoreDisplay.textContent = `PLAYER: ${ userScore }`;

// Create 'p' to display the computer score
const cpuScoreDisplay = document.createElement('p');
cpuScoreDisplay.classList.add('score');
cpuScoreDisplay.textContent = `CPU: ${ cpuScore }`;

display.appendChild(userScoreDisplay);
display.appendChild(cpuScoreDisplay);

// Create 'div' to display result of the round
const results = document.createElement('p');
const whatWasPlayed = document.createElement('p');
body.appendChild(whatWasPlayed);
body.appendChild(results);
whatWasPlayed.setAttribute("id", "what-was-played");
results.setAttribute("id", "round-results");

// node list of all buttons on the page
const buttons = document.querySelectorAll('button');

// Use .forEach method to iterate through the list of buttons
let i = 0;
buttons.forEach((button) => {
  button.addEventListener('click', () => {                       // for each button we add a 'click' listener
    if (i < 4){
      result = playRound((button.textContent).toUpperCase(), cpuPlay());

      if (result == "You win!" || result == "You lose!"){       // Auto-increment the winning players score by 1 after each round
        if (result == "You win!"){
          userScore++;
          userScoreDisplay.textContent = `PLAYER: ${ userScore }`; 
        } else{
          cpuScore++;
          cpuScoreDisplay.textContent = `CPU: ${ cpuScore}`;
        } 
        i++;
      };
    } else if (i == 4) {                                        // We want the 5th round to be the last round the score and textContent on the page is updated
      result = playRound((button.textContent).toUpperCase(), cpuPlay());

      if (result == "You win!" || result == "You lose!"){
        if (result == "You win!"){                              
          userScore++;
          userScoreDisplay.textContent = `PLAYER: ${ userScore }`; 
        } else{
          cpuScore++;
          cpuScoreDisplay.textContent = `CPU: ${ cpuScore}`;
        } 
        i++;
      };
      const winner = document.createElement('div');
      const winnerText = document.createElement('p');
      winner.appendChild(winnerText);
      body.appendChild(winner);
      winner.setAttribute("id", "winner");
      winnerText.setAttribute("id", "winner-text");

      while(printWinner){                                     // Only runs after the 5th round and is set to false immediately after
        if (userScore > cpuScore){                              
          winnerText.textContent = `You scored ${ userScore } and the CPU only scored ${ cpuScore }. Congrats! You win!`;
        } else {
          winnerText.textContent = `Your puny human brain only mustered ${ userScore } points, while the slick, grand, metallic CPU scored 
              ${ cpuScore }. The CPU wins and you my friend, need to study your probabilities more.`;    
        }
        printWinner = false;
      };
    };
  });
  return;
});

// Create a function that randomly returns either 'Rock', 'Paper' or 'Scissors'
function cpuPlay() {
  let choices = ['ROCK', 'PAPER', 'SCISSORS'];
  let cpuChoice = choices[Math.floor(Math.random()*choices.length)];
  return cpuChoice;
}

// Create a function that compares the user selection to the cpu selection and return whether the user wins or loses
function playRound(user, cpu) {
  whatWasPlayed.textContent = `You played ${ user } and the computer played ${ cpu }`;
  if (user === 'ROCK'){
    switch (cpu){
      case 'PAPER':
        results.textContent = `${ cpu } beats ${ user }, you lose!`;
        return "You lose!";
      case 'SCISSORS':
        results.textContent = `${ user } beats ${ cpu }, you win!`;
        return "You win!";
      default:
        results.textContent = "It's a tie! Play again!";
        break; // If there is no winner, default to break
    }
  } else if (user === 'PAPER'){
    switch (cpu){
      case 'SCISSORS':
        results.textContent = `${ cpu } beats ${ user }, you lose!`;
        return "You lose!";
      case 'ROCK':
        results.textContent = `${ user } beats ${ cpu }, you win!`;
        return "You win!";
      default:
        results.textContent = "It's a tie! Play again!";
        break;
    }
  } else if (user === 'SCISSORS'){
    switch (cpu){
      case 'ROCK':
        results.textContent = `${ cpu } beats ${ user }, you lose!`;
        return "You lose!";
      case "PAPER":
        results.textContent = `${ user } beats ${ cpu }, you win!`;
        return "You win!";
      default:
        results.textContent = "It's a tie! Play again!";
        break;
    }
  }
}

  



