import './css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Character from './js/character.js';
// import $ from 'jquery'; // $ npm i jquery
import Entity from './js/entities.js';
// import Battle from './js/battle.js';

//local store object
function storeObject(keyword, object){
  this.sessionStorage.setItem(keyword, JSON.stringify(object));
}

//retrieve local stored object
function retrieveObject(keyword){
  let object = this.sessionStorage.getItem(keyword);
  object = JSON.parse(object);
  return object;
}


function battleStart () {
  retrieveObject("player");
  //battle logic
}

//battle event listener
window.addEventListener("load", function () {
  this.document.getElementById()
  let player = new Entity("john");
  storeObject("player", player);
});


//map event listener
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
