

//------------------------------------------------Importing the required tags, classes and ids
//------------------------------------------------Scores from Header

const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

//------------------------------------------------Traingle Container 

const traingleContainer = document.querySelectorAll(".traingle-container")

//------------------------------------------------Result Container and its components

const resultContainer = document.getElementById("result-container");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
const nextBtn = document.getElementById("next-btn");
let userBox1 = document.querySelectorAll(".user-box-1")
let userBox2 = document.querySelectorAll(".user-box-2");
let userBox3 = document.querySelectorAll(".user-box-3");
let pcBox1 = document.querySelectorAll(".pc-box-1");
let pcBox2 = document.querySelectorAll(".pc-box-2");
let pcBox3 = document.querySelectorAll(".pc-box-3")

//------------------------------------------------Celebration container 

const celebration = document.querySelectorAll(".celebration");
const playAgainBtn = document.getElementById("play-again");
const replayBtn = document.getElementById("replay");


//------------------------------------------------Rules Modal

const rulesModal = document.getElementById("rules-modal");
const rulesBtn = document.querySelectorAll(".rules-btn");
const closeModalBtn = document.getElementById("close");


//------------------------------------------------Storing Values 

let score = {
    user: 0,
    computer: 0,
};

if (localStorage.getItem("score")) {
    score = JSON.parse(localStorage.getItem("score"));
}

computerScore.innerHTML = score.computer;
userScore.innerHTML = score.user;

const result = {
    WIN: "YOU WIN",
    LOST: "YOU LOST",
    TIE: "TIE UP"
};


//-----------------------------------------------Rules Button Section

rulesBtn.forEach((item) => {
    item.addEventListener("click", () => {
        rulesModal.style.display = "block";
    });
});

closeModalBtn.addEventListener("click", () => {
    rulesModal.style.display = "none";
})


//------------------------------------------------Function for Compuer selects the option
const computer = ["rock", "paper", "scissor"];

function computerPicked() {
    let picked = Math.floor(Math.random() * computer.length);
    return computer[picked];
};
function setImg(picked) {
    let img = `<img src="./assets/${picked}.png alt=${picked} width="60px" />`;
    return img;
}


//------------------------------------------------Play Again

function playAgain() {
    traingleContainer.style.display = "grid";
    resultContainer.style.display = "none";
    celebration.style.display = "none";
    nextBtn.style.display = "none";
}

playAgainBtn.addEventListener("click", playAgain);

replayBtn.addEventListener("click", playAgain);

//------------------------------------------------Set image after choosing the Options

function setStyles() {
    resultContainer.style.marginTop = "3rem";

    picked.forEach((item) => {
        item.style.top = "300px";
    });

    for (let i = 0; i < 3; i++) {
        userResult.classList.remove("rock-div");
        userResult.classList.remove("paper-div");
        userResult.classList.remove("scissor-div");
        pcResult.classList.remove("rock-div");
        pcResult.classList.remove("paper-div");
        pcResult.classList.remove("scissor-div");

        playAgainBtn.style.display="block";
        resultText2.style.display="block";
        replayBtn.style.display="none";
        nextBtn.style.display="none";
    }
}

//------------------------------------------------Winner Focus functions

let focusOnUserWinner = () => {
    userBox1.classList.add("winner-box-1");
    userBox2.classList.add("winner-box-2");
    userBox3.classList.add("winner-box-3");
    pcBox1.classList.remove("winner-box-1");
    pcBox1.classList.remove("winner-box-1");
    pcBox1.classList.remove("winner-box-1");

};

let focusOnPcWinner = () => {
    userBox1.classList.remove("winner-box-1");
    userBox2.classList.remove("winner-box-2");
    userBox3.classList.remove("winner-box-3");
    pcBox1.classList.add("winner-box-1");
    pcBox1.classList.add("winner-box-1");
    pcBox1.classList.add("winner-box-1");

};

let removeFocus = () => {
    userBox1.classList.remove("winner-box-1");
    userBox2.classList.remove("winner-box-2");
    userBox3.classList.remove("winner-box-3");
    pcBox1.classList.remove("winner-box-1");
    pcBox1.classList.remove("winner-box-1");
    pcBox1.classList.remove("winner-box-1");

};




























// Rock Paper Scissor Logic 

const startGame = (userPicked) => {
    let pcPicked = computerPicked();

    setStyles();
    let res;

    if (userPicked === pcPicked) {
        res = result.TIE;
        removeFocus();
        playAgainBtn.style.display = "none";
        replayBtn.style.display = "block";
        resultText2.style.display = "none";

        picked.forEach((item) => {
            item.style.top = "256px";
        });

        resultContainer.style.marginTop = "6rem";
    }

    else if (
        (userPicked === "scissor" && pcPicked === "paper") || (userPicked === "rock" && pcPicked === "scissors") || (userPicked === "paper" && pcPicked === "rock")
    ) {
        res = result.WIN;
        nextBtn.style.display = "block";
        focusOnUserWinner();
        score.user++;
    }

    else {
        res.LOST;
        focusOnPCWinner();
        score.computer++;
    }

    traingleContainer.style.display = "none";
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











