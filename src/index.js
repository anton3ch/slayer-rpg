import './css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    setTimeout(() => { resolve(""); }, ms);
  });
}
function disableFightBtn() {
  document.getElementById('fight').setAttribute('disabled', 'true');
  document.getElementById('fight').style.filter = 'grayscale(1)';
  document.getElementById('fight').style.cursor = 'not-allowed';
}
function enableFightBtn() {
  document.getElementById('fight').style.filter = 'grayscale(0)';
  document.getElementById('fight').removeAttribute('disabled', 'true');
  document.getElementById('fight').style.cursor = 'pointer';
}
async function fight() {
  let battle = document.getElementById("fight").myBattle;
  let player = battle.player;
  let enemy = battle.enemy;
  disableFightBtn();
  drawBattle(battle);
  for (let i = 0; i < 2; i++) {
    battle.fight(player, enemy);
    drawBattle(battle);
    await waitForMe(500);
    if (!battle.inBattle) {
      displayWinner(player, enemy);
      stopFight(player, battle);
    }
  }
  enableFightBtn();
}

function displayWinner(player, enemy) {
  //check who won and output
  if (player.healthStat <= 0) {
    document.getElementById('battle-results').innerText = `Monster ${enemy.name} wins!`;
    document.getElementById('battle-results').removeAttribute('class');
  } else if (enemy.healthStat <= 0) {
    document.getElementById('battle-results').innerText = `Player ${player.name} wins!`;
    document.getElementById('battle-results').removeAttribute('class');
    enemyDeath();
  }
}
function stopFight(player) {
  document.getElementById("fight").removeEventListener("click", fight);
  storeObject("player", player);
  showReturnBtn();
}
function enemyDeath() {
  $('#enemy').attr('width', "121px");
  $('#enemy').attr('height', "131px");
  $('#enemy').attr('src', "https://cdn.discordapp.com/attachments/820918363001454592/1047936942798553168/enemy-death.gif");
}

export function logFirstTurn(entity) {
  document.getElementById('battle-log').removeAttribute('class');
  const div = document.createElement('div');
  div.append(`${entity.name} goes first.`);
  document.getElementById('battle-log').append(div);
}
export function logDamage(attacker, defender, damage) {
  const div = document.createElement('div');
  div.append(`${attacker.name} deals ${damage} damage to ${defender.name}.`);
  document.getElementById('battle-log').append(div);
}

async function battleStart() {
  let player = retrieveObject("player");
  let enemy = new Entity("WIZARD");
  enemy.enemyStats();
  let battle = new Battle("battle1", player, enemy, "forest");
  await waitForMe(1000);
  battle.firstTurn(player, enemy);
  document.getElementById("fight").addEventListener("click", fight);
  document.getElementById("fight").myBattle = battle;
  drawBattle(battle);
}

function initiateBattle() {
  document.getElementById("secondmap").setAttribute("class", "shake");
  $("#secondmap-arrival").hide();
  $("#battle-startmessage").show();
  setTimeout(function(){
    let char = document.getElementById("char");
    let enemy = document.getElementById("enemy");
    $("#basemap").hide();
    $("#secondmap").hide();
    $("#thirdmap").hide();
    $("#battle").show();
    $("#controls").show();
    $("#stats").show();
    $("#battle-start").hide();
    char.style.left ="390px";
    enemy.style.left ="450px";
    char.style.top ="-80px";
    enemy.style.top ="225px";
    $("#battle-startmessage").hide();    
  }, 1000);
  battleStart();
}
function showReturnBtn() {
  $('#controls').hide();
  $('#return').show();
  $('#return-btn').click(returnFromBattle);
}

function returnFromBattle() {
  $('#battle').hide();
  $('#return').hide();
  $('#stats').hide();
  $('#enemy').hide();
  $('#secondmap').show();
  $("#secondmap-return").show();
  setTimeout(() => {
    $("#right-arrow").show();
  }, 1000);
  $('#battle-log').html(null);
  $('#battle-results').html(null);
  $("#right-arrow").click(function() {
    $("secondmap").hide;
    $("thirdmap").show;
  });
}

//map event listener
window.addEventListener("load", function() {
  document.getElementById("battle-start").addEventListener("click", initiateBattle);
  let char = document.getElementById("char");
  let enemy = document.getElementById("enemy");
  // get name of player and begin game
  document.getElementById("name-form").addEventListener("submit", (event) => {
    event.preventDefault();
    $("#intro-message").fadeIn(2000);
    $("#sidebar-heading").slideUp(1000);
    document.getElementById("bottom-arrow").style.opacity = "0.7";
    let nameInput = document.getElementById("name-input").value;
    nameInput = nameInput.toUpperCase();
    document.getElementById("name-goes-here").innerText = nameInput;
    let player = new Entity(nameInput);
    storeObject("player", player);
  });
  // player move to second map
  document.getElementById("bottom-arrow").addEventListener('click', function() {
    char.setAttribute("class", "move");
    setTimeout(() => {
      document.getElementById("base").setAttribute("class", "hidden");
      document.getElementById("secondmap").removeAttribute("class");
      $("#bottom-arrow").hide();
      $("#intro-message").hide();
      $("#secondmap-arrival").show();
    }, 4000);
  });
  char.addEventListener('animationend', function () {
    char.removeAttribute("class", "move");
    char.style.top = "10px";
    char.setAttribute("class", "secondMove");
    enemy.removeAttribute("class", "hidden");
   
    setTimeout(() => {
      document.getElementById('sidebar-heading').setAttribute('class', 'hidden text-center');
      document.getElementById("battleStats").setAttribute("class", "text-center");
      $("#battleStats").fadeIn(5000);
      document.getElementById("secondmap").removeAttribute("class");
    }, 4000);
  });
});

document.getElementById("bottom-arrow").addEventListener('click', function() {
  let char = document.getElementById("char");
  char.addEventListener('animationend', function () {
    setTimeout(() => {
      document.getElementById('sidebar-heading').setAttribute('class', 'hidden');
      document.getElementById("battleStats").removeAttribute("class", "hidden");
      document.getElementById('sidebar-heading').setAttribute('class', 'hidden text-center');
    }, 2000);
  });
});