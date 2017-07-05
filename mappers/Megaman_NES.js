const GameState = require(`${global.__lib_core}/GameState.js`);
const GameStateHelper = require(`${global.__lib_core}/HelperFunctions.js`);

const Hex = require(`${global.__lib_types}/hex.js`);
const Int = require(`${global.__lib_types}/int.js`);
const Ref = require(`${global.__lib_types}/ref.js`);
const BitArray = require(`${global.__lib_types}/bitarray.js`);

class Mapper extends GameState {
  constructor() {
    super();

    this.gameName = 'Megaman (NES)';

    this.stage = {
      map: new Ref(this, 0x31, 1, stages),
      bossHealth: new Int(this, 0x6C1)
    };

    this.player = {
      lives: new Int(this, 0xA6),
      bonus: new Int(this, 0xAE),
      health: new Int(this, 0x6A),
      score: new Int(this, 0x72, 4),
      position: {
        x: new Int(this, 0x22),
        y: new Int(this, 0x25),
        touchingTop: new Ref(this, 0x2C, 1, touching),
        touchingSides: new Ref(this, 0x94, 1, touching)
      },
      enemiesDefeated: new Ref(this, 0x5D, 1, enemies),
      weapons: {
        equiped: new Ref(this, 0x5F, 1, weapons),
        cutmanEnergy: new Int(this, 0x6B),
        icemanEnergy: new Int(this, 0x6C),
        bombmanEnergy: new Int(this, 0x6D),
        firemanEnergy: new Int(this, 0x6E),
        elecmanEnergy: new Int(this, 0x6F),
        gutsmanEnergy: new Int(this, 0x70),
        magnetbeamEnergy: new Int(this, 0x71)
      }
    };
  }
}

var touching = {
  "00": "AIR",
  "01": "SOLID",
  "02": "LADDER",
  "03": "SPIKE",
  "04": "ICE",
  "05": "WATER",
  "81": "BLOCK?"
}

var weapons = {
  "00": "MEGA BUSTER",
  "01": "HYPER BOMB",
  "02": "THUNDER BEAM",
  "03": "SUPER ARM",
  "04": "ICE SLASHER",
  "05": "ROLLING CUTTER",
  "06": "FIRE STORM",
  "07": "MAGNET BEAM"
}

var enemies = {
  "00": "NONE"
}

var stages = {
  "00": "CUTMAN",
  "01": "ICEMAN",
  "02": "BOMBMAN",
  "03": "FIREMAN",
  "04": "ELECMAN",
  "05": "GUTSMAN",
  "06": "WILY 1",
  "07": "WILY 2",
  "08": "WILY 3",
  "09": "WILY 4",
  "0A": "TITLE SCREEN",
  "0B": "ENDING"
}

module.exports = new Mapper;
