import { crit } from './amplifiers.js';
import { cinnabar, festering, harbinger } from './swords.js';
import { damageDps } from './damage.js';
import { flower_20, feather_20, sand_20, goblet_20, circlet_20, circlet_28,  feather_28, sands_28, flower_28, circlet_29, flower_30, feather_30, sands_30, goblet_30, circlet_30 } from './my_artifacts.js';
import { stats } from './stats.js';
import { albedo } from './my_characters.js';
import { geoResShred, lapidus } from './debuffs.js';
import { geoRes, gorouBanner3C6 } from './traits.js';

export const char = albedo;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return Array(Math.floor(Math.min(duration, 30) / 2)).fill(2.14).map((motionValue, index) => {
        return {
            stats: ["skill", "geo", ...stats],
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

export const burst = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return [5.51, 1.08].map((motionValue, index) => {
        return {
            stats: ["burst", "geo", ...stats],
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

//const artifacts = [flower_20, feather_20, sand_20, goblet_20, circlet_20];
//const artifacts = [flower_28, feather_28, sands_28, goblet_20, circlet_29];
const artifacts = [flower_20, feather_30, sands_30, goblet_30, circlet_28];

export const blossomAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(albedo, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
        hitStat: "def",
        duration
    };
};

export const tectonicAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(albedo, weapon, artifacts),
        hits: burst(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 12,
        delay: 2
    };
};

const buffs = [gorouBanner3C6];

export const print = () => {
    const debuffs = [lapidus, geoResShred];
    console.log(`HOD Blossom Damage: ${damageDps(stats(albedo, harbinger, artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log(`Festering Blossom Damage: ${damageDps(stats(albedo, festering, artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log(`Cinnabar Blossom Damage: ${damageDps(stats(albedo, cinnabar, artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);

    console.log("");
    console.log(`HOD Blossom Damage 1 Hit CRIT: ${damageDps(stats(albedo, harbinger, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(0, 1), undefined, undefined, "def")}`);
    console.log(`Festering Blossom Damage 1 Hit CRIT: ${damageDps(stats(albedo, festering, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(0, 1), undefined, undefined, "def")}`);
    console.log(`Cinnabar Blossom Damage 1 Hit CRIT: ${damageDps(stats(albedo, cinnabar, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(0, 1), undefined, undefined, "def")}`);

    console.log("");
    console.log(`HOD Burst: ${damageDps(stats(albedo, harbinger, artifacts.concat({ critRate: 1 })), burst([geoRes, ...buffs], debuffs).slice(0, 1), undefined, undefined)}`);
    console.log(`Festering Burst: ${damageDps(stats(albedo, festering, artifacts.concat({ critRate: 1 })), burst([geoRes, ...buffs], debuffs).slice(0, 1), undefined, undefined)}`);
    console.log(`Cinnabar Burst: ${damageDps(stats(albedo, cinnabar, artifacts.concat({ critRate: 1 })), burst([geoRes, ...buffs], debuffs).slice(0, 1), undefined, undefined)}`);
};