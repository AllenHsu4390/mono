import { crit, pyroVape } from "./amplifiers.js";
import { damageDps, damage } from "./damage.js";
import { getCurrentEnemy } from "./enemy.js";
import { jean } from "./my_characters.js";
import { overloaded, swirl } from "./reactions.js";
import { stats } from "./stats.js";
import { ironSting, sacSword } from "./swords.js";
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

const sunfireHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return Array(10).fill(0).map((motionValue, index) => {
        return {
            stats: ["anemo", ...stats],
            traits: [...traits],
            amplifiers: [...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

const sunfirePyroHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1, value) => {
    const pyroDmg = ({ flatDmg }, { stats }) => {
        return {
            flatDmg: flatDmg + value
        };
    };

    return Array(10).fill(0).map((motionValue, index) => {
        return {
            stats: ["pyro", ...stats],
            traits: [...traits, pyroDmg],
            amplifiers: [...amps],
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

export const sunfireAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(jean, weapon, artifacts),
        hits: sunfireHits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

//const artifacts = [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387, elemMast: 79 }];
const artifacts = [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 544 }];
const buffs = [bennBurst, noblesse];
const debuffs = [];
const transforms = [swirl];

const sunfireOvervapeTest = (start) => {
    const swirlHits = sunfireHits(buffs, debuffs, undefined, transforms, undefined);
    const motionValue = damage(start, swirlHits.slice(0, 1));
    return [start, sunfirePyroHits(buffs, debuffs, [pyroVape], [overloaded, swirl], undefined, undefined, motionValue)];
};

export const print = () => {
    console.log('-----Breeze damage-----');
    console.log(`Sac sword: ${damageDps(stats(jean, sacSword, artifacts), breezeHits(buffs, debuffs, undefined, transforms, undefined))}`);
    console.log(`Iron sting: ${damageDps(stats(jean, ironSting, artifacts), breezeHits(buffs, debuffs, undefined, transforms, undefined))}`);
    console.log('-----Sunfire overvape damage-----');
    console.log(`Sac sword: ${damageDps(...sunfireOvervapeTest(stats(jean, sacSword, artifacts)))}`);
    console.log(`Iron sting: ${damageDps(...sunfireOvervapeTest(stats(jean, ironSting, artifacts)))}`);
};