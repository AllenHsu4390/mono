import { crit } from "./amplifiers.js";
import { skywardHarpR1 } from "./bows.js";
import { damageDps } from "./damage.js";
import { vvShred } from "./debuffs.js";
import { getCurrentEnemy } from "./enemy.js";
import { sara } from "./my_characters.js";
import { stats } from "./stats.js";
import { bennBurst, noblesse } from "./traits.js";

const subjugationHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return [7.782, .648, .648].map((motionValue, index) => {
        return {
            stats: ["electro", "burst", ...stats],
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

export const subjugationAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(sara, weapon, artifacts),
        hits: subjugationHits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 2
    };
};

const artifacts = [{ atk: 386, critRate: 0.408, critDmg: 0.334, elemDmg: 0.587, atkPct: 0.2 }];
const buffs = [noblesse, bennBurst];
const debuffs = [vvShred];
const transforms = [];

export const print = () => {
    console.log('-----Subjucation damage-----');
    console.log(`Skyward Harp: ${damageDps(stats(sara, skywardHarpR1, artifacts), subjugationHits(buffs, debuffs, undefined, transforms, undefined))}`);
};