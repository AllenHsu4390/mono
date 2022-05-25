import { crit, pyroVape } from "./amplifiers.js";
import { damageDps, damage } from "./damage.js";
import { getCurrentEnemy } from "./enemy.js";
import { jean } from "./my_characters.js";
import { overloaded, swirl } from "./reactions.js";
import { stats } from "./stats.js";
import { ironSting, sacSword } from "./swords.js";
import { getCurrentTeam } from "./team.js";
import { bennBurst, noblesse } from "./traits.js";

export const char = jean;

let BREEZE_START = 6.7968;
let BREEZE_HIT = 1.2544;

// level 90 override
/*
char.baseAtk = 239;
char.lvl = 90;
char.lvlMax = 90;
BREEZE_START = 7.6464;
BREEZE_HIT = 1.4112;
*/

const breezeHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return [BREEZE_START, BREEZE_HIT].map((motionValue, index) => {
        return {
            stats: ["anemo", "burst", ...stats],
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

const sunfireHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return Array(10).fill(0).map((motionValue, index) => {
        return {
            stats: ["anemo", ...stats],
            traits: [...traits],
            amplifiers: [...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
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
            team: getCurrentTeam(),
            debuffs,
            transforms
        };
    });
};

export const galeAction = () => {
    return {
        char: char,
        hits: [],
        delay: 4
    };
};

export const breezeAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: breezeHits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 2
    };
};

export const sunfireAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: sunfireHits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

//const artifacts = [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387, elemMast: 79 }];
const artifacts = [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 544 }];
const buffs = [bennBurst, noblesse];
const debuffs = [];
const transforms = [swirl];

const sunfireOvervapeTest = (start, hits) => {
    const swirlHits = sunfireHits(buffs, debuffs, undefined, transforms, undefined);
    const motionValue = damage(start, swirlHits.slice(0, 1));
    return [start, sunfirePyroHits(buffs, debuffs, [pyroVape], [overloaded, swirl], undefined, undefined, motionValue).slice(0, hits)];
};

const sunfireVapeTest = (start, hits) => {
    const swirlHits = sunfireHits(buffs, debuffs, undefined, transforms, undefined);
    const motionValue = damage(start, swirlHits.slice(0, 1));
    return [start, sunfirePyroHits(buffs, debuffs, [pyroVape], [swirl], undefined, undefined, motionValue).slice(0, hits)];
};

export const print = () => {
    console.log('-----Breeze damage-----');
    console.log(`Sac sword: ${damageDps(stats(char, sacSword, artifacts), breezeHits(buffs, debuffs, undefined, transforms, undefined))}`);
    console.log(`Iron sting: ${damageDps(stats(char, ironSting, artifacts), breezeHits(buffs, debuffs, undefined, transforms, undefined))}`);
    console.log('-----Sunfire vape damage-----');
    console.log(`Sac sword: ${damageDps(...sunfireVapeTest(stats(char, sacSword, artifacts)), 8)}`);
    console.log(`Iron sting: ${damageDps(...sunfireVapeTest(stats(char, ironSting, artifacts)), 8)}`);
    console.log('-----Sunfire overvape damage-----');
    console.log(`Sac sword: ${damageDps(...sunfireOvervapeTest(stats(char, sacSword, artifacts)), 8)}`);
    console.log(`Iron sting: ${damageDps(...sunfireOvervapeTest(stats(char, ironSting, artifacts)), 8)}`);
    console.log('-----Sunfire overvape damage 1 HIT-----');
    console.log(`Sac sword: ${damageDps(...sunfireOvervapeTest(stats(char, sacSword, artifacts), 1))}`);
    console.log(`Iron sting: ${damageDps(...sunfireOvervapeTest(stats(char, ironSting, artifacts), 1))}`);
};