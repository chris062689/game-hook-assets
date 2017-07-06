const GameState = require(`${global.__lib_core}/GameState.js`);
const GameStateHelper = require(`${global.__lib_core}/HelperFunctions.js`);

const Hex = require(`${global.__lib_types}/hex.js`);
const Int = require(`${global.__lib_types}/int.js`);
const Ref = require(`${global.__lib_types}/ref.js`);
const BitArray = require(`${global.__lib_types}/bitarray.js`);

function EncounterStruct(gameState, address) {
  return {
    level: new Int(gameState, address),
    species: new Ref(gameState, address + 1, 1, pokemon)
  }
}

function PartyPokemonStruct(gameState, aSpecies, aNickname, aLevel, aHealth, aMaxHealth, aTrainerId, aTrainerNickname) {
  return {
    species: new Ref(gameState, aSpecies, 1, pokemon),
    nickname: new Ref(gameState, aNickname, 11, string),
    level: new Int(gameState, aLevel, 1),
    health: new Int(gameState, aHealth, 2),
    maxHealth: new Int(gameState, aMaxHealth, 2),
    trainerId: new Int(gameState, aTrainerId, 2),
    trainerNickname: new Ref(gameState, aTrainerNickname, 11, string)
  }
}

class Mapper extends GameState {
  constructor() {
    super();

    this.gameName = 'PokemonRedBlue.gb';

    this.map = {
      loadedMap: new Ref(this, 0xd35e, 1, maps),
      encounterRate: new Int(this, 0xd887),
      encounters: {
        common1: EncounterStruct(this, 0xd888),
        common2: EncounterStruct(this, 0xd88a),
        common3: EncounterStruct(this, 0xd88c),
        common4: EncounterStruct(this, 0xd88e),
        uncommon1: EncounterStruct(this, 0xd890),
        uncommon2: EncounterStruct(this, 0xd892),
        uncommon3: EncounterStruct(this, 0xd894),
        uncommon4: EncounterStruct(this, 0xd896),
        rare1: EncounterStruct(this, 0xd898),
        rare2: EncounterStruct(this, 0xd89a)
      }
    }

    this.pokedex = {
      seen: new BitArray(this, 0xd30a, 19),
      caught: new BitArray(this, 0xd2f7, 19)
    };

    this.player = {
      name: new Ref(this, 0xd158, 11, string),
      starter: new Ref(this, 0xd717, 1, pokemon),
      badges: new BitArray(this, 0xd356),
      party: {
        slot1: PartyPokemonStruct(this, 0xd164, 0xd2b5, 0xd18c, 0xd16c, 0xd18d, 0xd8b0, 0xd273),
        slot2: PartyPokemonStruct(this, 0xd165, 0xd2c0, 0xd1b8, 0xd198, 0xd1b9, 0xd8dc, 0xd27e),
        slot3: PartyPokemonStruct(this, 0xd166, 0xd2cb, 0xd1e4, 0xd1c4, 0xd1e5, 0xd908, 0xd289),
        slot4: PartyPokemonStruct(this, 0xd167, 0xd2d6, 0xd210, 0xd1f0, 0xd211, 0xd934, 0xd294),
        slot5: PartyPokemonStruct(this, 0xd168, 0xd2e1, 0xd23c, 0xd21c, 0xd23d, 0xd960, 0xd29f),
        slot6: PartyPokemonStruct(this, 0xd169, 0xd2ec, 0xd268, 0xd248, 0xd269, 0xd98c, 0xd2aa)
      },
      partyCount: new Int(this, 0xd163)
    }

    this.battle = {
      isInBattle: new Ref(this, 0xd057, 1, isInBattle),
      battleType: new Ref(this, 0xd05a, 1, battleTypes),
      trainer: {
        species: new Ref(this, 0xd031, 1, pokemon),
        name: new Ref(this, 0xd04a, 11, string),
        money: new Int(this, 0xd046, 2)
      },
      enemy: {
        species: new Ref(this, 0xcfe5, 1, pokemon),
        nickname: new Ref(this, 0xcfda, 11, string),
        level: new Int(this, 0xd127),
        health: new Int(this, 0xcfe6, 2),
        maxHealth: new Int(this, 0xcff4, 2),
        catchRate: new Int(this, 0xd007),
        attack: new Int(this, 0xcff6, 2),
        defense: new Int(this, 0xcff8, 2),
        speed: new Int(this, 0xcffa, 2),
        special: new Int(this, 0xcffc, 2)
      },
      ally: {
        species: new Ref(this, 0xd014, 1, pokemon),
        nickname: new Ref(this, 0xd009, 11, string)
      }
    }

    this.rival = {
      name: new Ref(this, 0xd34a, 11, string),
      starter: new Ref(this, 0xd715, 1, pokemon)
    }
  }
}

var isInBattle = {
  "00": false,
  "01": "WILD",
  "02": "TRAINER",
  "FF": "LOST"
}

var battleTypes = {
  "00": "NORMAL",
  "O1": "OLDMAN",
  "02": "SAFARI"
}

var pokemonTypes = {
  "00": null,
  "3F": null,
  "F1": null,
  "38": null,
  "86": null,
  "5F": null,
  "04": null,
  "8B": null
}

var pokemon = {
  "00": {
    "number": 0,
    "name": "MISSINGNO."
  },
  "FF": {
    "number": 0,
    "name": "MISSINGNO."
  },
  "34": {
    "number": 0,
    "name": "MISSINGNO."
  },

  "01": {
    "number": 112,
    "name": "RHYDON"
  },
  "02": {
    "number": 115,
    "name": "KANGASKHAN"
  },
  "03": {
    "number": 32,
    "name": "NIDORANM"
  },
  "04": {
    "number": 35,
    "name": "CLEFAIRY"
  },
  "05": {
    "number": 21,
    "name": "SPEAROW"
  },
  "06": {
    "number": 100,
    "name": "VOLTORB"
  },
  "07": {
    "number": 34,
    "name": "NIDOKING"
  },
  "08": {
    "number": 80,
    "name": "SLOWBRO"
  },
  "09": {
    "number": 2,
    "name": "IVYSAUR"
  },
  "0A": {
    "number": 103,
    "name": "EXEGGUTOR"
  },
  "0B": {
    "number": 108,
    "name": "LICKITUNG"
  },
  "0C": {
    "number": 102,
    "name": "EXEGGCUTE"
  },
  "0D": {
    "number": 88,
    "name": "GRIMER"
  },
  "0E": {
    "number": 94,
    "name": "GENGAR"
  },
  "0F": {
    "number": 29,
    "name": "NIDORANF"
  },
  "10": {
    "number": 31,
    "name": "NIDOQUEEN"
  },
  "11": {
    "number": 104,
    "name": "CUBONE"
  },
  "12": {
    "number": 111,
    "name": "RHYHORN"
  },
  "13": {
    "number": 131,
    "name": "LAPRAS"
  },
  "14": {
    "number": 59,
    "name": "ARCANINE"
  },
  "15": {
    "number": 151,
    "name": "MEW"
  },
  "16": {
    "number": 130,
    "name": "GYARADOS"
  },
  "17": {
    "number": 90,
    "name": "SHELLDER"
  },
  "18": {
    "number": 72,
    "name": "TENTACOOL"
  },
  "19": {
    "number": 92,
    "name": "GASTLY"
  },
  "1A": {
    "number": 123,
    "name": "SCYTHER"
  },
  "1B": {
    "number": 120,
    "name": "STARYU"
  },
  "1C": {
    "number": 9,
    "name": "BLASTOISE"
  },
  "1D": {
    "number": 127,
    "name": "PINSIR"
  },
  "1E": {
    "number": 114,
    "name": "TANGELA"
  },
  "21": {
    "number": 58,
    "name": "GROWLITHE"
  },
  "22": {
    "number": 95,
    "name": "ONIX"
  },
  "23": {
    "number": 22,
    "name": "FEAROW"
  },
  "24": {
    "number": 16,
    "name": "PIDGEY"
  },
  "25": {
    "number": 79,
    "name": "SLOWPOKE"
  },
  "26": {
    "number": 64,
    "name": "KADABRA"
  },
  "27": {
    "number": 75,
    "name": "GRAVELER"
  },
  "28": {
    "number": 113,
    "name": "CHANSEY"
  },
  "29": {
    "number": 67,
    "name": "MACHOKE"
  },
  "2A": {
    "number": 122,
    "name": "MR.MIME"
  },
  "2B": {
    "number": 106,
    "name": "HITMONLEE"
  },
  "2C": {
    "number": 107,
    "name": "HITMONCHAN"
  },
  "2D": {
    "number": 24,
    "name": "ARBOK"
  },
  "2E": {
    "number": 47,
    "name": "PARASECT"
  },
  "2F": {
    "number": 54,
    "name": "PSYDUCK"
  },
  "30": {
    "number": 96,
    "name": "DROWZEE"
  },
  "31": {
    "number": 76,
    "name": "GOLEM"
  },
  "33": {
    "number": 126,
    "name": "MAGMAR"
  },
  "35": {
    "number": 125,
    "name": "ELECTABUZZ"
  },
  "36": {
    "number": 82,
    "name": "MAGNETON"
  },
  "37": {
    "number": 109,
    "name": "KOFFING"
  },
  "39": {
    "number": 56,
    "name": "MANKEY"
  },
  "3A": {
    "number": 86,
    "name": "SEEL"
  },
  "3B": {
    "number": 50,
    "name": "DIGLETT"
  },
  "3C": {
    "number": 128,
    "name": "TAUROS"
  },
  "40": {
    "number": 83,
    "name": "FARFETCH'D"
  },
  "41": {
    "number": 48,
    "name": "VENONAT"
  },
  "42": {
    "number": 149,
    "name": "DRAGONITE"
  },
  "46": {
    "number": 84,
    "name": "DODUO"
  },
  "47": {
    "number": 60,
    "name": "POLIWAG"
  },
  "48": {
    "number": 124,
    "name": "JYNX"
  },
  "49": {
    "number": 146,
    "name": "MOLTRES"
  },
  "4A": {
    "number": 144,
    "name": "ARTICUNO"
  },
  "4B": {
    "number": 145,
    "name": "ZAPDOS"
  },
  "4C": {
    "number": 132,
    "name": "DITTO"
  },
  "4D": {
    "number": 52,
    "name": "MEOWTH"
  },
  "4E": {
    "number": 98,
    "name": "KRABBY"
  },
  "52": {
    "number": 37,
    "name": "VULPIX"
  },
  "53": {
    "number": 38,
    "name": "NINETALES"
  },
  "54": {
    "number": 25,
    "name": "PIKACHU"
  },
  "55": {
    "number": 26,
    "name": "RAICHU"
  },
  "58": {
    "number": 147,
    "name": "DRATINI"
  },
  "59": {
    "number": 148,
    "name": "DRAGONAIR"
  },
  "5A": {
    "number": 140,
    "name": "KABUTO"
  },
  "5B": {
    "number": 141,
    "name": "KABUTOPS"
  },
  "5C": {
    "number": 116,
    "name": "HORSEA"
  },
  "5D": {
    "number": 117,
    "name": "SEADRA"
  },
  "60": {
    "number": 27,
    "name": "SANDSHREW"
  },
  "61": {
    "number": 28,
    "name": "SANDSLASH"
  },
  "62": {
    "number": 138,
    "name": "OMANYTE"
  },
  "63": {
    "number": 139,
    "name": "OMASTAR"
  },
  "64": {
    "number": 39,
    "name": "JIGGLYPUFF"
  },
  "65": {
    "number": 40,
    "name": "WIGGLYTUFF"
  },
  "66": {
    "number": 133,
    "name": "EEVEE"
  },
  "67": {
    "number": 136,
    "name": "FLAREON"
  },
  "68": {
    "number": 135,
    "name": "JOLTEON"
  },
  "69": {
    "number": 134,
    "name": "VAPOREON"
  },
  "6A": {
    "number": 66,
    "name": "MACHOP"
  },
  "6B": {
    "number": 41,
    "name": "ZUBAT"
  },
  "6C": {
    "number": 23,
    "name": "EKANS"
  },
  "6D": {
    "number": 46,
    "name": "PARAS"
  },
  "6E": {
    "number": 61,
    "name": "POLIWHIRL"
  },
  "6F": {
    "number": 62,
    "name": "POLIWRATH"
  },
  "70": {
    "number": 13,
    "name": "WEEDLE"
  },
  "71": {
    "number": 14,
    "name": "KAKUNA"
  },
  "72": {
    "number": 15,
    "name": "BEEDRILL"
  },
  "74": {
    "number": 85,
    "name": "DODRIO"
  },
  "75": {
    "number": 57,
    "name": "PRIMEAPE"
  },
  "76": {
    "number": 51,
    "name": "DUGTRIO"
  },
  "77": {
    "number": 49,
    "name": "VENOMOTH"
  },
  "78": {
    "number": 87,
    "name": "DEWGONG"
  },
  "7B": {
    "number": 10,
    "name": "CATERPIE"
  },
  "7C": {
    "number": 11,
    "name": "METAPOD"
  },
  "7D": {
    "number": 12,
    "name": "BUTTERFREE"
  },
  "7E": {
    "number": 68,
    "name": "MACHAMP"
  },
  "80": {
    "number": 55,
    "name": "GOLDUCK"
  },
  "81": {
    "number": 97,
    "name": "HYPNO"
  },
  "82": {
    "number": 42,
    "name": "GOLBAT"
  },
  "83": {
    "number": 150,
    "name": "MEWTWO"
  },
  "84": {
    "number": 143,
    "name": "SNORLAX"
  },
  "85": {
    "number": 129,
    "name": "MAGIKARP"
  },
  "88": {
    "number": 89,
    "name": "MUK"
  },
  "8A": {
    "number": 99,
    "name": "KINGLER"
  },
  "8B": {
    "number": 91,
    "name": "CLOYSTER"
  },
  "8D": {
    "number": 101,
    "name": "ELECTRODE"
  },
  "8E": {
    "number": 36,
    "name": "CLEFABLE"
  },
  "8F": {
    "number": 110,
    "name": "WEEZING"
  },
  "90": {
    "number": 53,
    "name": "PERSIAN"
  },
  "91": {
    "number": 105,
    "name": "MAROWAK"
  },
  "93": {
    "number": 93,
    "name": "HAUNTER"
  },
  "94": {
    "number": 63,
    "name": "ABRA"
  },
  "95": {
    "number": 65,
    "name": "ALAKAZAM"
  },
  "96": {
    "number": 17,
    "name": "PIDGEOTTO"
  },
  "97": {
    "number": 18,
    "name": "PIDGEOT"
  },
  "98": {
    "number": 121,
    "name": "STARMIE"
  },
  "99": {
    "number": 1,
    "name": "BULBASAUR"
  },
  "9A": {
    "number": 3,
    "name": "VENUSAUR"
  },
  "9B": {
    "number": 73,
    "name": "TENTACRUEL"
  },
  "9D": {
    "number": 118,
    "name": "GOLDEEN"
  },
  "9E": {
    "number": 119,
    "name": "SEAKING"
  },
  "A3": {
    "number": 77,
    "name": "PONYTA"
  },
  "A4": {
    "number": 78,
    "name": "RAPIDASH"
  },
  "A5": {
    "number": 19,
    "name": "RATTATA"
  },
  "A6": {
    "number": 20,
    "name": "RATICATE"
  },
  "A7": {
    "number": 33,
    "name": "NIDORINO"
  },
  "A8": {
    "number": 30,
    "name": "NIDORINA"
  },
  "A9": {
    "number": 74,
    "name": "GEODUDE"
  },
  "AA": {
    "number": 137,
    "name": "PORYGON"
  },
  "AB": {
    "number": 142,
    "name": "AERODACTYL"
  },
  "AD": {
    "number": 81,
    "name": "MAGNEMITE"
  },
  "B0": {
    "number": 4,
    "name": "CHARMANDER"
  },
  "B1": {
    "number": 7,
    "name": "SQUIRTLE"
  },
  "B2": {
    "number": 5,
    "name": "CHARMELEON"
  },
  "B3": {
    "number": 8,
    "name": "WARTORTLE"
  },
  "B4": {
    "number": 6,
    "name": "CHARIZARD"
  },
  "B9": {
    "number": 43,
    "name": "ODDISH"
  },
  "BA": {
    "number": 44,
    "name": "GLOOM"
  },
  "BB": {
    "number": 45,
    "name": "VILEPLUME"
  },
  "BC": {
    "number": 69,
    "name": "BELLSPROUT"
  },
  "BD": {
    "number": 70,
    "name": "WEEPINBELL"
  },
  "BE": {
    "number": 71,
    "name": "VICTREEBELL"
  }
}

var string = {
  "50": null,
  "00": "",
  "54": "#",
  "75": "…",
  "79": "┌",
  "7A": "─",
  "7B": "┐",
  "7C": "│",
  "7D": "└",
  "7E": "┘",
  "74": "№",
  "7F": " ",
  "80": "A",
  "81": "B",
  "82": "C",
  "83": "D",
  "84": "E",
  "85": "F",
  "86": "G",
  "87": "H",
  "88": "I",
  "89": "J",
  "8A": "K",
  "8B": "L",
  "8C": "M",
  "8D": "N",
  "8E": "O",
  "8F": "P",
  "90": "Q",
  "91": "R",
  "92": "S",
  "93": "T",
  "94": "U",
  "95": "V",
  "96": "W",
  "97": "X",
  "98": "Y",
  "99": "Z",
  "9A": "(",
  "9B": ")",
  "9C": ":",
  "9D": ";",
  "9E": "[",
  "9F": "]",
  "A0": "a",
  "A1": "b",
  "A2": "c",
  "A3": "d",
  "A4": "e",
  "A5": "f",
  "A6": "g",
  "A7": "h",
  "A8": "i",
  "A9": "j",
  "AA": "k",
  "AB": "l",
  "AC": "m",
  "AD": "n",
  "AE": "o",
  "AF": "p",
  "B0": "q",
  "B1": "r",
  "B2": "s",
  "B3": "t",
  "B4": "u",
  "B5": "v",
  "B6": "w",
  "B7": "x",
  "B8": "y",
  "B9": "z",
  "BA": "é",
  "BB": "d",
  "BC": "l",
  "BD": "s",
  "BE": "t",
  "BF": "v",
  "E0": " ",
  "E3": "-",
  "E4": "r",
  "E5": "m",
  "E6": " ",
  "E7": "!",
  "E8": ".",
  "ED": "▶",
  "EF": "♂",
  "F0": "¥",
  "F1": "×",
  "F3": "/",
  "F4": ",",
  "F5": "♀",
  "F6": "0",
  "F7": "1",
  "F8": "2",
  "F9": "3",
  "FA": "4",
  "FB": "5",
  "FC": "6",
  "FD": "7",
  "FE": "8",
  "FF": "9"
}

var maps = {
  "00": {
    "id": "PALLET_TOWN",
    "area": "Pallet Town"
  },
  "01": {
    "id": "VIRIDIAN_CITY",
    "area": "Viridian City"
  },
  "02": {
    "id": "PEWTER_CITY",
    "area": "Pewter City"
  },
  "03": {
    "id": "CERULEAN_CITY",
    "area": "Cerulean City"
  },
  "04": {
    "id": "LAVENDER_TOWN",
    "area": "Lavender Town"
  },
  "05": {
    "id": "VERMILION_CITY",
    "area": "Vermilion City"
  },
  "06": {
    "id": "CELADON_CITY",
    "area": "Celadon City"
  },
  "07": {
    "id": "FUCHSIA_CITY",
    "area": "Fuchsia City"
  },
  "08": {
    "id": "CINNABAR_ISLAND",
    "area": "Cinnabar Island"
  },
  "09": {
    "id": "INDIGO_PLATEAU",
    "area": "Indigo Plateau"
  },
  "0A": {
    "id": "SAFFRON_CITY",
    "area": "Saffron City"
  },
  "0B": {
    "id": "UNUSED_MAP_0B"
  },
  "0C": {
    "id": "ROUTE_1",
    "area": "Route 1"
  },
  "0D": {
    "id": "ROUTE_2",
    "area": "Route 2"
  },
  "0E": {
    "id": "ROUTE_3",
    "area": "Route 3"
  },
  "0F": {
    "id": "ROUTE_4",
    "area": "Route 4"
  },
  "10": {
    "id": "ROUTE_5",
    "area": "Route 5"
  },
  "11": {
    "id": "ROUTE_6",
    "area": "Route 6"
  },
  "12": {
    "id": "ROUTE_7",
    "area": "Route 7"
  },
  "13": {
    "id": "ROUTE_8",
    "area": "Route 8"
  },
  "14": {
    "id": "ROUTE_9",
    "area": "Route 9"
  },
  "15": {
    "id": "ROUTE_10",
    "area": "Route 10"
  },
  "16": {
    "id": "ROUTE_11",
    "area": "Route 11"
  },
  "17": {
    "id": "ROUTE_12",
    "area": "Route 12"
  },
  "18": {
    "id": "ROUTE_13",
    "area": "Route 13"
  },
  "19": {
    "id": "ROUTE_14",
    "area": "Route 14"
  },
  "1A": {
    "id": "ROUTE_15",
    "area": "Route 15"
  },
  "1B": {
    "id": "ROUTE_16",
    "area": "Route 16"
  },
  "1C": {
    "id": "ROUTE_17",
    "area": "Route 17"
  },
  "1D": {
    "id": "ROUTE_18",
    "area": "Route 18"
  },
  "1E": {
    "id": "ROUTE_19",
    "area": "Route 19"
  },
  "1F": {
    "id": "ROUTE_20",
    "area": "Route 20"
  },
  "20": {
    "id": "ROUTE_21",
    "area": "Route 21"
  },
  "21": {
    "id": "ROUTE_22",
    "area": "Route 22"
  },
  "22": {
    "id": "ROUTE_23",
    "area": "Route 23"
  },
  "23": {
    "id": "ROUTE_24",
    "area": "Route 24"
  },
  "24": {
    "id": "ROUTE_25",
    "area": "Route 25"
  },
  "25": {
    "id": "REDS_HOUSE_1F",
    "area": "Pallet Town"
  },
  "26": {
    "id": "REDS_HOUSE_2F",
    "area": "Pallet Town"
  },
  "27": {
    "id": "BLUES_HOUSE",
    "area": "Pallet Town"
  },
  "28": {
    "id": "OAKS_LAB",
    "area": "Pallet Town"
  },
  "29": {
    "id": "VIRIDIAN_POKECENTER",
    "area": "Viridian City"
  },
  "2A": {
    "id": "VIRIDIAN_MART",
    "area": "Virdian City"
  },
  "2B": {
    "id": "VIRIDIAN_SCHOOL",
    "area": "Viridian City"
  },
  "2C": {
    "id": "VIRIDIAN_HOUSE",
    "area": "Viridian City"
  },
  "2D": {
    "id": "VIRIDIAN_GYM",
    "area": "Viridian City"
  },
  "2E": {
    "id": "DIGLETTS_CAVE_EXIT",
    "area": "Digglet's Cave"
  },
  "2F": {
    "id": "VIRIDIAN_FOREST_EXIT",
    "area": "Viridian Forest"
  },
  "30": {
    "id": "ROUTE_2_HOUSE",
    "area": "Route 2"
  },
  "31": {
    "id": "ROUTE_2_GATE",
    "area": "Route 2"
  },
  "32": {
    "id": "VIRIDIAN_FOREST_ENTRANCE",
    "area": "Viridian Forest"
  },
  "33": {
    "id": "VIRIDIAN_FOREST",
    "area": "Viridian Forest"
  },
  "34": {
    "id": "MUSEUM_1F",
    "area": "Pewter City"
  },
  "35": {
    "id": "MUSEUM_2F",
    "area": "Pewter City"
  },
  "36": {
    "id": "PEWTER_GYM",
    "area": "Pewter City"
  },
  "37": {
    "id": "PEWTER_HOUSE_1",
    "area": "Pewter City"
  },
  "38": {
    "id": "PEWTER_MART",
    "area": "Pewter City"
  },
  "39": {
    "id": "PEWTER_HOUSE_2",
    "area": "Pewter City"
  },
  "3A": {
    "id": "PEWTER_POKECENTER",
    "area": "Pewter City"
  },
  "3B": {
    "id": "MT_MOON_1",
    "area": "Mt Moon"
  },
  "3C": {
    "id": "MT_MOON_2",
    "area": "Mt Moon"
  },
  "3D": {
    "id": "MT_MOON_3",
    "area": "Mt Moon"
  },
  "3E": {
    "id": "TRASHED_HOUSE",
    "area": "Cerulean City"
  },
  "3F": {
    "id": "CERULEAN_HOUSE",
    "area": "Cerulean City"
  },
  "40": {
    "id": "CERULEAN_POKECENTER",
    "area": "Cerulean City"
  },
  "41": {
    "id": "CERULEAN_GYM",
    "area": "Cerulean City"
  },
  "42": {
    "id": "BIKE_SHOP",
    "area": "Cerulean City"
  },
  "43": {
    "id": "CERULEAN_MART",
    "area": "Cerulean City"
  },
  "44": {
    "id": "MT_MOON_POKECENTER",
    "area": "Route 4"
  },
  "45": {
    "id": "TRASHED_HOUSE_COPY"
  },
  "46": {
    "id": "ROUTE_5_GATE",
    "area": "Route 5"
  },
  "47": {
    "id": "PATH_ENTRANCE_ROUTE_5",
    "area": "Route 5"
  },
  "48": {
    "id": "DAYCAREM",
    "area": "Pokémon Day Care"
  },
  "49": {
    "id": "ROUTE_6_GATE",
    "area": "Route 6"
  },
  "4A": {
    "id": "PATH_ENTRANCE_ROUTE_6",
    "area": "Route 6"
  },
  "4B": {
    "id": "PATH_ENTRANCE_ROUTE_6_COPY"
  },
  "4C": {
    "id": "ROUTE_7_GATE",
    "area": "Route 7"
  },
  "4D": {
    "id": "PATH_ENTRANCE_ROUTE_7",
    "area": "Route 7"
  },
  "4E": {
    "id": "PATH_ENTRANCE_ROUTE_7_COPY"
  },
  "4F": {
    "id": "ROUTE_8_GATE",
    "area": "Route 8"
  },
  "50": {
    "id": "PATH_ENTRANCE_ROUTE_8",
    "area": "Route 8"
  },
  "51": {
    "id": "ROCK_TUNNEL_POKECENTER",
    "area": "Rock Tunnel Pokecenter"
  },
  "52": {
    "id": "ROCK_TUNNEL_1",
    "area": "Rock Tunnel"
  },
  "53": {
    "id": "POWER_PLANT",
    "area": "Power Plant"
  },
  "54": {
    "id": "ROUTE_11_GATE_1F",
    "area": "Route 11"
  },
  "55": {
    "id": "DIGLETTS_CAVE_ENTRANCE",
    "area": "Digglet's Cave"
  },
  "56": {
    "id": "ROUTE_11_GATE_2F",
    "area": "Route 11"
  },
  "57": {
    "id": "ROUTE_12_GATE_1F",
    "area": "Route 12"
  },
  "58": {
    "id": "BILLS_HOUSE",
    "area": "Bill's House"
  },
  "59": {
    "id": "VERMILION_POKECENTER",
    "area": "Vermilion City"
  },
  "5A": {
    "id": "POKEMON_FAN_CLUB",
    "area": "Vermilion City"
  },
  "5B": {
    "id": "VERMILION_MART",
    "area": "Vermilion City"
  },
  "5C": {
    "id": "VERMILION_GYM",
    "area": "Vermilion City"
  },
  "5D": {
    "id": "VERMILION_HOUSE_1",
    "area": "Vermilion City"
  },
  "5E": {
    "id": "VERMILION_DOCK",
    "area": "Vermilion City"
  },
  "5F": {
    "id": "SS_ANNE_1",
    "area": "SS Anne"
  },
  "60": {
    "id": "SS_ANNE_2",
    "area": "SS Anne"
  },
  "61": {
    "id": "SS_ANNE_3",
    "area": "SS Anne"
  },
  "62": {
    "id": "SS_ANNE_4",
    "area": "SS Anne"
  },
  "63": {
    "id": "SS_ANNE_5",
    "area": "SS Anne"
  },
  "64": {
    "id": "SS_ANNE_6",
    "area": "SS Anne"
  },
  "65": {
    "id": "SS_ANNE_7",
    "area": "SS Anne"
  },
  "66": {
    "id": "SS_ANNE_8",
    "area": "SS Anne"
  },
  "67": {
    "id": "SS_ANNE_9",
    "area": "SS Anne"
  },
  "68": {
    "id": "SS_ANNE_10",
    "area": "SS Anne"
  },
  "69": {
    "id": "UNUSED_MAP_69"
  },
  "6A": {
    "id": "UNUSED_MAP_6A"
  },
  "6B": {
    "id": "UNUSED_MAP_6B"
  },
  "6C": {
    "id": "VICTORY_ROAD_1"
  },
  "6D": {
    "id": "UNUSED_MAP_6D"
  },
  "6E": {
    "id": "UNUSED_MAP_6E"
  },
  "6F": {
    "id": "UNUSED_MAP_6F"
  },
  "70": {
    "id": "UNUSED_MAP_70"
  },
  "71": {
    "id": "LANCES_ROOM"
  },
  "72": {
    "id": "UNUSED_MAP_72"
  },
  "73": {
    "id": "UNUSED_MAP_73"
  },
  "74": {
    "id": "UNUSED_MAP_74"
  },
  "75": {
    "id": "UNUSED_MAP_75"
  },
  "76": {
    "id": "HALL_OF_FAME",
    "area": "Hall of Fame"
  },
  "77": {
    "id": "UNDERGROUND_PATH_NS",
    "area": "Underground Path"
  },
  "78": {
    "id": "CHAMPIONS_ROOM",
    "area": "Champions Room"
  },
  "79": {
    "id": "UNDERGROUND_PATH_WE",
    "area": "Underground Path"
  },
  "7A": {
    "id": "CELADON_MART_1",
    "area": "Celadon City"
  },
  "7B": {
    "id": "CELADON_MART_2",
    "area": "Celadon City"
  },
  "7C": {
    "id": "CELADON_MART_3",
    "area": "Celadon City"
  },
  "7D": {
    "id": "CELADON_MART_4",
    "area": "Celadon City"
  },
  "7E": {
    "id": "CELADON_MART_ROOF",
    "area": "Celadon City"
  },
  "7F": {
    "id": "CELADON_MART_ELEVATOR",
    "area": "Celadon City"
  },
  "80": {
    "id": "CELADON_MANSION_1",
    "area": "Celadon City"
  },
  "81": {
    "id": "CELADON_MANSION_2",
    "area": "Celadon City"
  },
  "82": {
    "id": "CELADON_MANSION_3",
    "area": "Celadon City"
  },
  "83": {
    "id": "CELADON_MANSION_4",
    "area": "Celadon City"
  },
  "84": {
    "id": "CELADON_MANSION_5",
    "area": "Celadon City"
  },
  "85": {
    "id": "CELADON_POKECENTER",
    "area": "Celadon City"
  },
  "86": {
    "id": "CELADON_GYM",
    "area": "Celadon City"
  },
  "87": {
    "id": "GAME_CORNER",
    "area": "Celadon City"
  },
  "88": {
    "id": "CELADON_MART_5",
    "area": "Celadon City"
  },
  "89": {
    "id": "CELADON_PRIZE_ROOM",
    "area": "Celadon City"
  },
  "8A": {
    "id": "CELADON_DINER",
    "area": "Celadon City"
  },
  "8B": {
    "id": "CELADON_HOUSE",
    "area": "Celadon City"
  },
  "8C": {
    "id": "CELADON_HOTEL",
    "area": "Celadon City"
  },
  "8D": {
    "id": "LAVENDER_POKECENTER",
    "area": "Lavender Town"
  },
  "8E": {
    "id": "POKEMONTOWER_1",
    "area": "Pokemon Tower"
  },
  "8F": {
    "id": "POKEMONTOWER_2",
    "area": "Pokemon Tower"
  },
  "90": {
    "id": "POKEMONTOWER_3",
    "area": "Pokemon Tower"
  },
  "91": {
    "id": "POKEMONTOWER_4",
    "area": "Pokemon Tower"
  },
  "92": {
    "id": "POKEMONTOWER_5",
    "area": "Pokemon Tower"
  },
  "93": {
    "id": "POKEMONTOWER_6",
    "area": "Pokemon Tower"
  },
  "94": {
    "id": "POKEMONTOWER_7",
    "area": "Pokemon Tower"
  },
  "95": {
    "id": "LAVENDER_HOUSE_1",
    "area": "Lavender Town"
  },
  "96": {
    "id": "LAVENDER_MART",
    "area": "Lavender Town"
  },
  "97": {
    "id": "LAVENDER_HOUSE_2",
    "area": "Lavender Town"
  },
  "98": {
    "id": "FUCHSIA_MART",
    "area": "Fuchsia City"
  },
  "99": {
    "id": "FUCHSIA_HOUSE_1",
    "area": "Fuchsia City"
  },
  "9A": {
    "id": "FUCHSIA_POKECENTER",
    "area": "Fuchsia City"
  },
  "9B": {
    "id": "FUCHSIA_HOUSE_2",
    "area": "Fuchsia City"
  },
  "9C": {
    "id": "SAFARI_ZONE_ENTRANCE",
    "area": "Safari Zone"
  },
  "9D": {
    "id": "FUCHSIA_GYM",
    "area": "Fuchsia City"
  },
  "9E": {
    "id": "FUCHSIA_MEETING_ROOM",
    "area": "Fuchsia City"
  },
  "9F": {
    "id": "SEAFOAM_ISLANDS_2",
    "area": "Seafoam Islands"
  },
  "A0": {
    "id": "SEAFOAM_ISLANDS_3",
    "area": "Seafoam Islands"
  },
  "A1": {
    "id": "SEAFOAM_ISLANDS_4",
    "area": "Seafoam Islands"
  },
  "A2": {
    "id": "SEAFOAM_ISLANDS_5",
    "area": "Seafoam Islands"
  },
  "A3": {
    "id": "VERMILION_HOUSE_2",
    "area": "Vermilion City"
  },
  "A4": {
    "id": "FUCHSIA_HOUSE_3",
    "area": "Fuchsia City"
  },
  "A5": {
    "id": "MANSION_1",
    "area": "Cinnabar Mansion"
  },
  "A6": {
    "id": "CINNABAR_GYM",
    "area": "Cinnabar Island"
  },
  "A7": {
    "id": "CINNABAR_LAB_1",
    "area": "Cinnabar Island"
  },
  "A8": {
    "id": "CINNABAR_LAB_2",
    "area": "Cinnabar Island"
  },
  "A9": {
    "id": "CINNABAR_LAB_3",
    "area": "Cinnabar Island"
  },
  "AA": {
    "id": "CINNABAR_LAB_4",
    "area": "Cinnabar Island"
  },
  "AB": {
    "id": "CINNABAR_POKECENTER",
    "area": "Cinnabar Island"
  },
  "AC": {
    "id": "CINNABAR_MART",
    "area": "Cinnabar Island"
  },
  "AD": {
    "id": "CINNABAR_MART_COPY"
  },
  "AE": {
    "id": "INDIGO_PLATEAU_LOBBY"
  },
  "AF": {
    "id": "COPYCATS_HOUSE_1F"
  },
  "B0": {
    "id": "COPYCATS_HOUSE_2F"
  },
  "B1": {
    "id": "FIGHTING_DOJO",
    "area": "Saffron City"
  },
  "B2": {
    "id": "SAFFRON_GYM",
    "area": "Saffron City"
  },
  "B3": {
    "id": "SAFFRON_HOUSE_1",
    "area": "Saffron City"
  },
  "B4": {
    "id": "SAFFRON_MART",
    "area": "Saffron City"
  },
  "B5": {
    "id": "SILPH_CO_1F",
    "area": "Silph Co"
  },
  "B6": {
    "id": "SAFFRON_POKECENTER",
    "area": "Saffron City"
  },
  "B7": {
    "id": "SAFFRON_HOUSE_2",
    "area": "Saffron City"
  },
  "B8": {
    "id": "ROUTE_15_GATE_1F",
    "area": "Route 15"
  },
  "B9": {
    "id": "ROUTE_15_GATE_2F",
    "area": "Route 15"
  },
  "BA": {
    "id": "ROUTE_16_GATE_1F",
    "area": "Route 16"
  },
  "BB": {
    "id": "ROUTE_16_GATE_2F",
    "area": "Route 16"
  },
  "BC": {
    "id": "ROUTE_16_HOUSE",
    "area": "Route 16"
  },
  "BD": {
    "id": "ROUTE_12_HOUSE",
    "area": "Route 12"
  },
  "BE": {
    "id": "ROUTE_18_GATE_1F",
    "area": "Route 18"
  },
  "BF": {
    "id": "ROUTE_18_GATE_2F",
    "area": "Route 18"
  },
  "C0": {
    "id": "SEAFOAM_ISLANDS_1",
    "area": "Seafoam Islands"
  },
  "C1": {
    "id": "ROUTE_22_GATE",
    "area": "Route 22"
  },
  "C2": {
    "id": "VICTORY_ROAD_2",
    "area": "Victory Road"
  },
  "C3": {
    "id": "ROUTE_12_GATE_2F",
    "area": "Route 12"
  },
  "C4": {
    "id": "VERMILION_HOUSE_3",
    "area": "Vermilion City"
  },
  "C5": {
    "id": "DIGLETTS_CAVE",
    "area": "Digglet's Cave"
  },
  "C6": {
    "id": "VICTORY_ROAD_3",
    "area": "Victory Road"
  },
  "C7": {
    "id": "ROCKET_HIDEOUT_1",
    "area": "Rocket Hideout"
  },
  "C8": {
    "id": "ROCKET_HIDEOUT_2",
    "area": "Rocket Hideout"
  },
  "C9": {
    "id": "ROCKET_HIDEOUT_3",
    "area": "Rocket Hideout"
  },
  "CA": {
    "id": "ROCKET_HIDEOUT_4",
    "area": "Rocket Hideout"
  },
  "CB": {
    "id": "ROCKET_HIDEOUT_ELEVATOR",
    "area": "Rocket Hideout"
  },
  "CC": {
    "id": "UNUSED_MAP_CC"
  },
  "CD": {
    "id": "UNUSED_MAP_CD"
  },
  "CE": {
    "id": "UNUSED_MAP_CE"
  },
  "CF": {
    "id": "SILPH_CO_2F",
    "area": "Silph Co"
  },
  "D0": {
    "id": "SILPH_CO_3F",
    "area": "Silph Co"
  },
  "D1": {
    "id": "SILPH_CO_4F",
    "area": "Silph Co"
  },
  "D2": {
    "id": "SILPH_CO_5F",
    "area": "Silph Co"
  },
  "D3": {
    "id": "SILPH_CO_6F",
    "area": "Silph Co"
  },
  "D4": {
    "id": "SILPH_CO_7F",
    "area": "Silph Co"
  },
  "D5": {
    "id": "SILPH_CO_8F",
    "area": "Silph Co"
  },
  "D6": {
    "id": "MANSION_2",
    "area": "Cinnabar Mansion"
  },
  "D7": {
    "id": "MANSION_3",
    "area": "Cinnabar Mansion"
  },
  "D8": {
    "id": "MANSION_4",
    "area": "Cinnabar Mansion"
  },
  "D9": {
    "id": "SAFARI_ZONE_EAST",
    "area": "Safari Zone (East)"
  },
  "DA": {
    "id": "SAFARI_ZONE_NORTH",
    "area": "Safari Zone (North)"
  },
  "DB": {
    "id": "SAFARI_ZONE_WEST",
    "area": "Safari Zone (West)"
  },
  "DC": {
    "id": "SAFARI_ZONE_CENTER",
    "area": "Safari Zone (Center)"
  },
  "DD": {
    "id": "SAFARI_ZONE_REST_HOUSE_1",
    "area": "Safari Zone"
  },
  "DE": {
    "id": "SAFARI_ZONE_SECRET_HOUSE",
    "area": "Safari Zone"
  },
  "DF": {
    "id": "SAFARI_ZONE_REST_HOUSE_2",
    "area": "Safari Zone"
  },
  "E0": {
    "id": "SAFARI_ZONE_REST_HOUSE_3",
    "area": "Safari Zone"
  },
  "E1": {
    "id": "SAFARI_ZONE_REST_HOUSE_4",
    "area": "Safari Zone"
  },
  "E2": {
    "id": "UNKNOWN_DUNGEON_2",
    "area": "Unknown Dungeon"
  },
  "E3": {
    "id": "UNKNOWN_DUNGEON_3",
    "area": "Unknown Dungeon"
  },
  "E4": {
    "id": "UNKNOWN_DUNGEON_1",
    "area": "Unknown Dungeon"
  },
  "E5": {
    "id": "NAME_RATERS_HOUSE",
    "area": "Lavender Town"
  },
  "E6": {
    "id": "CERULEAN_HOUSE_3",
    "area": "Cerulean City"
  },
  "E7": {
    "id": "UNUSED_MAP_E7"
  },
  "E8": {
    "id": "ROCK_TUNNEL_2",
    "area": "Rock Tunnel"
  },
  "E9": {
    "id": "SILPH_CO_9F"
  },
  "EA": {
    "id": "SILPH_CO_10F"
  },
  "EB": {
    "id": "SILPH_CO_11F"
  },
  "EC": {
    "id": "SILPH_CO_ELEVATOR",
    "area": "Silph Co"
  },
  "ED": {
    "id": "UNUSED_MAP_ED"
  },
  "EE": {
    "id": "UNUSED_MAP_EE"
  },
  "EF": {
    "id": "TRADE_CENTER",
    "area": "Trade Center"
  },
  "F0": {
    "id": "COLOSSEUM",
    "area": "Colosseum"
  },
  "F1": {
    "id": "UNUSED_MAP_F1"
  },
  "F2": {
    "id": "UNUSED_MAP_F2"
  },
  "F3": {
    "id": "UNUSED_MAP_F3"
  },
  "F4": {
    "id": "UNUSED_MAP_F4"
  },
  "F5": {
    "id": "LORELEIS_ROOM",
    "area": "The Elite 4: LORELEI"
  },
  "F6": {
    "id": "BRUNOS_ROOM",
    "area": "The Elite 4: BRUNO"
  },
  "F7": {
    "id": "AGATHAS_ROOM",
    "area": "The Elite 4: AGATHA"
  },
  "FF": {
    "id": "UNKNOWN",
    "area": "UNKNOWN"
  }
}

module.exports = new Mapper;
