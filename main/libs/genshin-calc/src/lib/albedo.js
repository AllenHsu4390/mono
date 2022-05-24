import { crit } from './amplifiers.js';
import { cinnabar, festering, harbinger } from './swords.js';
import { damageDps } from './damage.js';
import { flower_20, feather_20, sand_20, goblet_20, circlet_20, circlet_28,  feather_28, sands_28, flower_28, circlet_29, flower_30, feather_30, sands_30, goblet_30, circlet_30, circlet_46, circlet_38, feather_31 } from './my_artifacts.js';
import { stats } from './stats.js';
import { albedo } from './my_characters.js';
import { geoResShred, lapidus } from './debuffs.js';
import { geoRes, gorouBanner } from './traits.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { getCurrentTeam, setCurrentTeam } from './team.js';

export const char = albedo;

let BLOSSOM = 2.14;

// level 90 override
char.baseDef = 876;
char.traits = [({ elemDmg }, { stats }) => {
    return {
        elemDmg: elemDmg + (stats.includes("geo") ? .288 : 0)
    };
}];
char.lvl = 90;
char.lvlMax = 90;

BLOSSOM = 2.4048;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};
export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    return Array(Math.floor(Math.min(duration, 30) / 2)).fill(BLOSSOM).map((motionValue, index) => {
        return {
            stats: ["skill", "geo", ...stats],
            traits,
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

export const burst = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return [5.51, 1.08].map((motionValue, index) => {
        return {
            stats: ["burst", "geo", ...stats],
            traits,
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

//const artifacts = [flower_20, feather_20, sand_20, goblet_20, circlet_20];
//const artifacts = [flower_28, feather_28, sands_28, goblet_20, circlet_29];
const artifacts = [flower_28, feather_31, sands_30, goblet_20, circlet_38];
//const artifacts = [flower_20, feather_30, sands_30, goblet_30, circlet_28];

export const blossomAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
        hitStat: "def"
    };
};

export const tectonicAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: burst(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 12,
        delay: 2
    };
};

const buffs = [gorouBanner];

export const print = () => {
    setCurrentEnemy(enemy);
    setCurrentTeam({
        chars: [{ element: "geo" }, { element: "geo" }, { element: "geo" }]
    })
    
    const debuffs = [lapidus, geoResShred];
    console.log(`Cinnabar Blossom Damage: ${damageDps(stats(char, cinnabar, artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log(`HOD Blossom Damage: ${damageDps(stats(char, harbinger, artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log(`Festering Blossom Damage: ${damageDps(stats(char, festering, artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log("");
    console.log("-----Without Gorou-----");
    console.log(`Cinnabar Blossom Damage: ${damageDps(stats(char, cinnabar, artifacts), hits([], debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log(`HOD Blossom Damage: ${damageDps(stats(char, harbinger, artifacts), hits([], debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);
    console.log(`Festering Blossom Damage: ${damageDps(stats(char, festering, artifacts), hits([], debuffs, undefined, undefined, undefined, 10), 10, 0, "def")}`);

    console.log("");
    console.log(`Cinnabar Blossom Damage 1 Hit CRIT: ${damageDps(stats(char, cinnabar, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(0, 1), undefined, undefined, "def")}`);
    console.log(`HOD Blossom Damage 1 Hit CRIT: ${damageDps(stats(char, harbinger, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(0, 1), undefined, undefined, "def")}`);
    console.log(`Festering Blossom Damage 1 Hit CRIT: ${damageDps(stats(char, festering, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs).slice(0, 1), undefined, undefined, "def")}`);

    console.log("");
    console.log(`Cinnabar Burst: ${damageDps(stats(char, cinnabar, artifacts.concat({ critRate: 1 })), burst([geoRes, ...buffs], debuffs).slice(0, 1), undefined, undefined)}`);
    console.log(`HOD Burst: ${damageDps(stats(char, harbinger, artifacts.concat({ critRate: 1 })), burst([geoRes, ...buffs], debuffs).slice(0, 1), undefined, undefined)}`);
    console.log(`Festering Burst: ${damageDps(stats(char, festering, artifacts.concat({ critRate: 1 })), burst([geoRes, ...buffs], debuffs).slice(0, 1), undefined, undefined)}`);
};