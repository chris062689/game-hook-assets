const GameState = require(`${global.__lib_core}/GameState.js`);
const GameStateHelper = require(`${global.__lib_core}/HelperFunctions.js`);

const Hex = require(`${global.__lib_types}/hex.js`);
const Int = require(`${global.__lib_types}/int.js`);
const Ref = require(`${global.__lib_types}/ref.js`);
const BitArray = require(`${global.__lib_types}/bitarray.js`);

class Mapper extends GameState {
  constructor() {
    super();

    this.gameName = 'Dragon Quest 1 (NES)';

    this.map = {
      horizontalOffset: new Int(this, 0x11),
      loadedMap: new Ref(this, 0x45, 1, maps),
      loadedTileset: new Int(this, 0x12),
      exteriorTile: new Ref(this, 0x45, 1, tiles)
    };

    this.player = {
      standingOn: new Ref(this, 0xE0, 1, tiles),

      position: {
        x: new Int(this, 0x3A),
        y: new Int(this, 0x3B)
      },

      health: new Int(this, 0xC5),
      maxHealth: new Int(this, 0xCA),

      magic: new Int(this, 0xC6),
      maxMagic: new Int(this, 0xCB),

      attack: new Int(this, 0xCC),
      defense: new Int(this, 0xCD),

      level: new Int(this, 0xC7),

      gold: new Int(this, 0xBC, 2),

      magicKeys: new Int(this, 0xBF),

      herbs: new Int(this, 0xC0),

      items: GameStateHelper.TypeArrayNybble(this, Ref, 0xC1, 8, items)
    };

    this.overworldInactivityTimer = new Int(this, 0x4F);

    this.buttonsPressed = new Int(this, 0x47);

    this.lightRadius = new Ref(this, 0xD0, 1, lightRadius);

    this.battle = {
      enemy: new Ref(this, 0xE0, 1, enemies)
    }
  }
}

let maps = {
  "01": "WORLD MAP",
  "02": "CHARLOCK CASTLE",
  "03": "RUINS OF HAUKSNESS",
  "04": "TANTEGEL CASTLE",
  "05": "THRONE ROOM",
  "06": "DRAGONLORD'S LAIR",
  "07": "KOL",
  "08": "BRECONARY",
  "09": "GARINHAM",
  "0A": "CANTLIN",
  "0B": "RIMULDAR",
  "0C": "SUN SHRINE",
  "0D": "RAIN SHRINE",
  "0E": "MAGIC TEMPLE",
  "0F": "DRAGONLORD B1",
  "10": "DRAGONLORD B2",
  "11": "DRAGONLORD B3",
  "12": "DRAGONLORD B4",
  "13": "DRAGONLORD B5",
  "14": "DRAGONLORD B6",
  "15": "SWAMP CAVE",
  "16": "MOUNTAIN CAVE B1",
  "17": "MOUNTAIN CAVE B2",
  "18": "GARIN'S GRAVE B1",
  "19": "GARIN'S GRAVE B2",
  "1A": "GARIN'S GRAVE B3",
  "1B": "GARIN'S GRAVE B4",
  "1C": "EDRICK'S CAVE B1",
  "1D": "EDRICK'S CAVE B2"
}

let tiles = {
  "00": "GRASS",
  "01": "DIRT",
  "03": "STAIRS",
  "04": "COBBLESTONE",
  "05": "STAIRS",
  "06": "MARSH",
  "09": "TOWN",
  "10": "STONE",
  "15": "WATER",
  "16": "CAVES",
  "21": "THRONE",
  "26": "REDCOBBLESTONE",
  "0A": "BRIDGE",
  "0B": "TREES",
  "0C": "CHEST"
};

let enemies = {
  "00": "SLIME",
  "01": "RED SLIME",
  "02": "DRAKEE",
  "03": "GHOST",
  "04": "MAGICIAN",
  "05": "MAGIDRAKEE",
  "06": "SCORPION",
  "07": "DRUIN",
  "08": "POLTERGEIST",
  "09": "DROLL",
  "0A": "DRAMEEMA",
  "0B": "SKELETON",
  "0C": "WARLOCK",
  "0D": "METAL SCORPION",
  "0E": "WOLF",
  "0F": "WRAITH",
  "10": "METAL SLIME",
  "11": "SPECTER",
  "12": "WOLFLORD",
  "13": "DRUINLORD",
  "14": "DROLLMAGI",
  "15": "WYVERN",
  "16": "ROGUE SCORPION",
  "17": "WRAITH KNIGHT",
  "18": "GOLEM",
  "19": "GOLDMAN",
  "1A": "KNIGHT",
  "1B": "MAGIWYVERN",
  "1C": "DEMON KNIGHT",
  "1D": "WEREWOLF",
  "1E": "GREEN DRAGON",
  "1F": "STARWYVERN",
  "20": "WIZARD",
  "21": "AXE KNIGHT",
  "22": "BLUE DRAGON",
  "23": "STONEMAN",
  "24": "ARMORED KNIGHT",
  "25": "RED DRAGON",
  "26": "DRAGONLORD 1",
  "27": "DRAGONLORD 2"
};

var items = {
  "0": null,
  "1": "TORCH",
  "2": "FAIRY WATER",
  "3": "WINGS",
  "4": "DRAGON'S SCALE",
  "5": "FAIRY FLUTE",
  "6": "FIGHTER'S RING",
  "7": "ERDRICK'S TOKEN",
  "8": "GWAELIN'S LOVE",
  "9": "CURSED BELT",
  "A": "SILVER HARP",
  "B": "DEATH'S NECKLACE",
  "C": "STONES OF SUNLIGHT",
  "D": "STAFF OF RAIN",
  "E": "RAINBOW DROP",
  "F": "HERB"
};

var equipmentWeapons = {
  "20": "BAMBOO POLE",
  "40": "CLUB",
  "60": "COPPER SWORD",
  "80": "HAND AXE",
  "A0": "BROAD SWORD",
  "C0": "FLAME SWORD",
  "E0": "EDRICK'S SWORD"
}

var equipmentArmor = {
  "04": "CLOTHES",
  "08": "LEATHER ARMOR",
  "0C": "CHAIN MAIL",
  "10": "HALF-PLATE ARMOR",
  "14": "FULL-PLATE ARMOR",
  "18": "MAGIC ARMOR",
  "1C": "EDRICK'S ARMOR"
}

var equipmentShields = {
  "01": "SMALL SHIELD",
  "02": "LARGE SHIELD",
  "03": "SILVER SHIELD"
}

var lightRadius = {
  "01": "1 TILE",
  "03": "SEMI_LOW_LIGHT",
  "05": "?",
  "07": "?",
  "16": "?"
}

module.exports = new Mapper;
