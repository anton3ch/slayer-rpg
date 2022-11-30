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
    this.combatEnd(player, enemy);
  }

  attack(attacker, defender) {
    let damage = attacker.damageStat - defender.armorStat;
    if (damage < 1 ) {
      damage = 1;
    }
    defender.healthStat -= damage;
    console.log(damage);
  }

  tacticalRetreat(player, enemy) {
    try {
      if (!this.playerIsFast(player, enemy)) {
        let error = "too slow";
        throw new Error(error);
      } else {
        this.inBattle = false;
        return 'you have successfully escaped'
      }
    }
    catch(error) {
      return error;
    }
  }
  
  // updateDOM(player, enemy) {
  //   document.getElementById("enemy-health").innerText = enemy.healthStat;
  //   document.getElementById("player-health").innerText = player.healthStat;
  // }


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
      this.attack(player, enemy)
      this.turn++;
    } else {
      this.attack(enemy, player)
      this.turn++;
    }
  }
}
