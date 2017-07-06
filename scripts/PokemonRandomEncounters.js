// Pokemon Nuzlocke Script
const ScriptState = require(`${global.__lib_core}/ScriptState.js`);
const logger = require(`${global.__lib}/logger.js`);
const moment = require('moment');

class Script extends ScriptState {
  constructor() {
    super();

    this.name = 'PokemonRandomEncounters';
    this.compatibleMappers = ['PokemonRedBlue.gb'];
  }
  run(gameState) {
    try {
      // Change all encounters to random.
      for (var key in gameState.map.encounters) {
        var encounter = gameState.map.encounters[key];
        var randomEncounter =Math.floor(Math.random() * 255);
        encounter.species.setHex(randomEncounter.toString(16));
      }
    } catch (ex) {
      logger.error(ex);
    }

    // Return results of the script back to the API.
    return {};
  }
};

module.exports = new Script;
