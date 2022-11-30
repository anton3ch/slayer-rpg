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


function what() {
  let player = retrieveObject("player");
  for (let i = 0; player.healthStat > 0; i++) {
    
  }
}

async function battleStart() {
  let player = retrieveObject("player");
  let enemy = new Entity("enemy");
  enemy.enemyStats();
  let battle = new Battle("battle1", player, enemy, "forest");
  document.getElementById('player-health').innerText = player.healthStat;
  document.getElementById('enemy-health').innerText = enemy.healthStat;
  
  // document.getElementById("fight").addEventListener("click", waitResponse, "fight")
  // document.getElementById("heal").addEventListener("click", waitResponse, "heal");
  // document.getElementById("flee").addEventListener("click", waitResponse, "flee")
  
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
