import Entity from './entities.js';

const player = new Entity();
const enemy = new Entity();

export default class Battle {
  constructor(name, player, enemy, setting) {
    this.battleName = name;
    this.player = player;
    this.enemy = enemy;
    this.setting = setting;
    this.turn = 0; // % 2 = 0 player turn | % 2 = 1 enemy turn
    this.inBattle = true;
  }

  firstTurn(player, enemy) {
    if (this.playerIsFast(player, enemy)) {
      this.turn = 0;
      return;
    }
    this.turn = 1;
  }

  heal(entity) {
    if (entity.healthStat > 0 && entity.healthStat < 100) {
      entity.healthStat += 10;
    }
    if (entity.healthStat > 100) {
      entity.healthStat = 100;
    }
  }

  fight(player, enemy) {
    this.checkTurn(player, enemy);
    this.combatEnd(player, enemy)
  }

  tacticalRetreat(player, enemy) {
    try {
      if (!this.playerIsFast(player, enemy)) {
        let error = "too slow";
        throw new Error(error);
      } else {
        this.inBattle = false;
      }
    }
    catch(error) {
      return error;
    }
  }
  
  combatEnd(player, enemy) {
    if (player.healthStat < 0) {
      this.inBattle = false;
      return 'enemy wins';
    } else if (enemy.healthStat < 0) {
      this.inBattle = false;
      return 'player wins';
    }
  }

  playerIsFast(player, enemy) {
    if (player.speedStat >= enemy.speedStat) {
      return true;
    }
    return false;
  } 
  
  checkTurn() {
    if (this.turn % 2 === 0) { 
      player.attack(enemy);
      this.turn++;
    } else {
      enemy.attack(player);
      this.turn++;
    }
  }
}
