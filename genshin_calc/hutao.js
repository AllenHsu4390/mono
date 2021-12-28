import { crit, pyroMelt, pyroVape } from './amplifiers.js';
import { damageDps } from './damage.js';
import { flower_7, feather_7, sand_7, goblet_7, circlet_7, circlet_11, circlet_6, feather_13, flower_18, circlet_25 } from './my_artifacts.js';
import { stats } from './stats.js';
import { geoRes, homNature, pyroRes, sucroseC6, sucroseSwirl, tom } from './traits.js';
import { deathmatch1, jadeSpear, lithic3, kitain, whiteTassel, homa, dragonsBane } from './polearms.js';
import { lapidus, vvShred } from './debuffs.js';
import { overloaded } from './reactions.js';
import { hutao } from './my_characters.js';

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const afterlife = (attr) => { 
    const { atk, hp, baseAtk } = attr;
    let bonusAtk = (0.0536 * hp);

    if (bonusAtk > (baseAtk * 4)) {
        bonusAtk = (baseAtk * 4);
    }

    return {
        atk: atk + bonusAtk
    };
};

export const albedoBonus = () => {
    return (attr, hit) => {
        return (hit.index % 4 === 0) ? 9000 : 0;
    };
};

export const icdPyroVape = (attr, { motionValue, index }) => {
    return (motionValue === 2.148 || index % 3 === 0) ? pyroVape(attr) : 1.0;
};

export const icdPyroMelt = (attr, { motionValue, index }) => {
    return (motionValue === 2.148 || index % 3 === 0) ? pyroMelt(attr) : 1.0;
};

export const icdOverloaded = (attr, { motionValue, index }) => {
    return (motionValue === 2.148 || index % 3 === 0) ? overloaded(attr) : 0;
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

export const afterlifeAction = ({ weapon, artifacts, buffs = [], debuffs, amps = [], transforms, hitStats }) => {
    return {
        char: stats(hutao, weapon, artifacts),
        hits: hits([afterlife, ...buffs], debuffs, amps, transforms, hitStats),
        duration: 9,
        cooldown: 16,
        delay: 2
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

const cd_artifacts = [flower_18, feather_13, sand_7, goblet_7, circlet_6];
const cr_artifacts = [flower_18, feather_13, sand_7, goblet_7, circlet_25];

export const char = hutao;

export const print = () => {
    const vapeHits = hits([afterlife, geoRes, tom, homNature], [lapidus], [icdPyroVape]);
    const overVapeHits = hits([afterlife, tom], [lapidus], [icdPyroVape], [icdOverloaded]);
    const vvVapeHits = hits([afterlife, tom, pyroRes, sucroseSwirl, sucroseC6], [vvShred], [icdPyroVape]);

    /*
    console.log("CR Circlet");
    console.log(`Kitain r1: ${damageDps(stats(char, kitain, artifacts), hits(), 9)}`);
    console.log(`Deathmatch (1 enemy) r1: ${damageDps(stats(char, deathmatch1, artifacts), hits(), 9)}`);
    console.log(`Jade r1: ${damageDps(stats(char, jadeSpear, artifacts), hits(), 9)}`);
    console.log(`Homa r1: ${damageDps(stats(char, homa, artifacts), hits(), 9)}`);
    console.log(`Dragon bane r1: ${damageDps(stats(char, dragonsBane, artifacts), hits(), 9)}`);
    console.log("");
    console.log(`Kitain r1 one charge CRIT: ${damageDps(stats(char, kitain, artifacts.concat({ critRate: 1 })), hits().slice(1, 2))}`);
    console.log(`Deathmatch (1 enemy) r1 one charge CRIT: ${damageDps(stats(char, deathmatch1, artifacts.concat({ critRate: 1 })), hits().slice(1, 2))}`);
    console.log(`Jade r1 one charge CRIT: ${damageDps(stats(char, jadeSpear, artifacts.concat({ critRate: 1 })), hits().slice(1, 2))}`);
    console.log(`Homa r1 one charge CRIT: ${damageDps(stats(char, homa, artifacts.concat({ critRate: 1 })), hits().slice(1, 2))}`);
    console.log("");
    */
    console.log("Vape: Hutao, Xingqiu, Albedo, Zhongli");
    //console.log(`Kitain r1: ${damageDps(stats(char, kitain, cd_artifacts), vapeHits, 9)}`);
    //console.log(`Deathmatch (1 enemy) r1: ${damageDps(stats(char, deathmatch1, cd_artifacts), vapeHits, 9)}`);
    //console.log(`Jade r1: ${damageDps(stats(char, jadeSpear, cd_artifacts), vapeHits, 9)}`);
    console.log(`Homa r1: ${damageDps(stats(char, homa, cr_artifacts), vapeHits, 9)}`);
    //console.log(`Dragon bane r5: ${damageDps(stats(char, dragonsBane, cr_artifacts), vapeHits, 9)}`);
    //console.log(`White tassel r5: ${damageDps(stats(char, whiteTassel, cd_artifacts), vapeHits, 9)}`);
    //console.log(`Lithic r1 (3 liyue): ${damageDps(stats(char, lithic3, cd_artifacts), vapeHits, 9)}`);
    //console.log("");
    //console.log(`Kitain r1 one charge CRIT: ${damageDps(stats(char, kitain, cd_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
    //console.log(`Deathmatch (1 enemy) r1 one charge CRIT: ${damageDps(stats(char, deathmatch1, cd_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
    //console.log(`Jade r1 one charge CRIT: ${damageDps(stats(char, jadeSpear, cd_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
    console.log(`Homa r1 one charge CRIT: ${damageDps(stats(char, homa, cr_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
    //console.log(`Dragon bane r5: ${damageDps(stats(char, dragonsBane, cr_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
    //console.log(`White Tassel r5: ${damageDps(stats(char, whiteTassel, cd_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);
    //console.log(`Lithic r1 (3 liyue): ${damageDps(stats(char, lithic3, cd_artifacts.concat({ critRate: 1 })), vapeHits.slice(1, 2))}`);

    console.log("");
    console.log("Overvape: Hutao, Xingqiu, Fischl, Zhongli");
    //console.log(`Kitain r1: ${damageDps(stats(char, kitain, cd_artifacts), overVapeHits, 9)}`);
    //console.log(`Deathmatch (1 enemy) r1: ${damageDps(stats(char, deathmatch1, cd_artifacts), overVapeHits, 9)}`);
    //console.log(`Jade r1: ${damageDps(stats(char, jadeSpear, cd_artifacts), overVapeHits, 9)}`);
    console.log(`Homa r1: ${damageDps(stats(char, homa, cr_artifacts), overVapeHits, 9)}`);
    //console.log(`Dragon bane r5: ${damageDps(stats(char, dragonsBane, cr_artifacts), overVapeHits, 9)}`);
    //console.log(`White tassel r5: ${damageDps(stats(char, whiteTassel, cd_artifacts), overVapeHits, 9)}`);
    //console.log(`Lithic r1 (3 liyue): ${damageDps(stats(char, lithic3, cd_artifacts), overVapeHits, 9)}`);
    //console.log("");
    //console.log(`Kitain r1 one charge CRIT: ${damageDps(stats(char, kitain, cd_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);
    //console.log(`Deathmatch (1 enemy) r1 one charge CRIT: ${damageDps(stats(char, deathmatch1, cd_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);
    //console.log(`Jade r1 one charge CRIT: ${damageDps(stats(char, jadeSpear, cd_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);
    console.log(`Homa r1 one charge CRIT: ${damageDps(stats(char, homa, cr_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);
    //console.log(`Dragon bane r5: ${damageDps(stats(char, dragonsBane, cr_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);
    //console.log(`White Tassel r5: ${damageDps(stats(char, whiteTassel, cd_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);
    //console.log(`Lithic r1 (3 liyue): ${damageDps(stats(char, lithic3, cd_artifacts.concat({ critRate: 1 })), overVapeHits.slice(1, 2))}`);

    console.log("");
    console.log("VV Vape: Hutao, Xingqiu, Sucrose, Xinyan");
    //console.log(`Kitain r1: ${damageDps(stats(char, kitain, cd_artifacts), vvVapeHits, 9)}`);
    //console.log(`Deathmatch (1 enemy) r1: ${damageDps(stats(char, deathmatch1, cd_artifacts), vvVapeHits, 9)}`);
    //console.log(`Jade r1: ${damageDps(stats(char, jadeSpear, cd_artifacts), vvVapeHits, 9)}`);
    console.log(`Homa r1: ${damageDps(stats(char, homa, cr_artifacts), vvVapeHits, 9)}`);
    //console.log(`Dragon bane r5: ${damageDps(stats(char, dragonsBane, cr_artifacts), vvVapeHits, 9)}`);
    //console.log(`White tassel r5: ${damageDps(stats(char, whiteTassel, cd_artifacts), vvVapeHits, 9)}`);
    //console.log(`Lithic r1 (3 liyue): ${damageDps(stats(char, lithic3, cd_artifacts), vvVapeHits, 9)}`);
    //console.log("");
    //console.log(`Kitain r1 one charge CRIT: ${damageDps(stats(char, kitain, cd_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
    //console.log(`Deathmatch (1 enemy) r1 one charge CRIT: ${damageDps(stats(char, deathmatch1, cd_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
    //console.log(`Jade r1 one charge CRIT: ${damageDps(stats(char, jadeSpear, cd_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
    console.log(`Homa r1 one charge CRIT: ${damageDps(stats(char, homa, cr_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
    //console.log(`Dragon bane r5: ${damageDps(stats(char, dragonsBane, cr_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
    //console.log(`White Tassel r5: ${damageDps(stats(char, whiteTassel, cd_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
    //console.log(`Lithic r1 (3 liyue): ${damageDps(stats(char, lithic3, cd_artifacts.concat({ critRate: 1 })), vvVapeHits.slice(1, 2))}`);
};

/*
Rust r5 CR circ: 390380
Rust r5 CD circ: 364875
Rust r5 ATK circ: 358383
*/