import { crit } from "./amplifiers.js";
import { damageDps } from "./damage.js";
import { getCurrentEnemy } from "./enemy.js";
import { jean } from "./my_characters.js";
import { swirl } from "./reactions.js";
import { stats } from "./stats.js";
import { sacSword } from "./swords.js";
import { bennBurst, noblesse } from "./traits.js";

const breezeHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return [6.7968, 1.2544].map((motionValue, index) => {
        return {
            stats: ["anemo", "burst", ...stats],
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

export const galeAction = () => {
    return {
        char: jean,
        hits: [],
        delay: 4
    };
};

export const breezeAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(jean, weapon, artifacts),
        hits: breezeHits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 2
    };
};

const artifacts = [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387, elemMast: 79 }];
const buffs = [bennBurst, noblesse];
const debuffs = [];
const transforms = [swirl];

export const print = () => {
    console.log('-----Breeze damage-----');
    console.log(`Fav sword: ${damageDps(stats(jean, sacSword, artifacts), breezeHits(buffs, debuffs, undefined, transforms, undefined))}`);
};