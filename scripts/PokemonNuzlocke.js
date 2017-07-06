// Pokemon Nuzlocke Script
const ScriptState = require(`${global.__lib_core}/ScriptState.js`);
const logger = require(`${global.__lib}/logger.js`);
const moment = require('moment');

class Script extends ScriptState {
  constructor() {
    super();

    this.compatibleMappers = ['PokemonRedBlue.gb'];
    this.persistData = true;

    this.inWildCombat = false;
    this.catchable = null;
    this.notification = null;

    this.data.encounters = [];
    this.data.deadPokemon = [];
  }
  run(gameState) {
    // Rule #1: Any Pokémon that faints is considered dead, and must be released.
    try {
      for (var i = 1; i <= gameState.player.partyCount.value; i++) {
        var pokemon = gameState.player.party['slot' + i];

        // Checks if the Pokemon's health just hit zero.
        let healthIsZero = pokemon && pokemon.nickname.value != '' && pokemon.health.value == 0 && pokemon.maxHealth.value != 0;

        // Check for a dead original trainer, this is to prevent bugs where
        // players can revive Pokemon by putting them in a PC or leaving them at the daycare.
        let deadOrigTrainer = pokemon && pokemon.trainerNickname.value == 'DEAD' && pokemon.maxHealth.value != 0;

        if (healthIsZero || deadOrigTrainer) {
          var originalMaxHealth = pokemon.maxHealth.value;

          // Change the Pokemon's HP to 0 and change their Trainer's Nickname to DEAD.
          pokemon.health.setHex(['00', '00']);
          pokemon.maxHealth.setHex(['00', '00']);
          pokemon.trainerNickname.setHex(['83', '84', '80', '83', '50']);

          // Save a record of their dead Pokemon in the game state.
          this.data.deadPokemon.push({
            nickname: pokemon.nickname.value,
            species: pokemon.species.value.name,
            health: originalMaxHealth,
            timestamp: Date.now()
          });
          this.saveData();
        }
      }
    } catch (ex) {
      logger.error(ex);
    }

    // Rule #2: Do not allow capture of Pokemon past the first encounter of an area.
    try {
      // Make sure they are in a wild battle.
      var isInBattle = gameState.battle.isInBattle.value;
      if (isInBattle == 'WILD' && this.inWildCombat == false) {

        this.inWildCombat = true;

        // Find their current area, and their previous encounter, if they've had one.
        var location = gameState.map.loadedMap.value.area || null;
        var previousEncounter = this.data.encounters.find(x => x.location == location);
        var alreadyCaught = gameState.pokedex.caught.value[gameState.battle.enemy.species.value.number - 1] == true;

        // Check if the Pokemon is catchable.
        if (previousEncounter == null && alreadyCaught == false) {
          // The Pokemon is catchable.
          this.catchable = true;
          this.notification = `Catchable! This is your first Pokemon encounter in this area.`;

          // Save a record of their encounter in the game state.
          this.data.encounters.push({
            location: location,
            species: gameState.battle.enemy.species.value.name,
            timestamp: Date.now()
          });

          this.saveData();
        } else {
          // The Pokemon is not catchable.
          this.catchable = false;

          if (previousEncounter) {
            this.notification = `Not catchable! Encountered a ${previousEncounter.species} in this area ${moment(previousEncounter.timestamp).fromNow()}.`;
          } else if (alreadyCaught == true) {
            this.notification = `Not catchable! You have already caught a ${gameState.battle.enemy.species.value.name} previously.`;
          } else {
            this.notification = 'Not catchable!';
          }

          gameState.battle.enemy.catchRate.setHex(['00']);
        }
      } else if (isInBattle != 'WILD' && this.inWildCombat == true) {
        // A battle has just ended.
        this.inWildCombat = false;
        this.catchable = null;
        this.notification = null;
      }
    } catch (ex) {
      logger.error(ex);
    }

    // Return results of the script back to the API.
    return {
      notification: this.notification,
      inWildCombat: this.inWildCombat,
      catchable: this.catchable,
      previousEncounter: previousEncounter
    };
  }
};

module.exports = new Script;
