import { logFirstTurn, logDamage, playerAttackAnimation, enemyAttackAnimation } from './../index.js';

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
      setTimeout(() => {
        logFirstTurn(player);
      }, 1000);
      return;
    }
    this.turn = 1;
    setTimeout(() => {
      logFirstTurn(enemy);
    }, 1000);
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
    this.combatEnd(player, enemy);
  }

  attack(attacker, defender) {
    let damage = attacker.damageStat - defender.armorStat;
    if (damage < 1 ) {
      damage = 1;
    }
    defender.healthStat -= damage;
    logDamage(attacker, defender, damage);
  }

  tacticalRetreat(player, enemy) {
    try {
      if (!this.playerIsFast(player, enemy)) {
        let error = "too slow";
        throw new Error(error);
      } else {
        this.inBattle = false;
        return 'you have successfully escaped';
      }
    }
    catch(error) {
      return error;
    }
  }

  combatEnd(player, enemy) {
    if (player.healthStat <= 0) {
      this.inBattle = false;
    } else if (enemy.healthStat <= 0) {
      this.inBattle = false;
    }
  }

  playerIsFast(player, enemy) {
    if (player.speedStat >= enemy.speedStat) {
      return true;
    }
    return false;
  } 
  
  checkTurn(player, enemy) {
    if (this.turn % 2 === 0) { 
      this.attack(player, enemy);
      playerAttackAnimation();
      // setTimeout(function(){
      //   enemyAttackAnimation();
      // }, 500)
      this.turn++;
      console.log("char attack")
    } else {
      this.attack(enemy, player);
      enemyAttackAnimation();
      this.turn++;
      console.log("enemy attack")
    }
  }
}
