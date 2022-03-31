import { crit, hydroVape } from './amplifiers.js';
import { damageDps } from './damage.js';
import { flower_9, feather_9, sand_9, goblet_9, circlet_9, feather_40, circlet_39, circlet_13, goblet_15, feather_16, flower_13, sand_13, circlet_11, feather_42, sand_42, goblet_42, flower_42, sand_8, circlet_30, feather_36, flower_1, feather_1, sand_1, goblet_1, circlet_37 } from './my_artifacts.js';
import { stats } from './stats.js';
import { bennBurst, noblesse, pyroRes, baalE, homNature, ttds } from './traits.js';
import { yae } from './my_characters.js';
import { mappa, oathsworn, solarpearl, widsith_atk, widsith_dmg, widsith_mast } from './catalyst.js';
import { electroCharged, overloaded } from './reactions.js';
import { lapidus } from './debuffs.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';

export const char = yae;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

const a2 = ({ elemMast, elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + (hit.stats.includes("skill") ? (0.0015 * elemMast) : 0)
    };
};

export const sesshouHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 5) => {
    return Array(duration * 3).fill(1.5168).map((motionValue, index) => {
        return {
            stats: ["skill", "electro", ...stats],
            traits: [...traits, a2],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            debuffs,
            transforms
        };
    });
};

export const tenkoHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 3) => {
    return [3.9, ...Array(duration).fill(5.01)].map((motionValue, index) => {
        return {
            stats: ["burst", "electro", ...stats],
            traits: [...traits],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            debuffs,
            transforms
        };
    });
};

export const sesshouAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(yae, weapon, artifacts),
        hits: sesshouHits(buffs, debuffs, amps, transforms, hitStats, duration),
        duration: 3
    };
};

export const tenkoAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(yae, weapon, artifacts),
        hits: tenkoHits(buffs, debuffs, amps, transforms, hitStats, duration),
        duration: 3,
    };
};

export const comboAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(yae, weapon, artifacts),
        hits: [
            ...sesshouHits(buffs, debuffs, amps, transforms, hitStats, duration),
            ...tenkoHits(buffs, debuffs, amps, transforms, hitStats),
        ],
        duration: 7,
    };
};

export const icdOverloaded = (attr, hit) => {
    if (hit.index % 3 === 0) {
        return overloaded(attr, hit);
    } else {
        return 0;
    }
};

export const icdElectroCharged = (attr, hit) => {
    if (hit.index % 2 === 0) {
        return electroCharged(attr, hit);
    } else {
        return 0;
    }
};

const atk_sand  = {
    type: "shime",
    atkPct: 0.466,
    elemMast: 56,
    critDmg: 0.062,
    recharge: 0.104,
    hpPct: 0.047,
};

const recharge_sand  = {
    type: "shime",
    recharge: .518,
    atkPct: 0.166,
    elemMast: 56,
    critDmg: 0.062,
    hpPct: 0.047,
};
const elec_goblet = {
    type: "shime",
    elemDmg: 0.466,
    element: "electro",
    atkPct: 0.192,
    atk: 29,
    critRate: 0.027,
    hp: 239,
};
const atk_circlet  = {
    type: "wand",
    atkPct: 0.466,
    critRate: 0.101,
    defPct: 0.131,
    def: 39,
    hp: 568,
};
const artifacts = [flower_42, feather_1, sand_42, goblet_42, circlet_11];[flower_13, feather_16, sand_13, goblet_15, circlet_13];[flower_1, feather_1, sand_1, goblet_1, circlet_37];
const transforms = [icdElectroCharged];

const buffs = [homNature, noblesse];
const debuffs = [lapidus];

export const print = () => {
    setCurrentEnemy();
    
    console.log("Total combo, electrocharged");
    //console.log(`Solar pearl: ${damageDps(stats(yae, solarpearl, artifacts), [...sesshouHits(buffs, debuffs, undefined, [icdElectroCharged]), ...tenkoHits(buffs, debuffs, undefined, [icdElectroCharged])], 16)}`);
    console.log(`Widsith Atk: ${damageDps(stats(yae, widsith_atk, artifacts), [...sesshouHits(buffs, debuffs, undefined, [icdElectroCharged]), ...tenkoHits(buffs, debuffs, undefined, [icdElectroCharged])], 16)}`);
    console.log(`Widsith Mast: ${damageDps(stats(yae, widsith_mast, artifacts), [...sesshouHits(buffs, debuffs, undefined, [icdElectroCharged]), ...tenkoHits(buffs, debuffs, undefined, [icdElectroCharged])], 16)}`);
    console.log(`Widsith Dmg: ${damageDps(stats(yae, widsith_dmg, artifacts), [...sesshouHits(buffs, debuffs, undefined, [icdElectroCharged]), ...tenkoHits(buffs, debuffs, undefined, [icdElectroCharged])], 16)}`);
    console.log(`Mappa Mare: ${damageDps(stats(yae, mappa, artifacts), [...sesshouHits(buffs, debuffs, undefined, [icdElectroCharged]), ...tenkoHits(buffs, debuffs, undefined, [icdElectroCharged])], 16)}`);
    console.log(`Oathsworn Eye: ${damageDps(stats(yae, oathsworn, artifacts), [...sesshouHits(buffs, debuffs, undefined, [icdElectroCharged]), ...tenkoHits(buffs, debuffs, undefined, [icdElectroCharged])], 16)}`);


    console.log("");
    console.log("3 totem skill, 15 hits");
    //console.log(`Solar pearl: ${damageDps(stats(yae, solarpearl, artifacts), sesshouHits(buffs, undefined, undefined, transforms), 14)}`);
    console.log(`Widsith Atk: ${damageDps(stats(yae, widsith_atk, artifacts), sesshouHits(buffs, debuffs, undefined, transforms), 14)}`);
    console.log(`Widsith Mast: ${damageDps(stats(yae, widsith_mast, artifacts), sesshouHits(buffs, debuffs, undefined, transforms), 14)}`);
    console.log(`Widsith Dmg: ${damageDps(stats(yae, widsith_dmg, artifacts), sesshouHits(buffs, debuffs, undefined, transforms), 14)}`);
    console.log(`Mappa Mare: ${damageDps(stats(yae, mappa, artifacts), sesshouHits(buffs, debuffs, undefined, transforms), 14)}`);
    console.log(`Oathsworn Eye: ${damageDps(stats(yae, oathsworn, artifacts), sesshouHits(buffs, debuffs, undefined, transforms), 14)}`);

    console.log("");
    console.log("3 totem skill (no reactions), 15 hits");
    //console.log(`Solar pearl: ${damageDps(stats(yae, solarpearl, artifacts), sesshouHits(buffs, undefined, undefined), 14)}`);
    console.log(`Widsith Atk: ${damageDps(stats(yae, widsith_atk, artifacts), sesshouHits(buffs, debuffs, undefined), 14)}`);
    console.log(`Widsith Mast: ${damageDps(stats(yae, widsith_mast, artifacts), sesshouHits(buffs, debuffs, undefined), 14)}`);
    console.log(`Widsith Dmg: ${damageDps(stats(yae, widsith_dmg, artifacts), sesshouHits(buffs, debuffs, undefined), 14)}`);
    console.log(`Mappa Mare: ${damageDps(stats(yae, mappa, artifacts), sesshouHits(buffs, debuffs, undefined), 14)}`);
    console.log(`Oathsworn Eye: ${damageDps(stats(yae, oathsworn, artifacts), sesshouHits(buffs, debuffs, undefined), 14)}`);
    
    console.log("");
    console.log("3 totem skill, 1 hit CRIT");
    //console.log(`Solar pearl: ${damageDps(stats(yae, solarpearl, artifacts.concat({ critRate: 1 })), sesshouHits(buffs, undefined, undefined, transforms).slice(0, 1))}`);
    console.log(`Widsith Atk: ${damageDps(stats(yae, widsith_atk, artifacts.concat({ critRate: 1 })), sesshouHits(buffs, debuffs, undefined, transforms).slice(0, 1))}`);
    console.log(`Widsith Mast: ${damageDps(stats(yae, widsith_mast, artifacts.concat({ critRate: 1 })), sesshouHits(buffs, debuffs, undefined, transforms).slice(0, 1))}`);
    console.log(`Widsith Dmg: ${damageDps(stats(yae, widsith_dmg, artifacts.concat({ critRate: 1 })), sesshouHits(buffs, debuffs, undefined, transforms).slice(0, 1))}`);
    console.log(`Mappa Mare: ${damageDps(stats(yae, mappa, artifacts.concat({ critRate: 1 })), sesshouHits(buffs, debuffs, undefined, transforms).slice(0, 1))}`);
    console.log(`Oathsworn Eye: ${damageDps(stats(yae, oathsworn, artifacts.concat({ critRate: 1 })), sesshouHits(buffs, debuffs, undefined, transforms).slice(0, 1))}`);

    console.log("");
    console.log("3 totem burst CRIT");
    //console.log(`Solar pearl: ${damageDps(stats(yae, solarpearl, artifacts.concat({ critRate: 1 })), tenkoHits(buffs, undefined, undefined, transforms))}`);
    console.log(`Widsith Atk: ${damageDps(stats(yae, widsith_atk, artifacts.concat({ critRate: 1 })), tenkoHits(buffs, debuffs, undefined, [icdElectroCharged]))}`);
    console.log(`Widsith Mast: ${damageDps(stats(yae, widsith_mast, artifacts.concat({ critRate: 1 })), tenkoHits(buffs, debuffs, undefined, [icdElectroCharged]))}`);
    console.log(`Widsith Dmg: ${damageDps(stats(yae, widsith_dmg, artifacts.concat({ critRate: 1 })), tenkoHits(buffs, debuffs, undefined, [icdElectroCharged]))}`);
    console.log(`Mappa Mare: ${damageDps(stats(yae, mappa, artifacts.concat({ critRate: 1 })), tenkoHits(buffs, debuffs, undefined, [icdElectroCharged]))}`);
    console.log(`Oathsworn Eye: ${damageDps(stats(yae, oathsworn, artifacts.concat({ critRate: 1 })), tenkoHits(buffs, debuffs, undefined, [icdElectroCharged]))}`);
};