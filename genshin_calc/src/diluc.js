import { crit, pyroMelt, pyroVape } from './amplifiers.js';
import { damageDps } from './damage.js';
import { flower_7, feather_7, sand_7, goblet_7, circlet_7, circlet_11, circlet_6, feather_13, flower_18, circlet_25 } from './my_artifacts.js';
import { stats } from './stats.js';
import { geoRes, homNature, pyroRes, sucroseC6, sucroseSwirl, tom } from './traits.js';
import { deathmatch1, jadeSpear, lithic3, kitain, whiteTassel, homa, dragonsBane } from './polearms.js';
import { lapidus, vvShred } from './debuffs.js';
import { overloaded } from './reactions.js';
import { diluc } from './my_characters.js';

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = []) => {
    // NC NC NC NC NC NC NC NC NC NC  // 0 4
    return Array(9).fill([.741, 2.148]).flat().concat([0.96, 0.96]).map((motionValue, index) => {
        return {
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            enemy,
            index,
            debuffs,
            transforms,
            stats: [motionValue === .741 ? "normal": "charge", "pyro", "hasHydro"]
        };
    });
};

export const comboAction = ({ weapon, artifacts, buffs = [], debuffs, amps = [], transforms, hitStats }) => {
    return {
        char: stats(diluc, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats),
        duration: 5,
        cooldown: 12,
    };
};

const normalhits = Array(3).fill([.741, .762, .964, 1.037, .526, .556, 1.358]).flat().map((motionValue, index) => {
    return {
        traits: [afterlife, geoRes, tom, homNature],
        amplifiers: [crit, icdPyroVape],
        motionValue,
        index,
        debuffs: [lapidus],
        stats: ["normal", "pyro", "hasHydro"]
    };
});


const artifacts = [flower_7, feather_7, sand_7, goblet_7, circlet_7];

export const char = diluc;

export const print = () => {
    const vapeHits = hits([afterlife, geoRes, tom, homNature], [lapidus], [icdPyroVape]);
    const overVapeHits = hits([afterlife, tom], [lapidus], [icdPyroVape], [icdOverloaded]);
    const vvVapeHits = hits([afterlife, tom, pyroRes, sucroseSwirl, sucroseC6], [vvShred], [icdPyroVape]);
    console.log("Vape: Hutao, Xingqiu, Albedo, Zhongli");
    console.log(`Homa r1: ${damageDps(stats(char, homa, artifacts), vapeHits, 9)}`);
    console.log(`Homa r1 one charge CRIT: ${damageDps(stats(char, homa, artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
};