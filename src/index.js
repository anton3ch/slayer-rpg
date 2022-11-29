import './css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Character from './js/character.js';
// import $ from 'jquery'; // $ npm i jquery

window.addEventListener("load", function() {
  let char = document.getElementById("char");

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
    char.setAttribute("top", "20px"); // does not work, character just reverts to original position
  });
});

document.getElementById("island").addEventListener('click', function() {
  document.getElementById("island").setAttribute("class", "hidden");
  document.getElementById("thirdmap").removeAttribute("class");
});
