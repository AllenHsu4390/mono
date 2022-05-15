import { crit, cryoMelt, pyroVape } from './amplifiers.js';
import { amosR2, rustR1, rustR5 } from './bows.js';
import { damageDps } from './damage.js';
import { lapidus } from './debuffs.js';
import { flower_11, feather_11, sand_11, goblet_11, circlet_11, circlet_7 } from './my_artifacts.js';
import { ganyu } from './my_characters.js';
import { stats } from './stats.js';
import { bennBurst, geoRes, homNature, noblesse, pyroRes, tom } from './traits.js';

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 5) => {
    return Array(duration).fill([2.304, 3.9168]).flat().map((motionValue, index) => {
        return {
            stats: ["cryo", "charge", ...stats],
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            debuffs,
            transforms,
            enemy
        };
    });
};

export const chargeAtkAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats, duration }) => {
    return {
        char: stats(ganyu, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

const cd_artifacts = [flower_11, feather_11, sand_11, goblet_11, circlet_11];
const cr_artifacts = [flower_11, feather_11, sand_11, goblet_11, circlet_7];
const meltTeam = [bennBurst, noblesse, pyroRes, tom];
const teamDebuffs = [lapidus];

export const char = ganyu;

export const print = () => {
    console.log(`Amos r2 CR circ: ${damageDps(stats(char, amosR2, cr_artifacts), hits(meltTeam, teamDebuffs, [cryoMelt]), 12, 15)}`);
    console.log(`Amos r2 CD circ: ${damageDps(stats(char, amosR2, cd_artifacts), hits(meltTeam, teamDebuffs, [cryoMelt]), 12, 15)}`);

    console.log(`Amos r2 CR circ Bloom CRIT: ${damageDps(stats(char, amosR2, [...cr_artifacts, { critRate: 1 }]), hits(meltTeam, teamDebuffs, [cryoMelt]).slice(-1))}`);
    console.log(`Amos r2 CD circ Bloom CRIT: ${damageDps(stats(char, amosR2, [...cd_artifacts, { critRate: 1 }]), hits(meltTeam, teamDebuffs, [cryoMelt]).slice(-1))}`);
};