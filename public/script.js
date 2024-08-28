let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};

updateScore();

// if (!score) {
//   score = {
//     win: 0,
//     lose: 0,
//     tie: 0
//   }

let isAutoPlaying = false;
let intervalId;

document.querySelector(".autoPlay").addEventListener("click", () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  console.log(event);
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "lose";
    } else if (computerMove === "scissors") {
      result = "win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else if (computerMove === "scissors") {
      result = "lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "lose";
    } else if (computerMove === "paper") {
      result = "win";
    } else if (computerMove === "scissors") {
      result = "tie";
    }
  }

  if (result === "win") {
    score.win += 1;
  } else if (result === "lose") {
    score.lose += 1;
  } else if (result === "tie") {
    score.tie += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateScore();
  document.querySelector(".js-result").innerHTML = `The result is ${result}.`;
  document.querySelector(".moves").innerHTML = `You picked
        <button class="border  bg-yellow-200 p-2 border-black rounded-[40%] js-scissors-button">
            <img class="emoji-image h-32" src="./img/${playerMove}-emoji.png" alt="" srcset="">
        </button> Computer picked 
        <button class="border  bg-yellow-200 p-2 border-black rounded-[40%] js-scissors-button">
            <img class="emoji-image h-32" src="./img/${computerMove}-emoji.png" alt="" srcset="">
        </button>`;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Win : ${score.win} , Lose : ${score.lose} , Tie ${score.tie}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
