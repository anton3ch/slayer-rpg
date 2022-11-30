import './css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Character from './js/character.js';
// import $ from 'jquery'; // $ npm i jquery
import Entity from './js/entities.js';
import Battle from './js/battle.js';

//local store object
function storeObject(keyword, object){
  sessionStorage.setItem(keyword, JSON.stringify(object));
}

// retrieve local stored object
function retrieveObject(keyword){
  let object = sessionStorage.getItem(keyword);
  object = JSON.parse(object);
  return object;
}

// function waitResponse(type){
//   if (type === "fight"){

//   }
//   else if
// }


async function battleStart() {
  let player = retrieveObject("player");
  let enemy = new Entity("enemy");
  enemy.enemyStats();
  let battle = new Battle("battle1", player, enemy, "forest");

  // document.getElementById("fight").addEventListener("click", )
  // document.getElementById("heal").addEventListener("click", waitResponse, "heal");
  // document.getElementById("flee")
  //battle logic
  while(battle.inBattle) {
    let response = window.prompt();
    switch(response){
      case 'fight':
        //fight logic
        battle.fight(player, enemy)
        break;
      case 'heal':
        //heal logic
        battle.heal(player);
        break;
      case 'flee':
        //flee logic
        battle.tacticalRetreat(player, enemy);
    }
    battle.inBattle = false;
  }

  
}

//battle event listener
window.addEventListener("load", function () {
  let player = new Entity("john");
  storeObject("player", player);
  document.getElementById("start-battle").addEventListener("click", battleStart);
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
