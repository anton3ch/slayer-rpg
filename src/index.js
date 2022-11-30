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

//draws health to battle
function drawBattle (battle) {
  document.getElementById("enemy-health").innerText = battle.enemy.healthStat;
  document.getElementById("player-health").innerText = battle.player.healthStat;
}


function waitForMe(ms) {
  return new Promise(resolve => {
    setTimeout(() => { resolve("") }, ms)
  });
}
async function fight() {
  let battle = document.getElementById("fight").myBattle;
  let player = battle.player;
  let enemy = battle.enemy;
  drawBattle(battle);
  document.getElementById('fight').setAttribute('disabled', 'true');
  battle.fight(player, enemy);
  await waitForMe(1000);
  document.getElementById('fight').removeAttribute('disabled', 'true');
  if (!battle.inBattle) {
    displayWinner(player, enemy);
    stopFight(player, battle);
  }
  
  setTimeout(() => {
    battle.fight(player, enemy);
  }, 1000);
  if (!battle.inBattle) {
    displayWinner(player, enemy);
    stopFight(player, battle);
  }
  drawBattle(battle);
}

function displayWinner(player, enemy) {
  //check who won and output
  if (player.healthStat <= 0) {
    document.getElementById('battle-results').innerText = `${enemy.name} wins!`
  } else if (enemy.healthStat <= 0) {
    document.getElementById('battle-results').innerText = `${player.name} wins!`
  }
}

function stopFight(player) {
  document.getElementById("fight").removeEventListener("click", fight);
  // document.getElementById("heal")removeEventListener("click", heal);
  // document.getElementById("flee")removeEventListener("click", flee);
  storeObject("player", player)
}

function battleStart() {
  console.log("battle started");
  let player = retrieveObject("player");
  let enemy = new Entity("enemy");
  enemy.enemyStats();
  let battle = new Battle("battle1", player, enemy, "forest");
  battle.firstTurn(player, enemy);
  document.getElementById("fight").addEventListener("click", fight);
  document.getElementById("fight").myBattle = battle;
  drawBattle(battle);
  // document.getElementById("heal").addEventListener("click", waitResponse, "heal");
  // document.getElementById("flee").addEventListener("click", waitResponse, "flee")
}
      
//battle event listener
window.addEventListener("load", function () {
  let player = new Entity("john");
  storeObject("player", player);
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
      document.getElementById('sidebar-heading').setAttribute('class', 'hidden');
      document.getElementById("battleStats").removeAttribute("class", "hidden");
    }, 3000);
  });
});

document.getElementById("bottom-arrow").addEventListener('click', function() {
  let char = document.getElementById("char");
  document.getElementById("island").setAttribute("class", "hidden");
  document.getElementById("thirdmap").removeAttribute("class");
  char.addEventListener('animationend', function () {
    console.log("second animation ended");
    setTimeout(() => {
      battleStart();
      document.getElementById('sidebar-heading').setAttribute('class', 'hidden');
      console.log("battle start");
      document.getElementById("battleStats").removeAttribute("class", "hidden");
    }, 2000);
  });
});