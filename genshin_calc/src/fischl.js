import { crit, cryoMelt, pyroVape } from './amplifiers.js';
import { amosR2, rustR1, rustR5, stringlessR2 } from './bows.js';
import { damage, damageDps } from './damage.js';
import { lapidus } from './debuffs.js';
import { flower_13, feather_13, sand_13, goblet_13, circlet_13, circlet_2, flower_4, sands_14, goblet_15, feather_16 } from './my_artifacts.js';
import { fischl } from './my_characters.js';
import { electroCharged } from './reactions.js';
import { stats } from './stats.js';
import { bennBurst, geoRes, homNature, noblesse, pyroRes, tom } from './traits.js';

export const char = fischl;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const icdElectroCharged = (attr, hit) => {
    if (hit.index % 3 === 0) {
        return electroCharged(attr, hit);
    } else {
        return 0;
    }
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 10) => {
    return [...[4.19], ...Array(duration).fill(1.69)].map((motionValue, index) => {
        return {
            stats: ["electro", "skill"],
            traits,
            transforms,
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            debuffs,
            enemy
        };
    });
};

const artifacts = [flower_13, feather_16, sand_13, goblet_15, circlet_13];

export const a2Action = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats = [], duration }) => {
    return {
        char: stats(fischl, weapon, artifacts),
        hits: Array(duration).fill(0.80).map((motionValue) => {
            return {
                stats: ["electro", ...hitStats],
                traits: buffs,
                transforms,
                amplifiers: [crit],
                motionValue,
                debuffs,
                enemy
            };
        })
    };
}; 

export const c6Action = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats = [], duration }) => {
    return {
        char: stats(fischl, weapon, artifacts),
        hits: Array(duration).fill(0.30).map((motionValue) => {
            return {
                stats: ["electro", ...hitStats],
                traits: buffs,
                transforms,
                amplifiers: [crit],
                motionValue,
                debuffs,
                enemy
            };
        })
    };
}; 

export const ozAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(fischl, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 1,
    };
};

export const print = () => {
    const pyroTeam = [bennBurst, noblesse, pyroRes];
    const geoTeam = [tom, geoRes];
    const geoTeamDebuffs = [lapidus];

    console.log(`Stringless r5 Pyro team: ${damageDps(stats(char, stringlessR2, artifacts), hits(pyroTeam), 10)}`);
    console.log(`Stringless r5 Geo team: ${damageDps(stats(char, stringlessR2, artifacts), hits(geoTeam, geoTeamDebuffs), 10)}`);

    
    console.log(`Stringless r5 Pyro team summon CRIT: ${damageDps(stats(char, stringlessR2, artifacts.concat({ critRate: 1 })), hits(pyroTeam).slice(0, 1))}`);
    console.log(`Stringless r5 Geo team summon CRIT: ${damageDps(stats(char, stringlessR2, artifacts.concat({ critRate: 1 })), hits(geoTeam, geoTeamDebuffs).slice(0, 1))}`);
};