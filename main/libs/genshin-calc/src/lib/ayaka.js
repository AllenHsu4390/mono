import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { stats } from './stats.js';
import { ayaka } from './my_characters.js';
import { amenoma, festering, harbinger } from './swords.js';
import { circlet_33, feather_33, flower_33, goblet_33, sand_33 } from './my_artifacts.js';
import { cryoRes, noblesse, makeShenheE, ttds } from './traits.js';
import { shenheBurst, vvShred } from './debuffs.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';

export const char = ayaka;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0,
    stats: ["frozen"]
};

const acen1 = ({ elemDmg }, { stats }) => {
    return {
        elemDmg: elemDmg + (stats.includes("cryo") ? 0.18 : 0)
    };
};

const acen2 = ({ elemDmg }, { stats }) => {
    return {
        elemDmg: elemDmg + (stats.includes("normal") || stats.includes("charged") ? 0.30 : 0)
    };
};

export const soumetsuHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return [2.6952].concat(Array(19).fill(1.7968)).map((motionValue, index) => {
        return {
            stats: ["burst", "cryo", ...stats],
            traits: [...traits, acen1],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

export const normalAtkHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 7) => {
    return [.7231, .7699, .9903, .3581, .3581, .3581, 1.2364].slice(0, duration).map((motionValue, index) => {
        return {
            stats: ["normal", "cryo", ...stats],
            traits: [...traits, acen2],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

export const chargeAtkHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return [.8718, .8718, .8718].map((motionValue, index) => {
        return {
            stats: ["charged", "cryo", ...stats],
            traits: [...traits, acen2],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

export const hyoukaHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return [3.588].map((motionValue, index) => {
        return {
            stats: ["skill", "cryo", ...stats],
            traits: [...traits, acen1],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

const artifacts = [flower_33, feather_33, sand_33, goblet_33, circlet_33];

export const normalAtkAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: normalAtkHits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

export const chargedAtkAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: chargeAtkHits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

export const comboAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    const actions = [
        normalAtkAction({
            weapon,
            debuffs,
            buffs,
            amps,
            artifacts,
            transforms,
            hitStats,
            duration: 3
        }),
        chargedAtkAction({
            weapon,
            debuffs,
            buffs,
            amps,
            artifacts,
            transforms,
            hitStats,
        })
    ];
    return actions.reduce((accum, action) => {
        return {
            ...accum,
            hits: [...accum.hits, ...action.hits]
        };
    });
};

export const hyoukaAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: hyoukaHits(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 20,
        delay: 2
    };
};

export const soumetsuAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: soumetsuHits(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 20,
        delay: 2
    };
};

const buffs = [noblesse, ttds, cryoRes];
const debuffs = [vvShred];

export const print = () => {
    const hits = (...params) => [...soumetsuHits(...params), ...hyoukaHits(...params), ...chargeAtkHits(...params)];
    setCurrentEnemy(enemy);
    console.log('-----Soumetsu-----');
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, artifacts), hits(buffs, debuffs, undefined, undefined, undefined))}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, artifacts), hits(buffs, debuffs, undefined, undefined, undefined))}`);
    console.log(`Festering Desire Damage: ${damageDps(stats(char, festering, artifacts), hits(buffs, debuffs, undefined, undefined, undefined))}`);
    console.log('-----CRIT 1 Cut-----');
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs, undefined, undefined, undefined).slice(1, 2))}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs, undefined, undefined, undefined).slice(1, 2))}`);
    console.log(`Festering Desire Damage: ${damageDps(stats(char, festering, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs, undefined, undefined, undefined).slice(1, 2))}`);
    console.log('-----Shenhe Buff-----');
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, artifacts), hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst], undefined, undefined, undefined))}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, artifacts), hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst], undefined, undefined, undefined))}`);
    console.log(`Festering Desire Damage: ${damageDps(stats(char, festering, artifacts), hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst], undefined, undefined, undefined))}`);
    console.log('-----Shenhe Buff CRIT 1 Cut-----');
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, artifacts.concat({ critRate: 1 })), hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst], undefined, undefined, undefined).slice(1, 2))}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, artifacts.concat({ critRate: 1 })), hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst], undefined, undefined, undefined).slice(1, 2))}`);
    console.log(`Festering Desire Damage: ${damageDps(stats(char, festering, artifacts.concat({ critRate: 1 })), hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst], undefined, undefined, undefined).slice(1, 2))}`);
};