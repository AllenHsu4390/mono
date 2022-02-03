import { crit, cryoMelt, pyroMelt } from './amplifiers.js';
import { damageDps } from './damage.js';
import { shenheBurst, vvShred } from './debuffs.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { circlet_2, circlet_33, circlet_36, circlet_5, feather_33, feather_34, feather_36, flower_33, flower_34, flower_36, goblet_33, goblet_34, goblet_36, sand_33, sand_34, sand_36 } from './my_artifacts.js';
import { rosaria } from './my_characters.js';
import { deathmatch1, dragonsBane, homa, kitain, lithic1, wavebreakerR3 } from './polearms.js';
import { stats } from './stats.js';
import { bennBurst, cryoRes, makeShenheE, noblesse, pyroRes, ttds } from './traits.js';

const confessionHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return [.876, 2.04].map((motionValue, index) => {
        return {
            stats: ["cryo", "skill", ...stats],
            traits: [...traits],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

const terminationHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 4) => {
    return [1.664, 2.432].concat(Array(duration).fill(2.112)).map((motionValue, index) => {
        return {
            stats: ["cryo", "burst", ...stats],
            traits: [...traits],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};


export const confessionAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(rosaria, weapon, artifacts),
        hits: confessionHits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 2
    };
};

export const terminationAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration = 4 }) => {
    return {
        char: stats(rosaria, weapon, artifacts),
        hits: terminationHits(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 15,
        delay: 2,
    };
};

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0,
    stats: ["hasPyro"]
};

export const icdCryoMelt = (attr, hit) => {
    return cryoMelt(attr);
};

const buffs = [noblesse, cryoRes, bennBurst, pyroRes];
const debuffs = [shenheBurst];
const amps = [icdCryoMelt];
const artifacts = [flower_36, feather_36, sand_36, goblet_36, circlet_2];

export const print = () => {
    setCurrentEnemy(enemy);
    console.log('-----Rosaria Skill damage-----');
    console.log(`Deathmatch: ${damageDps(stats(rosaria, deathmatch1, artifacts), confessionHits([...buffs, makeShenheE(2, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`Kitain: ${damageDps(stats(rosaria, kitain, artifacts), confessionHits([...buffs, makeShenheE(2, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`Dragon bane: ${damageDps(stats(rosaria, dragonsBane, artifacts), confessionHits([...buffs, makeShenheE(2, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`wavebreaker: ${damageDps(stats(rosaria, wavebreakerR3, artifacts), confessionHits([...buffs, makeShenheE(2, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`Homa: ${damageDps(stats(rosaria, homa, artifacts), confessionHits([...buffs, makeShenheE(2, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log('-----Rosaria Burst damage-----');
    console.log(`Deathmatch: ${damageDps(stats(rosaria, deathmatch1, artifacts), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`Kitain: ${damageDps(stats(rosaria, kitain, artifacts), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`Dragon bane: ${damageDps(stats(rosaria, dragonsBane, artifacts), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`wavebreaker: ${damageDps(stats(rosaria, wavebreakerR3, artifacts), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log(`Homa: ${damageDps(stats(rosaria, homa, artifacts), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined))}`);
    console.log('-----Rosaria 1 CRIT Burst damage-----');
    console.log(`Deathmatch: ${damageDps(stats(rosaria, deathmatch1, artifacts.concat({ critRate: 1 })), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined).slice(2, 3))}`);
    console.log(`Kitain: ${damageDps(stats(rosaria, kitain, artifacts.concat({ critRate: 1 })), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined).slice(2, 3))}`);
    console.log(`Dragon bane: ${damageDps(stats(rosaria, dragonsBane, artifacts.concat({ critRate: 1 })), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined).slice(2, 3))}`);
    console.log(`wavebreaker: ${damageDps(stats(rosaria, wavebreakerR3, artifacts.concat({ critRate: 1 })), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined).slice(2, 3))}`);
    console.log(`Homa: ${damageDps(stats(rosaria, homa, artifacts.concat({ critRate: 1 })), terminationHits([...buffs, makeShenheE(5, 4200)], debuffs, amps, undefined, undefined).slice(2, 3))}`);
 };