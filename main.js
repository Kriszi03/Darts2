let playerNum = document.getElementById("selectP").value;




function startGame() {
  const playerNum = Number(document.getElementById("selectP").value);
  const startScore = document.getElementById("select").value;

  if (playerNum === 4) {
    window.location.href = `4player.html?score=${startScore}`;
  } else if (playerNum === 3) {
    window.location.href = `3player.html?score=${startScore}`;
  } else if (playerNum === 2) {
    window.location.href = `2player.html?score=${startScore}`;
  }
}

function resizeGame() {
    const game = document.getElementById("game");

    const DESIGN_WIDTH = 360;
    const DESIGN_HEIGHT = 700;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;

    const scaleX = viewportWidth / DESIGN_WIDTH;
    const scaleY = viewportHeight / DESIGN_HEIGHT;

    // Keep the original 360:700 proportions
    const scale = Math.min(scaleX, scaleY);

    game.style.transform =
        `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener("resize", resizeGame);
window.addEventListener("orientationchange", resizeGame);

resizeGame();



