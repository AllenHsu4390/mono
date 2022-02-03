import { crit, hydroVape } from './amplifiers.js';
import { lionroarR5, sacSword, harbinger, blackSword } from './swords.js';
import { damageDps } from './damage.js';
import { flower_1, feather_1, sand_1, goblet_1, circlet_2, circlet_3, circlet_12, feather_2, circlet_37 } from './my_artifacts.js';
import { stats } from './stats.js';
import { bennBurst, noblesse, pyroRes, baalE } from './traits.js';
import { xingqiu } from './my_characters.js';

export const char = xingqiu;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return Array(Math.floor(Math.min(15, duration) * 4)).fill(1.03).map((motionValue, index) => {
        return {
            stats: ["burst", "hydro", ...stats],
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy,
            debuffs,
            transforms
        };
    });
};

export const fatalRainScreen = [3.02, 3.44].map((motionValue, index) => {
    const c4 = () => 1.5;

    return {
        traits: [bennBurst, noblesse, pyroRes],
        amplifiers: [crit, ...(index === 0 ? [hydroVape] : []), c4],
        motionValue,
        stats: ["skill", "hydro", "hasElectro"]
    };
});

export const raincutterAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(xingqiu, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 20,
        delay: 1
    };
};

const artifacts = [flower_1, feather_1, sand_1, goblet_1, circlet_37];

export const print = () => {
    // console.log(stats(xingqiu, lionroarR5, artifacts));

    console.log("Total raincutter");
    console.log(`Lion's roar: ${damageDps(stats(xingqiu, lionroarR5, artifacts), hits([noblesse, pyroRes, baalE], undefined, undefined, undefined, ["hasElectro"]), 15)}`);
    console.log(`Sac sword: ${damageDps(stats(xingqiu, sacSword, artifacts), hits([noblesse, pyroRes, baalE]), 15)}`);
    console.log(`HOD: ${damageDps(stats(xingqiu, harbinger, artifacts), hits([noblesse, pyroRes, baalE]), 15)}`);
    console.log(`Black sword: ${damageDps(stats(xingqiu, blackSword, artifacts), hits([noblesse, pyroRes, baalE]), 15)}`);

    console.log("Total rainscreen");
    console.log(`Sac sword: ${damageDps(stats(xingqiu, sacSword, artifacts), fatalRainScreen)}`);
    console.log(`Lion's roar: ${damageDps(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
    console.log(`HOD: ${damageDps(stats(xingqiu, harbinger, artifacts), fatalRainScreen)}`);
    console.log(`Black sword: ${damageDps(stats(xingqiu, blackSword, artifacts), fatalRainScreen)}`);

    /* 
    console.log("");
    console.log(`Lion's roar CD Circ Single sword CRIT: ${damageDps(stats(xingqiu, lionroarR5, artifacts.concat({ critRate: 1})), hits.slice(0, 1))}`);
    console.log(`Sac sword CD Circ Single sword CRIT: ${damageDps(stats(xingqiu, sacSword, artifacts.concat({ critRate: 1})), hits.slice(0, 1))}`);
    
    console.log(`Sac sword CD Circ: ${damage(stats(xingqiu, sacSword, artifacts), fatalRainScreen) * 0.6 * 2}`);
    console.log(`Sac sword ATK Circ: ${damage(stats(xingqiu, sacSword, artifacts.concat(atk_circ)), fatalRainScreen) * 0.6 * 2}`);
    console.log("");
    console.log(`Lion's roar CD Circ: ${damage(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
    console.log(`Lion's roar ATK Circ: ${damage(stats(xingqiu, lionroarR5, artifacts.concat(atk_circ)), fatalRainScreen)}`);
    console.log(`Lion's roar CR Circ: ${damage(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
    console.log(`Lion's roar ATK lvl 20 Circ: ${damage(stats(xingqiu, lionroarR5, artifacts.concat(atk_circ_lvl_20)), fatalRainScreen)}`);
    */
};

/*
Sac sword CD Circ: 207107
Sac sword ATK Circ: 217104
Lion's roar CD Circ: 285239
Lion's roar ATK Circ: 291628
*/