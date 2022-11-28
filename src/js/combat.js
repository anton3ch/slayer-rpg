export default class Entity {
  constructor(name, health, armor, damage, speed) {
    this.name = name;
    this.healthStat = health;
    this.armorStat = armor;
    this.damageStat = damage;
    this.speedStat = speed; 
  }  
}
function randomizer(max, min) {
  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  return a
}

function onload() {
  let playerHealth = randomizer(100, 90);
  let playerArmor = randomizer(10, 5);
  let playerDmg = randomizer(20, 10);
  let playerSpeed = randomizer(10, 1);
  let player = new Entity('sam', playerHealth, playerArmor, playerDmg, playerSpeed);
  return player;
}

function newBattle(player) {
  let enemyHealth = randomizer(100, 90);
  let enemyArmor = randomizer(10, 5);
  let enemyDmg = randomizer(20, 10);
  let enemySpeed = randomizer(10, 1);
  let enemy = new Entity('snake', enemyHealth, enemyArmor, enemyDmg, enemySpeed);
}

function attack(player, enemy) {
  let damage = player.damageStat - enemy.armorStat;
  enemy.healthStat -= damage;
  //increment turn function
}
//ui
window.addEventListener("load", () => {
  let player;
  player = onload();
  newBattle(player);
  document.getElementById("attack").addEventListener('click', attack);
  document.getElementById("run").addEventListener('run', attack);
})

Turn 1


