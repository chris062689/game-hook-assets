// Pokemon Nuzlocke Script
const ScriptState = require(`${global.__lib_core}/ScriptState.js`);
const logger = require(`${global.__lib}/logger.js`);

class Script extends ScriptState {
  constructor() {
    super();

    this.name = 'PokemonShinyDetect';
    this.compatibleMappers = ['PokemonRedBlue.gb'];

    this.ran = false;

    this.data.encounters = [];
    this.data.deadPokemon = [];
  }
  run(gameState) {
    var shiny = null;
    var notification = null;

    try {
      /*
        In Generation 2, shininess is determined by IVs - specifically, Speed/Defense/Special must be equal to 10,
        and Attack must be 2/3/6/7/10/11/14/15. (Note that IVs only go up to 15 in the Game Boy games).
        Pokebank attemps to take this into account, but gets the role of the Attack and Defense IVs exactly backwards.
        Meaning, Pokemon that would be shiny in GSC lose their shininess, and other pokemon will gain shininess.
      */
      if (this.ran == false && gameState.battle.isInBattle.value == 'WILD') {

        // Only run this check once per wild battle.
        this.ran = true;

        var enemy = gameState.battle.enemy;
        var atk = enemy.attack.value;
        var spd = enemy.speed.value;
        var def = enemy.defense.value;
        var spe = enemy.special.value;

        var message = "";
        var stats = `ATK: ${atk} SPD: ${spd} DEF ${def} SPE ${spe}`;

        if (atk in [1, 2, 3] && (spd + def + spe) == 30) {
          message = `WILD ${enemy.nickname.value} is a shiny Pokemon!`;
          this.shiny = true;
        } else {
          message = `WILD ${enemy.nickname.value} is not a shiny.`;
          this.shiny = false;
        }

        this.notification = message;
      } else {
        if (this.ran && gameState.battle.isInBattle.value != 'WILD') {
          // The battle has ended, so reset the trigger.
          this.ran = false;
          this.shiny = null;
          this.notification = null;
        }
      }

    } catch (ex) {
      logger.error(ex);
    }

    // Return results of the script back to the API.
    return {
      notification: this.notification,
      shiny: this.shiny
    };
  }
};

module.exports = new Script;
