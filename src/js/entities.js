export default class Entity {
  constructor(name, health, armor, damage, speed) {
    this.name = name;
    this.healthStat = health;
    this.armorStat = armor;
    this.damageStat = damage;
    this.speedStat = speed; 
  }  

  constructor(name) {
    this.name = name;
    this.randomizeStats();
  }

  randomizer(max, min) {
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    return a
  };

  randomizeStats() {
    this.healthStat = randomizer(100, 90);
    this.armorStat = randomizer(10, 5);
    this.damageStat = randomizer(20, 10);
    this.speedStat = randomizer(10, 1);
  };

  attack(entity) {
    let damage = this.damageStat - entity.armorStat;
    entity.healthStat -= damage;
  }
}

//ui
// window.addEventListener("load", () => {
//   let player;
//   player = onload();
//   newBattle(player);

//   document.getElementById("attack").addEventListener('click', attack);
//   document.getElementById("run").addEventListener('run', run);
// })