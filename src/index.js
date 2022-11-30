import './css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Character from './js/character.js';
// import $ from 'jquery'; // $ npm i jquery

window.addEventListener("load", function() {
  let char = document.getElementById("char");
  let enemy = document.getElementById("enemy");

  document.getElementById("top-left").addEventListener('click', function() {
    console.log("you clicked me");
    char.setAttribute("class", "move");
    setTimeout(() => {
      document.getElementById("base").setAttribute("class", "hidden");
      document.getElementById("island").removeAttribute("class");
    }, 4000);
  });

  char.addEventListener('animationend', function () {
    char.removeAttribute("class", "move");
    char.style.top = "10px";
    char.setAttribute("class", "secondMove");
    enemy.removeAttribute("class", "hidden");
    setTimeout(() => {
      document.getElementById("battleStats").removeAttribute("class", "hidden");
    }, 2000);
  });
});

document.getElementById("island-click").addEventListener('click', function() {
  let char = document.getElementById("char");
  document.getElementById("island").setAttribute("class", "hidden");
  document.getElementById("thirdmap").removeAttribute("class");
  char.addEventListener('animationend', function () {
    console.log("second animation ended");
    setTimeout(() => {
      console.log("battle start");
      document.getElementById("battleStats").removeAttribute("class", "hidden");
    }, 2000);
  });
});

document.getElementById("fightBtn").addEventListener("click", () => {
  // startBattle();
});

document.getElementById("fleeBtn").addEventListener("click", () => {
  // fleeBattle();
});