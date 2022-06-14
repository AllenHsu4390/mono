import { crit } from "./amplifiers.js";
import { stringlessR5 } from "./bows.js";
import { damageDps } from "./damage.js";
import { getCurrentEnemy } from "./enemy.js";
import { venti } from "./my_characters.js";
import { swirl } from "./reactions.js";
import { stats } from "./stats.js";
import { getCurrentTeam } from "./team.js";

export const char = venti;

let ODE_DMG = 0.6016;
let ODE_BONUS = 0.3008;

const odeBonus = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + ODE_BONUS,
    }
};

const odeHits = (traits = [], debuffs = [], amps = [], transforms = [], stats = [], duration = 20) => {
    return Array(duration).fill(ODE_DMG).map((motionValue, index) => {
        return {
            stats: ["anemo", "burst", ...stats],
            traits: [odeBonus, ...traits],
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

const artifacts = [{ atk: 667, critRate: 0.167, critDmg: 0.117, elemDmg: 0, elemMast: 548 }];

export const odeAction = ({ weapon, artifacts, buffs, debuffs, amps, transforms, hitStats, duration }) => {
    return {
        char: stats(char, weapon, artifacts),
        hits: odeHits(buffs, debuffs, amps, transforms, hitStats, duration),
        delay: 2,
    };
};

const buffs = [];
const debuffs = [];
const transforms = [swirl];

export const print = () => {
    console.log('-----Ode damage-----');
    console.log(`Stringless: ${damageDps(stats(char, stringlessR5, artifacts), odeHits(buffs, debuffs, undefined, transforms, undefined))}`);
};