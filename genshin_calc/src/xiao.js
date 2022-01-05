import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { flower_8, feather_8, sand_8, goblet_8, circlet_8, sand_13 } from './my_artifacts.js';
import { stats } from './stats.js';
import { geoRes, tom } from './traits.js';
import { deathmatch1, jadeSpear, lithic3, kitain, whiteTassel } from './polearms.js';
import { lapidus } from './debuffs.js';
import { xiao } from './my_characters.js';
import { swirl } from './reactions.js';
import { fischlA2, fischlC6 } from './fischl.js';

export const char = xiao;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

const baneOfEvil = ({ elemDmg }) => {
    return {
        elemDmg: elemDmg + .816
    };
};

const tamerOfDemons = ({ elemDmg }, { index }) => {
    let bonus = (Math.floor((index) / 2) + 1) * 0.05;

    if (bonus > 0.25) {
        bonus = 0.25;
    }

    return {
        elemDmg: elemDmg + bonus
    };
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = []) => {
    return Array(12).fill(3.49).map((motionValue, index) => {
        return {
            traits: [baneOfEvil, tamerOfDemons, ...traits],
            amplifiers: [crit, ...amps],
            stats: ["anemo", "normal"],
            motionValue,
            transforms,
            index,
            enemy,
            debuffs
        };
    });
};

export const baneAction = ({ weapon, artifacts, buffs = [], debuffs, amps = [], transforms, hitStats }) => {
    return {
        char: stats(xiao, weapon, artifacts),
        hits: hits([baneOfEvil, tamerOfDemons, ...buffs], debuffs, amps, transforms, hitStats),
        duration: 15,
        cooldown: 18,
        delay: 2
    };
};

const normalhits = Array(3).fill([.407, .407, .841, 1.013, .566, .566, 1.057, 1.416]).flat().map((motionValue, index) => {
    return {
        traits: [baneOfEvil, geoRes, tom],
        stats: ["anemo", "normal"],
        amplifiers: [crit],
        motionValue,
        enemy,
        debuffs: [lapidus]
    };
});

const artifacts = [flower_8, feather_8, sand_8, goblet_8, circlet_8];

const fischlBonus = (traits, debuffs) => {
    return (attr, hit) => {
        return fischlA2(enemy, traits, debuffs)(attr, hit) + fischlC6(enemy, traits, debuffs)(attr, hit);
    };
};

export const print = () => {
    const debuffs = [lapidus];
    const plungehits = hits([tom], debuffs, undefined, [swirl]);

    console.log(`Deathmatch r1: ${damageDps(stats(xiao, deathmatch1, artifacts), plungehits, 15, 3)}`);
    console.log(`Kitain: ${damageDps(stats(xiao, kitain, artifacts), plungehits, 15, 3)}`);
    console.log(`Jade r1: ${damageDps(stats(xiao, jadeSpear, artifacts), plungehits, 15, 3)}`);
    console.log(`Lithic r1, 3 liyue: ${damageDps(stats(xiao, lithic3, artifacts), plungehits, 15, 3)}`);
    console.log(`whiteTassel r5, normal attacks: ${damageDps(stats(xiao, whiteTassel, artifacts), normalhits, 15, 3)}`);
    console.log(`Deathmatch r1, lvl 20 goblet: ${damageDps(stats(xiao, deathmatch1, artifacts.concat({ elemDmg: 0.079 })), plungehits, 15, 3)}`);

    console.log("");
    console.log(`Deathmatch r1 one hit CRIT: ${damageDps(stats(xiao, deathmatch1, artifacts.concat({ critRate: 1 })), plungehits.slice(0, 1))}`);
    console.log(`Jade r1 one hit CRIT: ${damageDps(stats(xiao, jadeSpear, artifacts.concat({ critRate: 1 })), plungehits.slice(0, 1))}`);
    console.log(`Kitain one hit CRIT: ${damageDps(stats(xiao, kitain, artifacts.concat({ critRate: 1 })), plungehits.slice(0, 1))}`);
};