// Pokemon Nuzlocke Script
const ScriptState = require(`${global.__lib_core}/ScriptState.js`);
const logger = require('winston');

class Script extends ScriptState {
  constructor() {
    super();

    // The below must be filled out.
    this.name = 'MyScript';
    this.filename = 'sample.json';
  }
  run(gameState) {
    // Check the GameState object to see if it is compatible.
    if (gameState.gameName != 'GAME NAME FROM MAPPER') {
      logger.warn(`[${this.name}] Loaded game is not compatible.`);
      return false;
    }

    if (this.loadedSavefile == false) {
      this.loadData();
    }

    // Do something here.
    // You can access variables based off the gameState passed in.
    // Ex: gameState.player.name.value
    // Ex: gameState.battle.name.setHex(['00']);

    // This will execute every tick.

    // You can also save anything stored within this.data using
    this.saveData();

    // Return results of the script back to the API.
    return {
      result: true
    };
  }
};

module.exports = new Script;
