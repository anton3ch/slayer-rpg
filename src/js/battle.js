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
  }

  firstTurn(player, enemy) {
    if (playerIsFast(player, enemy)) {
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
    checkTurn(player, enemy);
    checkHealth(player, enemy)
  }

  tacticalRetreat(player, enemy) {
    try {
      if (!playerIsFast(player, enemy)) {
        let error = "too slow";
        throw new Error(error);
      } else {
        exit;
      }
    }
    catch(error) {
      return error;
    }
  }
}

function playerIsFast(player, enemy) {
  if (player.speedStat >= enemy.speedStat) {
    return true;
  }
  return false;
} 

function checkTurn() {
  if (this.turn % 2 === 0) { 
    player.attack(enemy);
    this.turn++;
  } else {
    enemy.attack(player);
    this.turn++;
  }
}

function checkHealth(player, enemy) {
  if (player.healthStat > 0 || enemy.healthStat > 0) {
    return true;
  } else {
    return false;
  }   
}