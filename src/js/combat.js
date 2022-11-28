export default class Entity {
  constructor(name) {
    this.name = name;
    this.healthStat = 90-100;
    this.armorStat = 5-10;
    this.damageStat = 10-20;
    this.speedStat = 1-10; 
  }  
}
function randomizer(max, min) {
// generating a random number
const a = Math.floor(Math.random() * (max - min + 1)) + min;
return a
}

function newBattle() {
  let randomhealht = randomizer()
  let player = new Entity('sam', randomizer(90,100), randomizer(5,100));
  player.speedStat = 2
  let enemy = new Entity("snake");
  return player;
}
// button for attack
// button for run

function attack(player, enemy) {
  let damage = player.damageStat - enemy.armorStat;
  enemy.healthStat -= damage;
  //increment turn function
}
