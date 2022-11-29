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
    console.log("animation ended");
    char.removeAttribute("class", "move");
    char.style.top = "10px";
    char.setAttribute("class", "secondMove");
    enemy.removeAttribute("class", "hidden");
  });
});

document.getElementById("island-click").addEventListener('click', function() {
 // let char = document.getElementById("char");
  document.getElementById("island").setAttribute("class", "hidden");
  document.getElementById("thirdmap").removeAttribute("class");
  // setTimeout(() => {
    // char.setAttribute("class", "secondMove");
  // }, 4000);
});
