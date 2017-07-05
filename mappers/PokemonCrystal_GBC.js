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

// Party struct is 30 (48 bytes) in length.
function PartyPokemonStruct(gameState, aSpecies, aHeldItem, aNickname, aLevel, aHealth, aMaxHealth, aTrainerId, aTrainerNickname) {
  return {
    species: new Ref(gameState, aSpecies, 1, pokemon),
    heldItem: new Ref(gameState, aHeldItem, 1, items),
    nickname: new Ref(gameState, aNickname, 11, string),
    level: new Int(gameState, aLevel, 1),
    health: new Int(gameState, aHealth, 2),
    maxHealth: new Int(gameState, aMaxHealth, 2),
    trainerId: new Int(gameState, aTrainerId, 2),
    // trainerNickname: new Ref(gameState, aTrainerNickname, 11, string)
  }
}

class Mapper extends GameState {
  constructor() {
    super();

    this.gameName = 'Pokemon Crystal (GBC)';
    /*
            this.map = {
                loadedMap: new Ref(this, 0xdcb6, 1, maps)
            }
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
    */
    this.player = {
      name: new Ref(this, 0xd47d, 11, string),
      badges: new Int(this, 0xd857),
      party: {
        slot1: PartyPokemonStruct(this, 0xdcd8, 0xdce0, 0xde41, 0xdcfe, 0xdd01, 0xdd03, 0xdce5, null),
        slot2: PartyPokemonStruct(this, 0xdcd9, 0xdd10, 0xde4c, 0xdd2e, 0xdd31, 0xdd33, 0xdd15, null),
        slot3: PartyPokemonStruct(this, 0xdcda, 0xdd40, 0xde57, 0xdd5e, 0xdd61, 0xdd63, 0xdd45, null),
        slot4: PartyPokemonStruct(this, 0xdcdb, 0xdd70, 0xde62, 0xdd8e, 0xdd91, 0xdd93, 0xdd75, null),
        slot5: PartyPokemonStruct(this, 0xdcdc, 0xdda0, 0xde6d, 0xddbe, 0xddc1, 0xddc3, 0xdda5, null),
        slot6: PartyPokemonStruct(this, 0xdcdd, 0xdd70, 0xde78, 0xddee, 0xddf1, 0xddf3, 0xddb5, null)
      },
      partyCount: new Int(this, 0xdcd8)
    }

    this.battle = {
      isInBattle: new Ref(this, 0xd22d, 1, isInBattle),
      trainer: {
        species: new Ref(this, 0xd233, 1, trainers)
        //name: new Ref(this, 0xd04a, 11, string),
        //money: new Int(this, 0xd046, 2)
      },
      enemy: {
        species: new Ref(this, 0xd204, 1, pokemon),
        nickname: new Ref(this, 0xc616, 11, string),
        level: new Int(this, 0xd213),
        health: new Int(this, 0xd216, 2),
        maxHealth: new Int(this, 0xd218, 2),
        //catchRate: new Int(this, 0xd007)
      },
      ally: {
        species: new Ref(this, 0xc62c, 1, pokemon),
        nickname: new Ref(this, 0xc621, 11, string)
      }
    }
    this.rival = {
      name: new Ref(this, 0xd493, 11, string)
    }
  }
}

var isInBattle = {
  "00": false,
  "01": "WILD",
  "02": "TRAINER",
  "FF": "LOST"
}

var timesOfDay = {
  "01": "MORNING",
  "02": "NIGHT",
  "03": "DAY",
  "04": "UNLIT CAVE"
}

var pokemonTypes = {
  "00": "NORMAL",
  "01": "FIGHTING",
  "02": "FLYING",
  "03": "POISON",
  "04": "GROUND",
  "05": "ROCK",
  "06": "BIRD [BETA]",
  "07": "BUG",
  "08": "GHOST",
  "09": "STEEL",
  "13": "??? (CURSE)",
  "14": "FIRE",
  "15": "WATER",
  "16": "GRASS",
  "17": "ELECTRIC",
  "18": "PSYCHIC",
  "19": "ICE",
  "1A": "DRAGON",
  "1B": "DARK"
}

var attacks = {
  "01": "POUND",
  "02": "KARATE CHOP",
  "03": "DOUBLESLAP",
  "04": "COMET PUNCH",
  "05": "MEGA PUNCH",
  "06": "PAY DAY",
  "07": "FIRE PUNCH",
  "08": "ICE PUNCH",
  "09": "THUNDERPUNCH",
  "0A": "SCRATCH",
  "0B": "VICEGRIP",
  "0C": "GUILLOTINE",
  "0D": "RAZOR WIND",
  "0E": "SWORDS DANCE",
  "0F": "CUT",
  "10": "GUST",
  "11": "WING ATTACK",
  "12": "WHIRLWIND",
  "13": "FLY",
  "14": "BIND",
  "15": "SLAM",
  "16": "VINE WHIP",
  "17": "STOMP",
  "18": "DOUBLE KICK",
  "19": "MEGA KICK",
  "1A": "JUMP KICK",
  "1B": "ROLLING KICK",
  "1C": "SAND-ATTACK",
  "1D": "HEADBUTT",
  "1E": "HORN ATTACK",
  "1F": "FURY ATTACK",
  "20": "HORN DRILL",
  "21": "TACKLE",
  "22": "BODY SLAM",
  "23": "WRAP",
  "24": "TAKE DOWN",
  "25": "THRASH",
  "26": "DOUBLE-EDGE",
  "27": "TAIL WHIP",
  "28": "POISON STING",
  "29": "TWINEEDLE",
  "2A": "PIN MISSILE",
  "2B": "LEER",
  "2C": "BITE",
  "2D": "GROWL",
  "2E": "ROAR",
  "2F": "SING",
  "30": "SUPERSONIC",
  "31": "SONICBOOM",
  "32": "DISABLE",
  "33": "ACID",
  "34": "EMBER",
  "35": "FLAMETHROWER",
  "36": "MIST",
  "37": "WATER GUN",
  "38": "HYDRO PUMP",
  "39": "SURF",
  "3A": "ICE BEAM",
  "3B": "BLIZZARD",
  "3C": "PSYBEAM",
  "3D": "BUBBLEBEAM",
  "3E": "AURORA BEAM",
  "3F": "HYPER BEAM",
  "40": "PECK",
  "41": "DRILL PECK",
  "42": "SUBMISSION",
  "43": "LOW KICK",
  "44": "COUNTER",
  "45": "SEISMIC TOSS",
  "46": "STRENGTH",
  "47": "ABSORB",
  "48": "MEGA DRAIN",
  "49": "LEECH SEED",
  "4A": "GROWTH",
  "4B": "RAZOR LEAF",
  "4C": "SOLARBEAM",
  "4D": "POISONPOWDER",
  "4E": "STUN SPORE",
  "4F": "SLEEP POWDER",
  "50": "PETAL DANCE",
  "51": "STRING SHOT",
  "52": "DRAGON RAGE",
  "53": "FIRE SPIN",
  "54": "THUNDERSHOCK",
  "55": "THUNDERBOLT",
  "56": "THUNDER WAVE",
  "57": "THUNDER",
  "58": "ROCK THROW",
  "59": "EARTHQUAKE",
  "5A": "FISSURE",
  "5B": "DIG",
  "5C": "TOXIC",
  "5D": "CONFUSION",
  "5E": "PSYCHIC",
  "5F": "HYPNOSIS",
  "60": "MEDITATE",
  "61": "AGILITY",
  "62": "QUICK ATTACK",
  "63": "RAGE",
  "64": "TELEPORT",
  "65": "NIGHT SHADE",
  "66": "MIMIC",
  "67": "SCREECH",
  "68": "DOUBLE TEAM",
  "69": "RECOVER",
  "6A": "HARDEN",
  "6B": "MINIMIZE",
  "6C": "SMOKESCREEN",
  "6D": "CONFUSE RAY",
  "6E": "WITHDRAW",
  "6F": "DEFENSE CURL",
  "70": "BARRIER",
  "71": "LIGHT SCREEN",
  "72": "HAZE",
  "73": "REFLECT",
  "74": "FOCUS ENERGY",
  "75": "BIDE",
  "76": "METRONOME",
  "77": "MIRROR MOVE",
  "78": "SELFDESTRUCT",
  "79": "EGG BOMB",
  "7A": "LICK",
  "7B": "SMOG",
  "7C": "SLUDGE",
  "7D": "BONE CLUB",
  "7E": "FIRE BLAST",
  "7F": "WATERFALL",
  "80": "CLAMP",
  "81": "SWIFT",
  "82": "SKULL BASH",
  "83": "SPIKE CANNON",
  "84": "CONSTRICT",
  "85": "AMNESIA",
  "86": "KINESIS",
  "87": "SOFTBOILED",
  "88": "HI-JUMP KICK",
  "89": "GLARE",
  "8A": "DREAM EATER",
  "8B": "POISON GAS",
  "8C": "BARRAGE",
  "8D": "LEECH LIFE",
  "8E": "LOVELY KISS",
  "8F": "SKY ATTACK",
  "90": "TRANSFORM",
  "91": "BUBBLE",
  "92": "DIZZY PUNCH",
  "93": "SPORE",
  "94": "FLASH",
  "95": "PSYWAVE",
  "96": "SPLASH",
  "97": "ACID ARMOR",
  "98": "CRABHAMMER",
  "99": "EXPLOSION",
  "9A": "FURY SWIPES",
  "9B": "BONEMERANG",
  "9C": "REST",
  "9D": "ROCK SLIDE",
  "9E": "HYPER FANG",
  "9F": "SHARPEN",
  "A0": "CONVERSION",
  "A1": "TRI ATTACK",
  "A2": "SUPER FANG",
  "A3": "SLASH",
  "A4": "SUBSTITUTE",
  "A5": "STRUGGLE",
  "A6": "SKETCH",
  "A7": "TRIPLE KICK",
  "A8": "THIEF",
  "A9": "SPIDER WEB",
  "AA": "MIND READER",
  "AB": "NIGHTMARE",
  "AC": "FLAME WHEEL",
  "AD": "SNORE",
  "AE": "CURSE",
  "AF": "FLAIL",
  "B0": "CONVERSION2",
  "B1": "AEROBLAST",
  "B2": "COTTON SPORE",
  "B3": "REVERSAL",
  "B4": "SPITE",
  "B5": "POWDER SNOW",
  "B6": "PROTECT",
  "B7": "MACH PUNCH",
  "B8": "SCARY FACE",
  "B9": "FAINT ATTACK",
  "BA": "SWEET KISS",
  "BB": "BELLY DRUM",
  "BC": "SLUDGE BOMB",
  "BD": "MUD-SLAP",
  "BE": "OCTAZOOKA",
  "BF": "SPIKES",
  "C0": "ZAP CANNON",
  "C1": "FORESIGHT",
  "C2": "DESTINY BOND",
  "C3": "PERISH SONG",
  "C4": "ICY WIND",
  "C5": "DETECT",
  "C6": "BONE RUSH",
  "C7": "LOCK-ON",
  "C8": "OUTRAGE",
  "C9": "SANDSTORM",
  "CA": "GIGA DRAIN",
  "CB": "ENDURE",
  "CC": "CHARM",
  "CD": "ROLLOUT",
  "CE": "FALSE SWIPE",
  "CF": "SWAGGER",
  "D0": "MILK DRINK",
  "D1": "SPARK",
  "D2": "FURY CUTTER",
  "D3": "STEEL WING",
  "D4": "MEAN LOOK",
  "D5": "ATTRACT",
  "D6": "SLEEP TALK",
  "D7": "HEAL BELL",
  "D8": "RETURN",
  "D9": "PRESENT",
  "DA": "FRUSTRATION",
  "DB": "SAFEGUARD",
  "DC": "PAIN SPLIT",
  "DD": "SACRED FIRE",
  "DE": "MAGNITUDE",
  "DF": "DYNAMICPUNCH",
  "E0": "MEGAHORN",
  "E1": "DRAGONBREATH",
  "E2": "BATON PASS",
  "E3": "ENCORE",
  "E4": "PURSUIT",
  "E5": "RAPID SPIN",
  "E6": "SWEET SCENT",
  "E7": "IRON TAIL",
  "E8": "METAL CLAW",
  "E9": "VITAL THROW",
  "EA": "MORNING SUN",
  "EB": "SYNTHESIS",
  "EC": "MOONLIGHT",
  "ED": "HIDDEN POWER",
  "EE": "CROSS CHOP",
  "EF": "TWISTER",
  "F0": "RAIN DANCE",
  "F1": "SUNNY DAY",
  "F2": "CRUNCH",
  "F3": "MIRROR COAT",
  "F4": "PSYCH UP",
  "F5": "EXTREMESPEED",
  "F6": "ANCIENTPOWER",
  "F7": "SHADOW BALL",
  "F8": "FUTURE SIGHT",
  "F9": "ROCK SMASH",
  "FA": "WHIRLPOOL",
  "FB": "BEAT UP"
}

var items = {
  "00": null,
  "01": "MASTER BALL",
  "02": "ULTRA BALL",
  "03": "BRIGHTPOWDER",
  "04": "GREAT BALL",
  "05": "POK? BALL",
  "06": "TERU-SAMA",
  "07": "BICYCLE",
  "08": "MOON STONE",
  "09": "ANTIDOTE",
  "0A": "BURN HEAL",
  "0B": "ICE HEAL",
  "0C": "AWAKENING",
  "0D": "PARLYZ HEAL",
  "0E": "FULL RESTORE",
  "0F": "MAX POTION",
  "10": "HYPER POTION",
  "11": "SUPER POTION",
  "12": "POTION",
  "13": "ESCAPE ROPE",
  "14": "REPEL",
  "15": "MAX ELIXER",
  "16": "FIRE STONE",
  "17": "THUNDERSTONE",
  "18": "WATER STONE",
  "19": "TERU-SAMA",
  "1A": "HP UP",
  "1B": "PROTEIN",
  "1C": "IRON",
  "1D": "CARBOS",
  "1E": "LUCKY PUNCH",
  "1F": "CALCIUM",
  "20": "RARE CANDY",
  "21": "X ACCURACY",
  "22": "LEAF STONE",
  "23": "METAL POWDER",
  "24": "NUGGET",
  "25": "POK? DOLL",
  "26": "FULL HEAL",
  "27": "REVIVE",
  "28": "MAX REVIVE",
  "29": "GUARD SPEC.",
  "2A": "SUPER REPEL",
  "2B": "MAX REPEL",
  "2C": "DIRE HIT",
  "2D": "TERU-SAMA",
  "2E": "FRESH WATER",
  "2F": "SODA POP",
  "30": "LEMONADE",
  "31": "X ATTACK",
  "32": "TERU-SAMA",
  "33": "X DEFEND",
  "34": "X SPEED",
  "35": "X SPECIAL",
  "36": "COIN CASE",
  "37": "ITEMFINDER",
  "38": "TERU-SAMA",
  "39": "EXP.SHARE",
  "3A": "OLD ROD",
  "3B": "GOOD ROD",
  "3C": "SILVER LEAF",
  "3D": "SUPER ROD",
  "3E": "PP UP",
  "3F": "ETHER",
  "40": "MAX ETHER",
  "41": "ELIXER",
  "42": "RED SCALE",
  "43": "SECRETPOTION",
  "44": "S.S.TICKET",
  "45": "MYSTERY EGG",
  "46": "CLEAR BELL",
  "47": "SILVER WING",
  "48": "MOOMOO MILK",
  "49": "QUICK CLAW",
  "4A": "PSNCUREBERRY",
  "4B": "GOLD LEAF",
  "4C": "SOFT SAND",
  "4D": "SHARP BEAK",
  "4E": "PRZCUREBERRY",
  "4F": "BURNT BERRY",
  "50": "ICE BERRY",
  "51": "POISON BARB",
  "52": "KING'S ROCK",
  "53": "BITTER BERRY",
  "54": "MINT BERRY",
  "55": "RED APRICORN",
  "56": "TINYMUSHROOM",
  "57": "BIG MUSHROOM",
  "58": "SILVERPOWDER",
  "59": "BLU APRICORN",
  "5A": "TERU-SAMA",
  "5B": "AMULET COIN",
  "5C": "YLW APRICORN",
  "5D": "GRN APRICORN",
  "5E": "CLEANSE TAG",
  "5F": "MYSTIC WATER",
  "60": "TWISTEDSPOON",
  "61": "WHT APRICORN",
  "62": "BLACKBELT",
  "63": "BLK APRICORN",
  "64": "TERU-SAMA",
  "65": "PNK APRICORN",
  "66": "BLACKGLASSES",
  "67": "SLOWPOKETAIL",
  "68": "PINK BOW",
  "69": "STICK",
  "6A": "SMOKE BALL",
  "6B": "NEVERMELTICE",
  "6C": "MAGNET",
  "6D": "MIRACLEBERRY",
  "6E": "PEARL",
  "6F": "BIG PEARL",
  "70": "EVERSTONE",
  "71": "SPELL TAG",
  "72": "RAGECANDYBAR",
  "73": "GS BALL",
  "74": "BLUE CARD",
  "75": "MIRACLE SEED",
  "76": "THICK CLUB",
  "77": "FOCUS BAND",
  "78": "TERU-SAMA",
  "79": "ENERGYPOWDER",
  "7A": "ENERGY ROOT",
  "7B": "HEAL POWDER",
  "7C": "REVIVAL HERB",
  "7D": "HARD STONE",
  "7E": "LUCKY EGG",
  "7F": "CARD KEY",
  "80": "MACHINE PART",
  "81": "EGG TICKET",
  "82": "LOST ITEM",
  "83": "STARDUST",
  "84": "STAR PIECE",
  "85": "BASEMENT KEY",
  "86": "PASS",
  "87": "TERU-SAMA",
  "88": "TERU-SAMA",
  "89": "TERU-SAMA",
  "8A": "CHARCOAL",
  "8B": "BERRY JUICE",
  "8C": "SCOPE LENS",
  "8D": "TERU-SAMA",
  "8E": "TERU-SAMA",
  "8F": "METAL COAT",
  "90": "DRAGON FANG",
  "91": "TERU-SAMA",
  "92": "LEFTOVERS",
  "93": "TERU-SAMA",
  "94": "TERU-SAMA",
  "95": "TERU-SAMA",
  "96": "MYSTERYBERRY",
  "97": "DRAGON SCALE",
  "98": "BERSERK GENE",
  "99": "TERU-SAMA",
  "9A": "TERU-SAMA",
  "9B": "TERU-SAMA",
  "9C": "SACRED ASH",
  "9D": "HEAVY BALL",
  "9E": "FLOWER MAIL",
  "9F": "LEVEL BALL",
  "A0": "LURE BALL",
  "A1": "FAST BALL",
  "A2": "TERU-SAMA",
  "A3": "LIGHT BALL",
  "A4": "FRIEND BALL",
  "A5": "MOON BALL",
  "A6": "LOVE BALL",
  "A7": "NORMAL BOX",
  "A8": "GORGEOUS BOX",
  "A9": "SUN STONE",
  "AA": "POLKADOT BOW",
  "AB": "TERU-SAMA",
  "AC": "UP-GRADE",
  "AD": "BERRY",
  "AE": "GOLD BERRY",
  "AF": "SQUIRTBOTTLE",
  "B0": "TERU-SAMA",
  "B1": "PARK BALL",
  "B2": "RAINBOW WING",
  "B3": "TERU-SAMA",
  "B4": "BRICK PIECE",
  "B5": "SURF MAIL",
  "B6": "LITEBLUEMAIL",
  "B7": "PORTRAITMAIL",
  "B8": "LOVELY MAIL",
  "B9": "EON MAIL",
  "BA": "MORPH MAIL",
  "BB": "BLUESKY MAIL",
  "BC": "MUSIC MAIL",
  "BD": "MIRAGE MAIL",
  "BE": "TERU-SAMA",
  "BF": "TM01",
  "C0": "TM02",
  "C1": "TM03",
  "C2": "TM04",
  "C3": "TERU-SAMA",
  "C4": "TM05",
  "C5": "TM06",
  "C6": "TM07",
  "C7": "TM08",
  "C8": "TM09",
  "C9": "TM10",
  "CA": "TM11",
  "CB": "TM12",
  "CC": "TM13",
  "CD": "TM14",
  "CE": "TM15",
  "CF": "TM16",
  "D0": "TM17",
  "D1": "TM18",
  "D2": "TM19",
  "D3": "TM20",
  "D4": "TM21",
  "D5": "TM22",
  "D6": "TM23",
  "D7": "TM24",
  "D8": "TM25",
  "D9": "TM26",
  "DA": "TM27",
  "DB": "TM28",
  "DC": "TERU-SAMA",
  "DD": "TM29",
  "DE": "TM30",
  "DF": "TM31",
  "E0": "TM32",
  "E1": "TM33",
  "E2": "TM34",
  "E3": "TM35",
  "E4": "TM36",
  "E5": "TM37",
  "E6": "TM38",
  "E7": "TM39",
  "E8": "TM40",
  "E9": "TM41",
  "EA": "TM42",
  "EB": "TM43",
  "EC": "TM44",
  "ED": "TM45",
  "EE": "TM46",
  "EF": "TM47",
  "F0": "TM48",
  "F1": "TM49",
  "F2": "TM50",
  "F3": "HM01",
  "F4": "HM02",
  "F5": "HM03",
  "F6": "HM04",
  "F7": "HM05",
  "F8": "HM06",
  "F9": "HM07",
  "FA": "TERU-SAMA",
  "FB": "TERU-SAMA"
};

var pokemon = {
  "00": null,
  "FF": null,
  "01": {
    number: 1,
    name: "BULBASAUR"
  },
  "02": {
    number: 2,
    name: "IVYSAUR"
  },
  "03": {
    number: 3,
    name: "VENUSAUR"
  },
  "04": {
    number: 4,
    name: "CHARMANDER"
  },
  "05": {
    number: 5,
    name: "CHARMELEON"
  },
  "06": {
    number: 6,
    name: "CHARIZARD"
  },
  "07": {
    number: 7,
    name: "SQUIRTLE"
  },
  "08": {
    number: 8,
    name: "WARTORTLE"
  },
  "09": {
    number: 9,
    name: "BLASTOISE"
  },
  "0A": {
    number: 10,
    name: "CATERPIE"
  },
  "0B": {
    number: 11,
    name: "METAPOD"
  },
  "0C": {
    number: 12,
    name: "BUTTERFREE"
  },
  "0D": {
    number: 13,
    name: "WEEDLE"
  },
  "0E": {
    number: 14,
    name: "KAKUNA"
  },
  "0F": {
    number: 15,
    name: "BEEDRILL"
  },
  "10": {
    number: 16,
    name: "PIDGEY"
  },
  "11": {
    number: 17,
    name: "PIDGEOTTO"
  },
  "12": {
    number: 18,
    name: "PIDGEOT"
  },
  "13": {
    number: 19,
    name: "RATTATA"
  },
  "14": {
    number: 20,
    name: "RATICATE"
  },
  "15": {
    number: 21,
    name: "SPEAROW"
  },
  "16": {
    number: 22,
    name: "FEAROW"
  },
  "17": {
    number: 23,
    name: "EKANS"
  },
  "18": {
    number: 24,
    name: "ARBOK"
  },
  "19": {
    number: 25,
    name: "PIKACHU"
  },
  "1A": {
    number: 26,
    name: "RAICHU"
  },
  "1B": {
    number: 27,
    name: "SANDSHREW"
  },
  "1C": {
    number: 28,
    name: "SANDSLASH"
  },
  "1D": {
    number: 29,
    name: "NIDORANF"
  },
  "1E": {
    number: 30,
    name: "NIDORINA"
  },
  "1F": {
    number: 31,
    name: "NIDOQUEEN"
  },
  "20": {
    number: 32,
    name: "NIDORANM"
  },
  "21": {
    number: 33,
    name: "NIDORINO"
  },
  "22": {
    number: 34,
    name: "NIDOKING"
  },
  "23": {
    number: 35,
    name: "CLEFAIRY"
  },
  "24": {
    number: 36,
    name: "CLEFABLE"
  },
  "25": {
    number: 37,
    name: "VULPIX"
  },
  "26": {
    number: 38,
    name: "NINETALES"
  },
  "27": {
    number: 39,
    name: "JIGGLYPUFF"
  },
  "28": {
    number: 40,
    name: "WIGGLYTUFF"
  },
  "29": {
    number: 41,
    name: "ZUBAT"
  },
  "2A": {
    number: 42,
    name: "GOLBAT"
  },
  "2B": {
    number: 43,
    name: "ODDISH"
  },
  "2C": {
    number: 44,
    name: "GLOOM"
  },
  "2D": {
    number: 45,
    name: "VILEPLUME"
  },
  "2E": {
    number: 46,
    name: "PARAS"
  },
  "2F": {
    number: 47,
    name: "PARASECT"
  },
  "30": {
    number: 48,
    name: "VENONAT"
  },
  "31": {
    number: 49,
    name: "VENOMOTH"
  },
  "32": {
    number: 50,
    name: "DIGLETT"
  },
  "33": {
    number: 51,
    name: "DUGTRIO"
  },
  "34": {
    number: 52,
    name: "MEOWTH"
  },
  "35": {
    number: 53,
    name: "PERSIAN"
  },
  "36": {
    number: 54,
    name: "PSYDUCK"
  },
  "37": {
    number: 55,
    name: "GOLDUCK"
  },
  "38": {
    number: 56,
    name: "MANKEY"
  },
  "39": {
    number: 57,
    name: "PRIMEAPE"
  },
  "3A": {
    number: 58,
    name: "GROWLITHE"
  },
  "3B": {
    number: 59,
    name: "ARCANINE"
  },
  "3C": {
    number: 60,
    name: "POLIWAG"
  },
  "3D": {
    number: 61,
    name: "POLIWHIRL"
  },
  "3E": {
    number: 62,
    name: "POLIWRATH"
  },
  "3F": {
    number: 63,
    name: "ABRA"
  },
  "40": {
    number: 64,
    name: "KADABRA"
  },
  "41": {
    number: 65,
    name: "ALAKAZAM"
  },
  "42": {
    number: 66,
    name: "MACHOP"
  },
  "43": {
    number: 67,
    name: "MACHOKE"
  },
  "44": {
    number: 68,
    name: "MACHAMP"
  },
  "45": {
    number: 69,
    name: "BELLSPROUT"
  },
  "46": {
    number: 70,
    name: "WEEPINBELL"
  },
  "47": {
    number: 71,
    name: "VICTREEBEL"
  },
  "48": {
    number: 72,
    name: "TENTACOOL"
  },
  "49": {
    number: 73,
    name: "TENTACRUEL"
  },
  "4A": {
    number: 74,
    name: "GEODUDE"
  },
  "4B": {
    number: 75,
    name: "GRAVELER"
  },
  "4C": {
    number: 76,
    name: "GOLEM"
  },
  "4D": {
    number: 77,
    name: "PONYTA"
  },
  "4E": {
    number: 78,
    name: "RAPIDASH"
  },
  "4F": {
    number: 79,
    name: "SLOWPOKE"
  },
  "50": {
    number: 80,
    name: "SLOWBRO"
  },
  "51": {
    number: 81,
    name: "MAGNEMITE"
  },
  "52": {
    number: 82,
    name: "MAGNETON"
  },
  "53": {
    number: 83,
    name: "FARFETCH'D"
  },
  "54": {
    number: 84,
    name: "DODUO"
  },
  "55": {
    number: 85,
    name: "DODRIO"
  },
  "56": {
    number: 86,
    name: "SEEL"
  },
  "57": {
    number: 87,
    name: "DEWGONG"
  },
  "58": {
    number: 88,
    name: "GRIMER"
  },
  "59": {
    number: 89,
    name: "MUK"
  },
  "5A": {
    number: 90,
    name: "SHELLDER"
  },
  "5B": {
    number: 91,
    name: "CLOYSTER"
  },
  "5C": {
    number: 92,
    name: "GASTLY"
  },
  "5D": {
    number: 93,
    name: "HAUNTER"
  },
  "5E": {
    number: 94,
    name: "GENGAR"
  },
  "5F": {
    number: 95,
    name: "ONIX"
  },
  "60": {
    number: 96,
    name: "DROWZEE"
  },
  "61": {
    number: 97,
    name: "HYPNO"
  },
  "62": {
    number: 98,
    name: "KRABBY"
  },
  "63": {
    number: 99,
    name: "KINGLER"
  },
  "64": {
    number: 100,
    name: "VOLTORB"
  },
  "65": {
    number: 101,
    name: "ELECTRODE"
  },
  "66": {
    number: 102,
    name: "EXEGGCUTE"
  },
  "67": {
    number: 103,
    name: "EXEGGUTOR"
  },
  "68": {
    number: 104,
    name: "CUBONE"
  },
  "69": {
    number: 105,
    name: "MAROWAK"
  },
  "6A": {
    number: 106,
    name: "HITMONLEE"
  },
  "6B": {
    number: 107,
    name: "HITMONCHAN"
  },
  "6C": {
    number: 108,
    name: "LICKITUNG"
  },
  "6D": {
    number: 109,
    name: "KOFFING"
  },
  "6E": {
    number: 110,
    name: "WEEZING"
  },
  "6F": {
    number: 111,
    name: "RHYHORN"
  },
  "70": {
    number: 112,
    name: "RHYDON"
  },
  "71": {
    number: 113,
    name: "CHANSEY"
  },
  "72": {
    number: 114,
    name: "TANGELA"
  },
  "73": {
    number: 115,
    name: "KANGASKHAN"
  },
  "74": {
    number: 116,
    name: "HORSEA"
  },
  "75": {
    number: 117,
    name: "SEADRA"
  },
  "76": {
    number: 118,
    name: "GOLDEEN"
  },
  "77": {
    number: 119,
    name: "SEAKING"
  },
  "78": {
    number: 120,
    name: "STARYU"
  },
  "79": {
    number: 121,
    name: "STARMIE"
  },
  "7A": {
    number: 122,
    name: "MR.MIME"
  },
  "7B": {
    number: 123,
    name: "SCYTHER"
  },
  "7C": {
    number: 124,
    name: "JYNX"
  },
  "7D": {
    number: 125,
    name: "ELECTABUZZ"
  },
  "7E": {
    number: 126,
    name: "MAGMAR"
  },
  "7F": {
    number: 127,
    name: "PINSIR"
  },
  "80": {
    number: 128,
    name: "TAUROS"
  },
  "81": {
    number: 129,
    name: "MAGIKARP"
  },
  "82": {
    number: 130,
    name: "GYARADOS"
  },
  "83": {
    number: 131,
    name: "LAPRAS"
  },
  "84": {
    number: 132,
    name: "DITTO"
  },
  "85": {
    number: 133,
    name: "EEVEE"
  },
  "86": {
    number: 134,
    name: "VAPOREON"
  },
  "87": {
    number: 135,
    name: "JOLTEON"
  },
  "88": {
    number: 136,
    name: "FLAREON"
  },
  "89": {
    number: 137,
    name: "PORYGON"
  },
  "8A": {
    number: 138,
    name: "OMANYTE"
  },
  "8B": {
    number: 139,
    name: "OMASTAR"
  },
  "8C": {
    number: 140,
    name: "KABUTO"
  },
  "8D": {
    number: 141,
    name: "KABUTOPS"
  },
  "8E": {
    number: 142,
    name: "AERODACTYL"
  },
  "8F": {
    number: 143,
    name: "SNORLAX"
  },
  "90": {
    number: 144,
    name: "ARTICUNO"
  },
  "91": {
    number: 145,
    name: "ZAPDOS"
  },
  "92": {
    number: 146,
    name: "MOLTRES"
  },
  "93": {
    number: 147,
    name: "DRATINI"
  },
  "94": {
    number: 148,
    name: "DRAGONAIR"
  },
  "95": {
    number: 149,
    name: "DRAGONITE"
  },
  "96": {
    number: 150,
    name: "MEWTWO"
  },
  "97": {
    number: 151,
    name: "MEW"
  },
  "98": {
    number: 152,
    name: "CHIKORITA"
  },
  "99": {
    number: 153,
    name: "BAYLEEF"
  },
  "9A": {
    number: 154,
    name: "MEGANIUM"
  },
  "9B": {
    number: 155,
    name: "CYNDAQUIL"
  },
  "9C": {
    number: 156,
    name: "QUILAVA"
  },
  "9D": {
    number: 157,
    name: "TYPHLOSION"
  },
  "9E": {
    number: 158,
    name: "TOTODILE"
  },
  "9F": {
    number: 159,
    name: "CROCONAW"
  },
  "A0": {
    number: 160,
    name: "FERALIGATR"
  },
  "A1": {
    number: 161,
    name: "SENTRET"
  },
  "A2": {
    number: 162,
    name: "FURRET"
  },
  "A3": {
    number: 163,
    name: "HOOTHOOT"
  },
  "A4": {
    number: 164,
    name: "NOCTOWL"
  },
  "A5": {
    number: 165,
    name: "LEDYBA"
  },
  "A6": {
    number: 166,
    name: "LEDIAN"
  },
  "A7": {
    number: 167,
    name: "SPINARAK"
  },
  "A8": {
    number: 168,
    name: "ARIADOS"
  },
  "A9": {
    number: 169,
    name: "CROBAT"
  },
  "AA": {
    number: 170,
    name: "CHINCHOU"
  },
  "AB": {
    number: 171,
    name: "LANTURN"
  },
  "AC": {
    number: 172,
    name: "PICHU"
  },
  "AD": {
    number: 173,
    name: "CLEFFA"
  },
  "AE": {
    number: 174,
    name: "IGGLYBUFF"
  },
  "AF": {
    number: 175,
    name: "TOGEPI"
  },
  "B0": {
    number: 176,
    name: "TOGETIC"
  },
  "B1": {
    number: 177,
    name: "NATU"
  },
  "B2": {
    number: 178,
    name: "XATU"
  },
  "B3": {
    number: 179,
    name: "MAREEP"
  },
  "B4": {
    number: 180,
    name: "FLAAFFY"
  },
  "B5": {
    number: 181,
    name: "AMPHAROS"
  },
  "B6": {
    number: 182,
    name: "BELLOSSOM"
  },
  "B7": {
    number: 183,
    name: "MARILL"
  },
  "B8": {
    number: 184,
    name: "AZUMARILL"
  },
  "B9": {
    number: 185,
    name: "SUDOWOODO"
  },
  "BA": {
    number: 186,
    name: "POLITOED"
  },
  "BB": {
    number: 187,
    name: "HOPPIP"
  },
  "BC": {
    number: 188,
    name: "SKIPLOOM"
  },
  "BD": {
    number: 189,
    name: "JUMPLUFF"
  },
  "BE": {
    number: 190,
    name: "AIPOM"
  },
  "BF": {
    number: 191,
    name: "SUNKERN"
  },
  "C0": {
    number: 192,
    name: "SUNFLORA"
  },
  "C1": {
    number: 193,
    name: "YANMA"
  },
  "C2": {
    number: 194,
    name: "WOOPER"
  },
  "C3": {
    number: 195,
    name: "QUAGSIRE"
  },
  "C4": {
    number: 196,
    name: "ESPEON"
  },
  "C5": {
    number: 197,
    name: "UMBREON"
  },
  "C6": {
    number: 198,
    name: "MURKROW"
  },
  "C7": {
    number: 199,
    name: "SLOWKING"
  },
  "C8": {
    number: 200,
    name: "MISDREAVUS"
  },
  "C9": {
    number: 201,
    name: "UNOWN"
  },
  "CA": {
    number: 202,
    name: "WOBBUFFET"
  },
  "CB": {
    number: 203,
    name: "GIRAFARIG"
  },
  "CC": {
    number: 204,
    name: "PINECO"
  },
  "CD": {
    number: 205,
    name: "FORRETRESS"
  },
  "CE": {
    number: 206,
    name: "DUNSPARCE"
  },
  "CF": {
    number: 207,
    name: "GLIGAR"
  },
  "D0": {
    number: 208,
    name: "STEELIX"
  },
  "D1": {
    number: 209,
    name: "SNUBBULL"
  },
  "D2": {
    number: 210,
    name: "GRANBULL"
  },
  "D3": {
    number: 211,
    name: "QWILFISH"
  },
  "D4": {
    number: 212,
    name: "SCIZOR"
  },
  "D5": {
    number: 213,
    name: "SHUCKLE"
  },
  "D6": {
    number: 214,
    name: "HERACROSS"
  },
  "D7": {
    number: 215,
    name: "SNEASEL"
  },
  "D8": {
    number: 216,
    name: "TEDDIURSA"
  },
  "D9": {
    number: 217,
    name: "URSARING"
  },
  "DA": {
    number: 218,
    name: "SLUGMA"
  },
  "DB": {
    number: 219,
    name: "MAGCARGO"
  },
  "DC": {
    number: 220,
    name: "SWINUB"
  },
  "DD": {
    number: 221,
    name: "PILOSWINE"
  },
  "DE": {
    number: 222,
    name: "CORSOLA"
  },
  "DF": {
    number: 223,
    name: "REMORAID"
  },
  "E0": {
    number: 224,
    name: "OCTILLERY"
  },
  "E1": {
    number: 225,
    name: "DELIBIRD"
  },
  "E2": {
    number: 226,
    name: "MANTINE"
  },
  "E3": {
    number: 227,
    name: "SKARMORY"
  },
  "E4": {
    number: 228,
    name: "HOUNDOUR"
  },
  "E5": {
    number: 229,
    name: "HOUNDOOM"
  },
  "E6": {
    number: 230,
    name: "KINGDRA"
  },
  "E7": {
    number: 231,
    name: "PHANPY"
  },
  "E8": {
    number: 232,
    name: "DONPHAN"
  },
  "E9": {
    number: 233,
    name: "PORYGON2"
  },
  "EA": {
    number: 234,
    name: "STANTLER"
  },
  "EB": {
    number: 235,
    name: "SMEARGLE"
  },
  "EC": {
    number: 236,
    name: "TYROGUE"
  },
  "ED": {
    number: 237,
    name: "HITMONTOP"
  },
  "EE": {
    number: 238,
    name: "SMOOCHUM"
  },
  "EF": {
    number: 239,
    name: "ELEKID"
  },
  "F0": {
    number: 240,
    name: "MAGBY"
  },
  "F1": {
    number: 241,
    name: "MILTANK"
  },
  "F2": {
    number: 242,
    name: "BLISSEY"
  },
  "F3": {
    number: 243,
    name: "RAIKOU"
  },
  "F4": {
    number: 244,
    name: "ENTEI"
  },
  "F5": {
    number: 245,
    name: "SUICUNE"
  },
  "F6": {
    number: 246,
    name: "LARVITAR"
  },
  "F7": {
    number: 247,
    name: "PUPITAR"
  },
  "F8": {
    number: 248,
    name: "TYRANITAR"
  },
  "F9": {
    number: 249,
    name: "LUGIA"
  },
  "FA": {
    number: 250,
    name: "HO-OH"
  },
  "FB": {
    number: 251,
    name: "CELEBI"
  }
}

var trainers = {
  "00": null,
  "01": "LEADER [FALKNER]",
  "02": "LEADER [WHITNEY]",
  "03": "LEADER [BUGSY]",
  "04": "LEADER [MORTY]",
  "05": "LEADER [PRYCE]",
  "06": "LEADER [JASMINE]",
  "07": "LEADER [CHUCK]",
  "08": "LEADER [CLAIR]",
  "09": "SILVER [1]",
  "0A": "POKEMON PROF.",
  "0B": "ELITE FOUR [WILL]",
  "0C": "PKMN TRAINER [CAL]",
  "0D": "ELITE FOUR [BRUNO]",
  "0E": "ELITE FOUR [KAREN]",
  "0F": "ELITE FOUR [KOGA]",
  "10": "CHAMPION",
  "11": "LEADER [BROCK]",
  "12": "LEADER [MISTY]",
  "13": "LEADER [LT.SURGE]",
  "14": "SCIENTIST",
  "15": "LEADER [ERIKA]",
  "16": "YOUNGSTER",
  "17": "SCHOOLBOY",
  "18": "BIRD KEEPER",
  "19": "LASS",
  "1A": "LEADER [JANINE]",
  "1B": "COOLTRAINERM",
  "1C": "COOLTRAINERF",
  "1D": "BEAUTY",
  "1E": "POKEMANIAC",
  "1F": "ROCKET [MALE GRUNT]",
  "20": "GENTLEMAN",
  "21": "SKIER",
  "22": "TEACHER",
  "23": "LEADER [SABRINA]",
  "24": "BUG CATCHER",
  "25": "FISHER",
  "26": "SWIMMERM",
  "27": "SWIMMERF",
  "28": "SAILOR",
  "29": "SUPER NERD",
  "2A": "SILVER [2]",
  "2B": "GUITARIST",
  "2C": "HIKER",
  "2D": "BIKER",
  "2E": "LEADER [BLAINE]",
  "2F": "BURGLAR",
  "30": "FIREBREATHER",
  "31": "JUGGLER",
  "32": "BLACKBELT",
  "33": "ROCKET [MALE EXECUTIVE]",
  "34": "PSYCHIC",
  "35": "PICNICKER",
  "36": "CAMPER",
  "37": "ROCKET [FEMALE EXECUTIVE]",
  "38": "SAGE",
  "39": "MEDIUM",
  "3A": "BOARDER",
  "3B": "POKEFAN [MALE]",
  "3C": "KIMONO GIRL",
  "3D": "TWINS",
  "3E": "POKEFAN [FEMALE]",
  "3F": "PKMN TRAINER ",
  "40": "LEADER ",
  "41": "OFFICER",
  "42": "ROCKET [FEMALE GRUNT]",
  "43": "MYSTICALMAN"
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
  "FF": "9",
  // Unknown data stored.
  "06": "",
  "2E": "",
  "1F": "",
  "2F": "",
  "05": "",
  "1E": "",
  "04": "",
  "3B": "",
  "3D": "",
  "3E": "",
  "3F": "",
  "1C": "",
  "07": "",
  "1A": "",
  "14": "",
  "0E": "",
  "11": "",
  "12": "",
  "0F": "",
  "0D": "",
  "26": "",
  "01": "",
  "36": "",
  "0C": "",
  "1B": "",
  "EB": "",
  "F2": "",
  "10": "",
  "27": "",
  "FF": "",
  "0A": "",
  "0B": "",
  "40": "",
  "41": "",
  "42": "",
  "2B": "",
  "40": "",
  "41": "",
  "42": "",
  "56": "",
  "57": "",
  "02": "",
  "2C": "",
  "2D": "",
  "03": "",
  "3C": "",
  "4C": "",
  "15": "",
  "13": "",
  "35": "",
  "24": "",
  "5D": "",
  "5C": "",
  "31": ""
}

var maps = {
  "00": null,
  "01": "NEW BARK TOWN",
  "02": "ROUTE 29",
  "03": "CHERRYGROVE CITY",
  "04": "ROUTE 30",
  "05": "ROUTE 31",
  "06": "VIOLET CITY",
  "07": "SPROUT TOWER",
  "08": "ROUTE 32",
  "09": "RUINS OF ALPH",
  "0A": "UNION CAVE",
  "0B": "ROUTE 33",
  "0C": "AZALEA TOWN",
  "0D": "SLOWPOKE WELL",
  "0E": "ILEX FOREST",
  "0F": "ROUTE 34",
  "10": "GOLDENROD CITY",
  "11": "RADIO TOWER",
  "12": "ROUTE 35",
  "13": "NATIONAL PARK",
  "14": "ROUTE 36",
  "15": "ROUTE 37",
  "16": "ECRUTEAK CITY",
  "17": "TIN TOWER",
  "18": "BURNED TOWER",
  "19": "ROUTE 38",
  "1A": "ROUTE 39",
  "1B": "OLIVINE CITY",
  "1C": "LIGHTHOUSE",
  "1D": "BATTLE TOWER",
  "1E": "ROUTE 40",
  "1F": "WHIRL ISLANDS",
  "20": "ROUTE 41",
  "21": "CIANWOOD CITY",
  "22": "ROUTE 42",
  "23": "MT.MORTAR",
  "24": "MAHOGANY TOWN",
  "25": "ROUTE 43",
  "26": "LAKE OF RAGE",
  "27": "ROUTE 44",
  "28": "ICE PATH",
  "29": "BLACKTHORN CITY",
  "2A": "DRAGON'S DEN",
  "2B": "ROUTE 45",
  "2C": "DARK CAVE",
  "2D": "ROUTE 46",
  "2E": "SILVER CAVE",
  "2F": "PALLET TOWN",
  "30": "ROUTE 1",
  "31": "VIRIDIAN CITY",
  "32": "ROUTE 2",
  "33": "PEWTER CITY",
  "34": "ROUTE 3",
  "35": "MT.MOON",
  "36": "ROUTE 4",
  "37": "CERULEAN CITY",
  "38": "ROUTE 24",
  "39": "ROUTE 25",
  "3A": "ROUTE 5",
  "3B": "UNDERGROUND",
  "3C": "ROUTE 6",
  "3D": "VERMILION CITY",
  "3E": "DIGLETT'S CAVE",
  "3F": "ROUTE 7",
  "40": "ROUTE 8",
  "41": "ROUTE 9",
  "42": "ROCK TUNNEL",
  "43": "ROUTE 10",
  "44": "POWER PLANT",
  "45": "LAVENDER TOWN",
  "46": "LAV RADIO TOWER",
  "47": "CELADON CITY",
  "48": "SAFFRON CITY",
  "49": "ROUTE 11",
  "4A": "ROUTE 12",
  "4B": "ROUTE 13",
  "4C": "ROUTE 14",
  "4D": "ROUTE 15",
  "4E": "ROUTE 16",
  "4F": "ROUTE 17",
  "50": "ROUTE 18",
  "51": "FUCHSIA CITY",
  "52": "ROUTE 19",
  "53": "ROUTE 20",
  "54": "SEAFOAM ISLANDS",
  "55": "CINNABAR ISLAND",
  "56": "ROUTE 21",
  "57": "ROUTE 22",
  "58": "VICTORY ROAD",
  "59": "ROUTE 23",
  "5A": "INDIGO PLATEAU",
  "5B": "ROUTE 26",
  "5C": "ROUTE 27",
  "5D": "TOHJO FALLS",
  "5E": "ROUTE 28",
  "5F": "NEW BARK TOWN (FAST SHIP)"
}

module.exports = new Mapper;
