import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { shenheBurst, vvShred } from './debuffs.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { circlet_33, circlet_5, feather_33, feather_34, flower_33, flower_34, goblet_33, goblet_34, sand_33, sand_34 } from './my_artifacts.js';
import { ayaka, shenhe } from './my_characters.js';
import { lithic1 } from './polearms.js';
import { stats } from './stats.js';
import { amenoma, harbinger } from './swords.js';
import { cryoRes, makeShenheE, noblesse, ttds } from './traits.js';

const springHit = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return Array(1).fill(2.23).map((motionValue, index) => {
        return {
            stats: ["cryo", ...stats],
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

const divineHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    const shenheE = makeShenheE(5);
    return [1.512].concat(Array(12).fill(.4968)).map((motionValue, index) => {
        return {
            stats: ["cryo", ...stats],
            traits: [...traits, shenheE],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};


export const springAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(shenhe, weapon, artifacts),
        hits: springHit(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 2
    };
};

export const divineAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(shenhe, weapon, artifacts),
        hits: divineHits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 4
    };
};

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0,
    stats: ["hasCryo"]
};

const baseChar = {
    element: "cryo",
    name: "shenhe",
    lvl: 80,
    lvlMax: 80,
    baseHp: 8144,
    baseAtk: 1000,
    baseDef: 526,
    recharge: 1,
    atkPct: 0,
    critRate: 0.05,
    critDmg: 0.50
};

const quillHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return Array(duration).fill(0.50).map((motionValue, index) => {
        return {
            stats: ["cryo", ...stats],
            traits: [...traits, makeShenheE(1)],
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            debuffs,
            transforms
        };
    });
};

export const baseQuillAction = ({ weapon = () => { return { name: 'none' } }, artifacts = [], buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(baseChar, weapon, artifacts),
        hits: quillHits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration) => {
    return [
        ...springHit(traits, debuffs, amps, transforms, stats, duration),
        ...divineHits(traits, debuffs, amps, transforms, stats, duration),
        ...quillHits(traits, debuffs, amps, transforms, stats, 10)
    ];
};

const buffs = [noblesse, cryoRes];
const debuffs = [vvShred, shenheBurst];
const artifacts = [flower_34, feather_34, sand_34, goblet_34, circlet_5];

const noWeapon = () => { return { name: 'none' }};

export const print = () => {
    setCurrentEnemy(enemy);
    console.log('-----Shenhe 3 Cryo-----');
    console.log(`Lithic Divine Damage: ${damageDps(stats(shenhe, lithic1, artifacts), hits(buffs, debuffs, undefined, undefined, undefined))}`);
    console.log('-----Shenhe 1 Cryo Base-----');
    console.log(`Lithic Quill Damage: ${damageDps(stats(baseChar, () => { return { name: 'none' }}, []), quillHits(buffs, debuffs, undefined, undefined, undefined, 5))}`);
    console.log(`Lithic Quill Damage Ayaka: ${damageDps(stats(ayaka, amenoma, [flower_33, feather_33, sand_33, goblet_33, circlet_33]), quillHits(buffs, debuffs, undefined, undefined, undefined, 5))}`);
    console.log(`Lithic Quill Damage Weak Char: ${damageDps(stats(baseChar, noWeapon, [].concat({ critDmg: 0.27, critRate: 0.47, atk: 400 })), quillHits(buffs, debuffs, undefined, undefined, undefined, 5))}`);
    console.log(`Lithic Quill Damage Strong Char: ${damageDps(stats(baseChar, noWeapon, [].concat({ critDmg: 1, critRate: 0.6, atk: 1000, elemDmg: 0.466 })), quillHits(buffs, debuffs, undefined, undefined, undefined, 5))}`);
    console.log('-----Shenhe Buff CRIT 1 hit-----');
    console.log(`Lithic Spring Damage: ${damageDps(stats(shenhe, lithic1, artifacts.concat({ critRate: 1 })), hits(buffs, debuffs, undefined, undefined, undefined).slice(0, 1))}`);
    console.log(`Lithic Quill Damage Base: ${damageDps(stats(baseChar, noWeapon, [].concat({ critRate: 1 })), quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(0, 1))}`);
    console.log(`Lithic Quill Damage Ayaka: ${damageDps(stats(ayaka, amenoma, [flower_33, feather_33, sand_33, goblet_33, circlet_33].concat({ critRate: 1 })), quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(0, 1))}`);
    console.log(`Lithic Quill Damage Weak Char: ${damageDps(stats(baseChar, noWeapon, [].concat({ critDmg: 0.27, critRate: 1, atk: 400 })), quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(0, 1))}`);
    console.log(`Lithic Quill Damage Strong Char: ${damageDps(stats(baseChar, noWeapon, [].concat({ critDmg: 1, critRate: 1, atk: 1000, elemDmg: 0.466 })), quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(0, 1))}`);
 };