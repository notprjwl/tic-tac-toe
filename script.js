let boxes = document.querySelectorAll(".box");
let turn = true;
let mesg = document.querySelector("#mesg");
let resetbtn = document.querySelector("#reset-btn");
let mesgContainer = document.querySelector(".mesg-container");

//winning patterns in the form of 2d arrays
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//using turn which is set to true in the beginning
//turn will give alternate turns to the users.
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("button was clicked")
    if (turn) {
      box.innerText = "O";
      turn = false;
    } else {
      box.innerText = "X";
      turn = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

//the values of the boxes wrt the winning patterns are stored in posval constant
const checkWinner = () => {
  let draw = true; //checking the draw condition

  for (let patterns of winPatterns) {
    // console.log(patterns[0], patterns[1], patterns[2]);
    // console.log(boxes[patterns[0]].innerText, boxes[patterns[1]].innerText, boxes[patterns[2]].innerText);  //checking if the X and Os are matching with the pattern.
    const pos1val = boxes[patterns[0]].innerText;
    const pos2val = boxes[patterns[1]].innerText;
    const pos3val = boxes[patterns[2]].innerText;

    //winner logic - every boxes needs to be filled and we will check if all the values are same and matches the pattern then print winner.
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner", pos1val);
        showWinner(pos1val);
        return;
      }
    } else {
      draw = false;
    }
  }
  if (draw) {
    showDraw();
  }
};

// displaying winner
const showWinner = (winner) => {
  mesg.innerText = `Winner is ${winner}`;
  mesgContainer.classList.remove("hide");
  disabledBoxes();
};

//draw
const showDraw = () => {
  mesg.innerText = "Draw";
  mesgContainer.classList.remove("hide");
  disabledBoxes();
};

//disabling all boxes when one wins
const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

//reseting the box and also the winner message
const resetGame = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
  mesgContainer.classList.add("hide"); //here we are using add classlist to add the hide class, which hides in css
};

//button triggers the function when clicked
resetbtn.addEventListener("click", resetGame);
