import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { flower_1, sand_1, circlet_37, feather_49, goblet_49, goblet_52, circlet_2, sand_52, feather_36, flower_52, flower_46, circlet_52 } from './my_artifacts.js';
import { stats } from './stats.js';
import { yelan } from './my_characters.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { getCurrentTeam, setCurrentTeam } from './team.js';
import { mouun, recurve, skywardHarpR1, stringlessR5, thunderingPulseR1 } from './bows.js';

export const char = yelan;

let LIFELINE = 0.3392;
let EXQ_THROW = 0.0877;
let DICE = 0.1315;

const yelanA1 = ({ hp }) => {
    const team = getCurrentTeam();

    if (!team?.chars) {
        return {
            hp: hp + (hp * 0.12)
        };
    }

    const types = team.chars.reduce((accum, char) => {
        accum[char.element] = true;
        return accum;
    }, {});

    const typesCount = Object.keys(types).length;
    let bonusHp = 0.06;

    if (typesCount === 4) {
        bonusHp = 0.3;
    } else if (typesCount === 3) {
        bonusHp = 0.18;
    } else if (typesCount === 2) {
        bonusHp = 0.12;
    }

    return {
        hp: hp + (hp * bonusHp)
    };
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return [
        ...[LIFELINE].map((motionValue, index) => {
            return {
                stats: ["skill", "hydro", ...stats],
                traits: [yelanA1, ...traits],
                amplifiers: [crit, ...amps],
                motionValue,
                index,
                enemy: getCurrentEnemy(),
                team: getCurrentTeam(),
                debuffs,
                transforms
            };
        }),
        ...[DICE].map((motionValue, index) => {
            return {
                stats: ["burst", "hydro", ...stats],
                traits: [yelanA1, ...traits],
                amplifiers: [crit, ...amps],
                motionValue,
                index,
                enemy: getCurrentEnemy(),
                team: getCurrentTeam(),
                debuffs,
                transforms
            };
        }),
        ...Array(Math.floor(Math.min(15, duration) * 3)).fill(EXQ_THROW).map((motionValue, index) => {
            return {
                stats: ["burst", "hydro", ...stats],
                traits: [yelanA1, ...traits],
                amplifiers: [crit, ...amps],
                motionValue,
                index,
                enemy: getCurrentEnemy(),
                team: getCurrentTeam(),
                debuffs,
                transforms
            };
        }),
    ];
};

export const diceAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
        hitStat: 'hp',
        cooldown: 18,
        delay: 2
    };
};

const cr_circlet = {
    ...circlet_2,
    critDmg: circlet_2.critRate * 2,
    critRate: circlet_2.critDmg / 2,
};

const cd_circlet = {
    type: "eosf",
    critDmg: 0.622,
    recharge: 0.104,
    hpPct: 0.105,
    hp: 568,
    atkPct: 0.152,
};

flower_46;

const artifacts = [flower_52, feather_36, sand_52, goblet_52, circlet_52];
const cr_artifacts = [flower_52, feather_36, sand_52, goblet_52, cr_circlet];

const buffs = [];
const debuffs = [];

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const print = () => {
    setCurrentEnemy(enemy);
    setCurrentTeam({
        chars: [{ element: "geo" }, { element: "hydro" }, { element: "pyro" }, { element: "electro" }]
    });

    console.log("Total Combo");
    console.log(`Skyward Harp: ${damageDps(stats(char, skywardHarpR1, artifacts), hits(buffs, debuffs), 15, 0, "hp")}`);
    console.log(`Stringless: ${damageDps(stats(char, stringlessR5, artifacts), hits(buffs, debuffs), 15, 0, "hp")}`);
    console.log(`Recurve: ${damageDps(stats(char, recurve, cr_artifacts), hits(buffs, debuffs), 15, 0, "hp")}`);
    console.log(`Thundering pulse: ${damageDps(stats(char, thunderingPulseR1, cr_artifacts), hits(buffs, debuffs), 15, 0, "hp")}`);
    console.log(`Mouun: ${damageDps(stats(char, mouun, artifacts), hits(buffs, debuffs), 15, 0, "hp")}`);
    
    console.log("");
    console.log("Single Exquisite throw CRIT");
    console.log(`Skyward Harp: ${damageDps(stats(char, skywardHarpR1, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(4, 5), undefined, 0, "hp")}`);
    console.log(`Stringless: ${damageDps(stats(char, stringlessR5, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(4, 5), undefined, 0, "hp")}`);
    console.log(`Recurve: ${damageDps(stats(char, recurve, cr_artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(4, 5), undefined, 0, "hp")}`);
    console.log(`Thundering pulse: ${damageDps(stats(char, thunderingPulseR1, cr_artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(4, 5), undefined, 0, "hp")}`);
    console.log(`Mouun: ${damageDps(stats(char, mouun, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(4, 5), undefined, 0, "hp")}`);

    /* 
    console.log("");
    console.log(`Lion's roar CD Circ Single sword CRIT: ${damageDps(stats(xingqiu, lionroarR5, artifacts.concat({ critRate: 1})), hits.slice(0, 1))}`);
    console.log(`Sac sword CD Circ Single sword CRIT: ${damageDps(stats(xingqiu, sacSword, artifacts.concat({ critRate: 1})), hits.slice(0, 1))}`);
    
    console.log(`Sac sword CD Circ: ${damage(stats(xingqiu, sacSword, artifacts), fatalRainScreen) * 0.6 * 2}`);
    console.log(`Sac sword ATK Circ: ${damage(stats(xingqiu, sacSword, artifacts.concat(atk_circ)), fatalRainScreen) * 0.6 * 2}`);
    console.log("");
    console.log(`Lion's roar CD Circ: ${damage(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
    console.log(`Lion's roar ATK Circ: ${damage(stats(xingqiu, lionroarR5, artifacts.concat(atk_circ)), fatalRainScreen)}`);
    console.log(`Lion's roar CR Circ: ${damage(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
    console.log(`Lion's roar ATK lvl 20 Circ: ${damage(stats(xingqiu, lionroarR5, artifacts.concat(atk_circ_lvl_20)), fatalRainScreen)}`);
    */
};

/*
Sac sword CD Circ: 207107
Sac sword ATK Circ: 217104
Lion's roar CD Circ: 285239
Lion's roar ATK Circ: 291628
*/