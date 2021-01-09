const HEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const COLOR = document.getElementById("color");
const BTN = document.getElementById("button");

BTN.addEventListener("click", () => {

  let color = "#";

  for(let i = 0; i < 6; i++){
    color += HEX[getRandomNumber()];
  }

  document.body.style.backgroundColor = color;
  COLOR.innerText = color;
});

getRandomNumber = () => {
  return Math.floor(Math.random() * HEX.length);
}