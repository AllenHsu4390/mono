import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { stats } from './stats.js';
import { ayato } from './my_characters.js';
import { amenoma, blackSword, harbinger, skywardBlade } from './swords.js';
import { circlet_44, circlet_45, feather_44, flower_44, goblet_44, sand_44 } from './my_artifacts.js';
import { bennBurst, yunjinBurst } from './traits.js';
import {  vvShred } from './debuffs.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';

export const char = ayato;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0,
};

const hpBonus = ({ flatDmg, hp }, hit) => {
    return {
        flatDmg: flatDmg + (hit.stats.includes("normal") ? (0.0096 * hp * 4) : 0),
    };
};

const burstBonus = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + (hit.stats.includes("normal") ? 0.17 : 0),
    };
};

export const kyoukaHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 15) => {
    const biggerNumThanDuration = duration * 3;
    return Array(biggerNumThanDuration)
        .fill([0.9041, 1.007, 1.1098])
        .flat()
        .slice(0, duration)
        .concat(1.735).map((motionValue, index) => {
            return {
                stats: ["normal", "weapon_sword", "hydro", ...stats],
                traits: [...traits, hpBonus, burstBonus],
                amplifiers: [crit, ...amps],
                motionValue,
                index,
                enemy: getCurrentEnemy(),
                debuffs,
                transforms
            };
        });
};

export const suiyuuHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 8) => {
    return Array(duration)
        .fill(.9968)
        .flat()
        .map((motionValue, index) => {
            return {
                stats: ["burst", "hydro", ...stats],
                traits: [...traits],
                amplifiers: [crit, ...amps],
                motionValue,
                index,
                enemy: getCurrentEnemy(),
                debuffs,
                transforms
            };
        });
};

export const suiyuuAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: suiyuuHits(buffs, debuffs, amps, transforms, hitStats, duration),
        cooldown: 20,
        delay: 4
    };
};

export const kyoukaAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: kyoukaHits(buffs, debuffs, amps, transforms, hitStats, duration),
        duration: 6,
    };
};

const buffs = [];
const hyperBuffs = [bennBurst, yunjinBurst];
const debuffs = [vvShred];

const cd_artifacts = [flower_44, feather_44, sand_44, goblet_44, circlet_44];
const cr_artifacts = [flower_44, feather_44, sand_44, goblet_44, circlet_45];

export const print = () => {
    const hits = (buffs, debuffs, amps, transforms, hitStats, duration) => [
        ...suiyuuHits(buffs, debuffs, amps, transforms, hitStats),
        ...kyoukaHits(buffs, debuffs, amps, transforms, hitStats, duration)
    ];
    setCurrentEnemy(enemy);
    console.log('-----Kyouka Base-----');
    console.log(`Black blade Damage: ${damageDps(stats(char, blackSword, cd_artifacts), hits(buffs, debuffs, undefined, undefined, undefined), 6)}`);
    console.log(`Skyward blade Damage: ${damageDps(stats(char, skywardBlade, cr_artifacts), hits(buffs, debuffs, undefined, undefined, undefined, 17), 6)}`);
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, cd_artifacts), hits(buffs, debuffs, undefined, undefined, undefined), 6)}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, cr_artifacts), hits(buffs, debuffs, undefined, undefined, undefined), 6)}`);
    console.log('-----Kyouka Hyper-----');
    console.log(`Black blade Damage: ${damageDps(stats(char, blackSword, cd_artifacts), hits(hyperBuffs, debuffs, undefined, undefined, undefined), 6)}`);
    console.log(`Skyward blade Damage: ${damageDps(stats(char, skywardBlade, cr_artifacts), hits(hyperBuffs, debuffs, undefined, undefined, undefined, 17), 6)}`);
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, cd_artifacts), hits(hyperBuffs, debuffs, undefined, undefined, undefined), 6)}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, cr_artifacts), hits(hyperBuffs, debuffs, undefined, undefined, undefined), 6)}`);
    console.log('-----CRIT 1 Kyouka Hyper-----');
    console.log(`Black blade Damage: ${damageDps(stats(char, blackSword, cd_artifacts.concat({ critRate: 1 })), kyoukaHits(hyperBuffs, debuffs, undefined, undefined, undefined).slice(0, 1))}`);
    console.log(`Skyward blade Damage: ${damageDps(stats(char, skywardBlade, cr_artifacts.concat({ critRate: 1 })), kyoukaHits(hyperBuffs, debuffs, undefined, undefined, undefined).slice(0, 1))}`);
    console.log(`HOD Damage: ${damageDps(stats(char, harbinger, cd_artifacts.concat({ critRate: 1 })), kyoukaHits(hyperBuffs, debuffs, undefined, undefined, undefined).slice(0, 1))}`);
    console.log(`Amenoma Damage: ${damageDps(stats(char, amenoma, cr_artifacts.concat({ critRate: 1 })), kyoukaHits(hyperBuffs, debuffs, undefined, undefined, undefined).slice(0, 1))}`);
};