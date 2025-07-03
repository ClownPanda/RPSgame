// ------------------------------------------------Score elements
const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

//------------------------------------------------ Triangle container and result container
const triangleContainer = document.querySelector(".triangle-container");
const resultContainer = document.getElementById("result-container");

//------------------------------------------------ Result display elements
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
const resultText = document.getElementById("result-text-1");
const resultText2 = document.getElementById("result-text-2");
const nextBtn = document.getElementById("next-btn");

//------------------------------------------------ User and PC boxes
const userBox1 = document.querySelector(".user-box-1");
const userBox2 = document.querySelector(".user-box-2");
const userBox3 = document.querySelector(".user-box-3");
const pcBox1 = document.querySelector(".pc-box-1");
const pcBox2 = document.querySelector(".pc-box-2");
const pcBox3 = document.querySelector(".pc-box-3");

//------------------------------------------------ Celebration elements
const celebration = document.querySelector(".celebration");
const playAgainBtn = document.getElementById("play-again");
const replayBtn = document.getElementById("replay");

//------------------------------------------------ Rules modal
const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.querySelectorAll(".rules-btn");
const closeModalBtn = document.getElementById("close");

//------------------------------------------------ Score tracking
let score = {
  user: 0,
  computer: 0,
};

//------------------------------------------------ Load score from localStorage
if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
}
computerScore.innerHTML = score.computer;
userScore.innerHTML = score.user;

//------------------------------------------------ Constants for result text
const result = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIE: "TIE UP",
};

//------------------------------------------------ Show/hide rules modal
rulesBtn.forEach((item) => {
  item.addEventListener("click", () => {
    rulesModal.style.display = "block";
  });
});
closeModalBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

//------------------------------------------------ Random PC pick
const computer = ["rock", "paper", "scissor"];
function computerPicked() {
  let picked = Math.floor(Math.random() * computer.length);
  return computer[picked];
}

//------------------------------------------------ Set image dynamically
function setImg(picked) {
  return `<img src="./assets/${picked}.png" alt="${picked}" width="60px" />`;
}

// ------------------------------------------------Reset UI to default
function playAgain() {
  triangleContainer.style.display = "block";
  resultContainer.style.display = "none";
  celebration.style.display = "none";
  nextBtn.style.display = "none";
}
playAgainBtn.addEventListener("click", playAgain);
replayBtn.addEventListener("click", playAgain);

// ------------------------------------------------Next Button

nextBtn.addEventListener("click",()=>{
    celebration.style.display="flex";
})


//------------------------------------------------ Clear styling and apply layout
function setStyles() {
  resultContainer.style.marginTop = "3rem";

  //------------------------------------------------ Remove previous result styling
  userResult.className = "result-img choice user-result";
  pcResult.className = "result-img choice pc-result";

  playAgainBtn.style.display = "block";
  resultText2.style.display = "block";
  replayBtn.style.display = "none";
  nextBtn.style.display = "none";
}

let focusOnUserWinner = () => {
    userBox1.classList.add("winner-box-1");
    userBox2.classList.add("winner-box-2");
    userBox3.classList.add("winner-box-3");
    pcBox1.classList.remove("winner-box-1");
    pcBox2.classList.remove("winner-box-2");
    pcBox3.classList.remove("winner-box-3");

};

let focusOnPcWinner = () => {
    userBox1.classList.remove("winner-box-1");
    userBox2.classList.remove("winner-box-2");
    userBox3.classList.remove("winner-box-3");
    pcBox1.classList.add("winner-box-1");
    pcBox2.classList.add("winner-box-2");
    pcBox3.classList.add("winner-box-3");

};

let removeFocus = () => {
    userBox1.classList.remove("winner-box-1");
    userBox2.classList.remove("winner-box-2");
    userBox3.classList.remove("winner-box-3");
    pcBox1.classList.remove("winner-box-1");
    pcBox2.classList.remove("winner-box-2");
    pcBox3.classList.remove("winner-box-3");

};
//------------------------------------------------ Rock Paper Scissors game logic
const startGame = (userPicked) => {
  const pcPicked = computerPicked();
  let res;

  setStyles();

  if (userPicked === pcPicked) {
    res = result.TIE;
    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    resultText2.style.display = "none";
    resultContainer.style.marginTop = "6rem";
    removeFocus();
  } else if (
    (userPicked === "rock" && pcPicked === "scissor") ||
    (userPicked === "paper" && pcPicked === "rock") ||
    (userPicked === "scissor" && pcPicked === "paper")
  ) {
    res = result.WIN;
    nextBtn.style.display = "block";
    focusOnUserWinner();
    score.user++;
  } else {
    res = result.LOST;
    focusOnPcWinner();
    score.computer++;
  }

  triangleContainer.style.display = "none";
  resultContainer.style.display = "flex";

  userResult.classList.add(`${userPicked}-div`);
  pcResult.classList.add(`${pcPicked}-div`);
  userResult.innerHTML = setImg(userPicked);
  pcResult.innerHTML = setImg(pcPicked);
  resultText.innerHTML = res;

  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;

  localStorage.setItem("score", JSON.stringify(score));
};
