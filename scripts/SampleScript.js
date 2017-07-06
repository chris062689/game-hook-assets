// Pokemon Nuzlocke Script
const ScriptState = require(`${global.__lib_core}/ScriptState.js`);
const logger = require(`${global.__lib}/logger.js`);

class Script extends ScriptState {
  constructor() {
    super();

    this.compatibleMappers = ['GameName.system'];
    this.persistData = false;
  }
  run(gameState) {
    try {
      // Do something here.
      // You can access variables based off the gameState passed in.
      // Ex: gameState.player.name.value
      // Ex: gameState.battle.name.setHex(['00']);

      // This will execute every tick.

      // You can save anything stored within this.data using
      // the saveData function is persistData is set to true.
      // this.saveData();
    } catch (ex) {
      logger.error(ex);
    }

    // Return results of the script back to the API.
    return {
      notification: null,
      result: true
    };
  }
};

module.exports = new Script;
