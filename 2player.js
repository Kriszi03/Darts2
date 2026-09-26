let scoreDisp1 = document.getElementById("p1-scores");
let scoreDisp2 = document.getElementById("p2-scores");

let currentScoreDisp = document.getElementById("currentScores");
let currentScore;
let playerNum = document.getElementById("current-player");
let dartsThrownDisp = document.getElementById("turns-left");

let currentPlayerDisp = document.getElementById("current-player");

let winnerDisp = document.getElementById("winner");


let p1Score;
let p2Score;



let screen = document.getElementById("screen");








let dartsThrown = 0;
let turnTimer;
const scoreButtons = document.querySelectorAll(".scrbtn, .x2R, .x2G, .circle-green, .bull, .x3G, .x3R");

function disableScoreButtons() {
    scoreButtons.forEach(button => button.disabled = true);
}

function enableScoreButtons() {
    scoreButtons.forEach(button => button.disabled = false);
}

let throw1Disp = document.getElementById("throw1");
let throw2Disp = document.getElementById("throw2");

let throw3Disp = document.getElementById("throw3");

let currentThrows = ["-", "-", "-"];

let savedThrows = ["-", "-", "-"];

let throwHistory = [];

let mX = document.querySelector(".missX");

let restart = document.getElementById("restar");

let menu1 = document.getElementById("mainMenu");

function calculate() {
if(p1Score === 0) {
  winnerDisp.innerHTML = "Player 1 wins!";
  win.play();
  document.getElementById("cup").style.display = "block";
  setTimeout(() => {
    document.getElementById("respopB").style.display = "block";
  }, 5500);


} else if(p2Score === 0) {
winnerDisp.innerHTML = "Player 2 wins!";
  win.play();
  document.getElementById("cup").style.display = "block";
  setTimeout(() => {
    document.getElementById("respopB").style.display = "block";
  }, 5500);

} 
}

restart.addEventListener('click', function() {
  location.reload();
});

function menu() {
  window.location.href = `index.html`
}

function startPopUp() {
  document.getElementById("playerPopUp").style.display = "flex";
}



var win = new Audio("files/victory.mp3");
win.volume = 0.03;

var bust = new Audio("files/bust.mp3");
bust.volume = 0.5

document.getElementById('miss').addEventListener('click', function() {
  if (navigator.vibrate) {
  
    navigator.vibrate(1000);
  } else {
    alert('Vibration API not supported');
  }
});

function toggleMissX() {
  mX.classList.toggle("active");
  var error = new Audio("files/error.mp3");
error.volume = 0.5;
  error.play();
  navigator.vibrate(1000);
  setTimeout(() => {
    mX.classList.toggle("active");
  }, 600);
}

function updateDisplay() {
    scoreDisp1.textContent = p1Score;
    scoreDisp2.textContent = p2Score;

    
    dartsThrownDisp.textContent = dartsThrown;
    
    
    currentPlayerDisp.textContent = currentPlayer;
    
    throw1Disp.textContent = currentThrows[0];
    throw2Disp.textContent = currentThrows[1];
    throw3Disp.textContent = currentThrows[2];

    console.log(dartsThrown);
}

let p1Disp = document.getElementById("p1-name");



function closePopUp() {
    document.getElementById("playerPopUp").style.display = "none";
    
    p1Disp.textContent = document.getElementById("player1").value;
  
    startGame(); // continue after closing
}

function startGame() {
  document.getElementById("chk").style.display = "none";
    currentThrows = ["-", "-", "-"];
    currentPlayer = 1;
    dartsThrown = 0;

    const params = new URLSearchParams(window.location.search);
    
    const startScore = Number(params.get("score")) || 301;

    p1Score = startScore;
    p2Score = startScore;

    updateDisplay();




console.log(currentPlayer + " jatekos")
}

function addScore(points) {

  throwHistory.push({
    player: currentPlayer,
    points: points,
    display: points,
    throwNumber: dartsThrown
});

  currentThrows[dartsThrown] = points;
  if (currentPlayer === 1) {
    p1Score -= points;
} else if (currentPlayer === 2) {
    p2Score -= points;
}
    



calculate();
  dartsThrown++;
  
if(p1Score < 0) {
    if (dartsThrown < 3 && p1Score < 0) {
    setTimeout(() => {
    currentPlayer++;
    }, 2000);
}
      winnerDisp.innerHTML = "BUST!";
      bust.play();
      setTimeout(() => {
      p1Score += currentThrows.reduce((sum, throwScore) => {
  return sum + (Number(throwScore) || 0);
}, 0);

      currentThrows = ["-", "-", "-"]
      dartsThrown = 0;
      winnerDisp.innerHTML = "";
      
      updateDisplay();
      return;
    }, 2000);
  } 
  
  if(p2Score < 0) {
    if (dartsThrown < 3 && p2Score < 0) {
    setTimeout(() => {
    currentPlayer++;
    }, 2000);
}
      winnerDisp.innerHTML = "BUST!";
      bust.play();
      setTimeout(() => {
      p2Score += currentThrows.reduce((sum, throwScore) => {
  return sum + (Number(throwScore) || 0);
}, 0);

      currentThrows = ["-", "-", "-"]
      dartsThrown = 0;
      winnerDisp.innerHTML = "";
      
      updateDisplay();
      return;
    }, 2000);
  }
  
  
  if(dartsThrown === 3) {
    disableScoreButtons();

    turnTimer = setTimeout(() => {

        // save the finished player's throws first
        savedThrows = [...currentThrows];

        // then reset the turn
        currentThrows = ["-", "-", "-"];
        dartsThrown = 0;

        currentPlayer++;

        if(currentPlayer > 2) {
            currentPlayer = 1;
        }

        enableScoreButtons();
        updateDisplay();

    }, 2000);
    
  }
    

  
  updateDisplay();
 console.log(currentPlayer + "jatekos");
}


  function undoThrow() {
    if (throwHistory.length === 0) return;

    enableScoreButtons();
    clearTimeout(turnTimer);

    let lastThrow = throwHistory.pop();

    currentPlayer = lastThrow.player;

    if (currentPlayer === 1) {
        p1Score += lastThrow.points;
    } else if (currentPlayer === 2) {
        p2Score += lastThrow.points;
    } 

    currentThrows = ["-", "-", "-"];

    throwHistory.forEach(dart => {
        if (dart.player === currentPlayer) {
            currentThrows[dart.throwNumber] = dart.display;
        }
    });

    dartsThrown = lastThrow.throwNumber;

    updateDisplay();
}

function miss() {
  toggleMissX();
  currentThrows[dartsThrown] = "X";
  throwHistory.push({
    player: currentPlayer,
    points: 0,
    display: "X",
    throwNumber: dartsThrown
});

  dartsThrown++;

  if(dartsThrown === 3) {
    setTimeout(() => {
    dartsThrown = 0;
    currentPlayer++;
    if(currentPlayer > 2) {
      currentPlayer = 1;
    }
  
    currentThrows = ["-", "-", "-"];
      updateDisplay();
    }, 1000);
  }
  updateDisplay();
 console.log(currentPlayer + "jatekos");
}

function nextPlayer() {
  currentThrows = ["-", "-", "-"];
  if(dartsThrown === 3) {
    dartsThrown = 0;
    currentPlayer++;
}
    if(currentPlayer >= 2) {
      currentPlayer = 1;
      dartsThrown = 0;
    } else {
      currentPlayer ++;
      dartsThrown = 0;
    }

  
  updateDisplay();
  console.log(currentPlayer + " jatekos");
}

startGame();

function resizeGame() {
    const game = document.getElementById("game");

    const DESIGN_WIDTH = 360;
    const DESIGN_HEIGHT = 700;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const scaleX = viewportWidth / DESIGN_WIDTH;
    const scaleY = viewportHeight / DESIGN_HEIGHT;

  
    const scale = Math.min(scaleX, scaleY);

    game.style.transform =
        `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("resize", resizeGame);
window.addEventListener("orientationchange", resizeGame);

resizeGame();

function fullScreen() {
  const game = document.documentElement;

    if (!document.fullscreenElement) {
        game.requestFullscreen().catch(err => {
            console.log("Fullscreen failed:", err);
        });
    } else {
        document.exitFullscreen();
    }
    resizeGame();
}

setTimeout(() => {
  document.getElementById("screen").style.display = "none";
}, 20000);

screen.addEventListener('click', function() {
  screen.style.display = "none";

});

