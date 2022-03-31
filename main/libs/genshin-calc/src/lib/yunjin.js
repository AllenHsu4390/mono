import { crit } from "./amplifiers.js";
import { rustR5 } from "./bows.js";
import { damageDps } from "./damage.js";
import { getCurrentEnemy } from "./enemy.js";
import { circlet_4, feather_4, flower_4, goblet_26, sand_27 } from "./my_artifacts.js";
import { yoimiya, yunjin } from "./my_characters.js";
import { stats } from "./stats.js";
import { getCurrentTeam } from "./team.js";
import { yunjinBurst } from "./traits.js";

export const char = yunjin;

const bannerHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 1) => {
    return Array(duration).fill(0.50).map((motionValue, index) => {
        return {
            stats: ["normal", ...stats],
            traits: [...traits, yunjinBurst],
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

const baseChar = {
    element: "geo",
    name: "yunjin",
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

export const baseBannerAction = ({ weapon = () => { return { name: 'none' } }, artifacts = [], buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(baseChar, weapon, artifacts),
        hits: bannerHits(buffs, debuffs, amps, transforms, hitStats, duration),
    };
};

export const bannerAction = () => {
    return {
        char: yunjin,
        hits: [],
        delay: 2
    };
};


const buffs = [];
const debuffs = [];
const artifacts = [];
const noWeapon = () => { return { name: 'none' }};

export const print = () => {
    console.log('-----Yunjin Normal Base-----');
    console.log(`Banner Damage: ${damageDps(stats(baseChar, noWeapon, []), bannerHits(buffs, debuffs, undefined, undefined, undefined, 20), 15)}`);
    console.log(`Banner Damage Yoimiya: ${damageDps(stats(yoimiya, rustR5, [flower_4, feather_4, sand_27, goblet_26, circlet_4]), bannerHits(buffs, debuffs, undefined, undefined, undefined, 7*3), 15)}`);
    console.log('-----Yunjin Normal Base CRIT 1 hit-----');
    console.log(`Banner Damage: ${damageDps(stats(baseChar, noWeapon, [].concat({ critRate: 1 })), bannerHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(0, 1))}`);
 };