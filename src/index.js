import './css/styles.css';
// import Character from './js/character.js';
// import $ from 'jquery'; // $ npm i jquery

window.addEventListener("load", function() {
  document.getElementById("top-left").addEventListener('click', function() {
    console.log("you clicked me");
    let char = document.getElementById("char");
    char.style.left = "50%";
    document.getElementById("base").setAttribute("class", "hidden");
    document.getElementById("island").removeAttribute("class");
  })


});
