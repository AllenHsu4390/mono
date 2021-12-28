import { crit } from './amplifiers.js';
import { redhorn } from './claymore.js';
import { damageDps } from './damage.js';
import { flower_20, feather_20, sand_20, goblet_20, circlet_20, circlet_28,  feather_28, sands_28, flower_28, circlet_29, flower_30, feather_30, sands_30, goblet_30, circlet_30, feather_31 } from './my_artifacts.js';
import { stats } from './stats.js';
import { itto } from './my_characters.js';
import { geoResShred, lapidus } from './debuffs.js';
import { geoRes, gorouBanner3C6 } from './traits.js';

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

const c_slash = 1.5582;
const c_final = 3.2634;
const ushi = 4.9152;

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration) => {
    const combo = [ushi, ...Array(5).fill(c_slash), c_final,  ...Array(3).fill(c_slash), c_final, ushi];

    return combo.map((motionValue, index) => {
        return {
            stats: [motionValue === ushi ? "skill" : "charged", "geo", ...stats],
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

const artifacts = [flower_28, feather_31, sands_28, goblet_20, circlet_29];

export const royalAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(itto, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats),
        duration: 10,
        cooldown: 18,
        delay: 2
    };
};

const buffs = [gorouBanner3C6, geoRes];

export const print = () => {
    const debuffs = [geoResShred];
    const fullCombo = hits(buffs, debuffs);
    console.log(`Redhorn Damage: ${damageDps(stats(itto, redhorn, artifacts), fullCombo, 10, 0)}`);
    console.log(`Redhorn Slash Hit CRIT Damage: ${damageDps(stats(itto, redhorn, artifacts.concat({ critRate: 1 })), fullCombo.slice(1, 2))}`);
    console.log(`Redhorn Final Hit CRIT Damage: ${damageDps(stats(itto, redhorn, artifacts.concat({ critRate: 1 })), fullCombo.slice(fullCombo.length - 2, fullCombo.length - 1))}`);
    console.log(`Redhorn Ushi Hit CRIT Damage: ${damageDps(stats(itto, redhorn, artifacts.concat({ critRate: 1 })), fullCombo.slice(fullCombo.length - 1))}`);
};