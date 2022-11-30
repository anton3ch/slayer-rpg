export default class Entity {
  constructor(name, health = 100, armor = this.randomizer(10, 5), damage = this.randomizer(20, 10), speed = this.randomizer(10, 1)) {
    this.name = name;
    this.healthStat = health;
    this.armorStat = armor;
    this.damageStat = damage;
    this.speedStat = speed; 
  }  

  // constructor(name) {
  //   this.name = name;
  //   this.randomizeStats();
  // }

  randomizer(max, min) {
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    return a;
  }


  enemyStats() {
    this.healthStat = this.randomizer(50, 30);
    this.armorStat = this.randomizer(5, 2);
    this.damageStat = this.randomizer(10, 5);
    this.speedStat = this.randomizer(10, 1);
  }

  attack(entity) {
    let damage = this.damageStat - entity.armorStat;
    if (damage < 1 ) {
      damage = 1;
    }
    entity.healthStat -= damage;
  }
}
