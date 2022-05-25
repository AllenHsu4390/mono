import { crit, pyroVape } from './amplifiers.js';
import { theCatchR4, theCatchR5, deathmatch1, deathmatch2, kitain, dragonsBane, homa, wavebreakerR3 } from './polearms.js';
import { damageDps } from './damage.js';
import { flower_1, flower_2, feather_2, sand_2, goblet_2, circlet_2, circlet_3, goblet_7, circlet_12, circlet_6, flower_17, sand_19 } from './my_artifacts.js';
import { stats } from './stats.js';
import { bennBurst, noblesse, pyroRes, baalE } from './traits.js';
import { overloaded } from './reactions.js';
import { xiangling } from './my_characters.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0,
    stats: ["hasPyro", "hasHydro"]
};

const char = xiangling;

let START_HITS = [1.37, 1.67, 2.08];
let SPIN_HIT = 2.13;

// level 90 override
/*
char.baseAtk = 225;
char.elemMast = 96;
char.lvl = 90;
char.lvlMax = 90;
START_HITS = [1.62, 1.98, 2.47];
SPIN_HIT = 2.52;
*/


export const pyronadoSpinHits = (traits = [], debuffs = [], amps = [], transforms = [], hitStats = [], duration = 11) => {
    const pyronado = Array(duration).fill(SPIN_HIT);
    return pyronado.map((motionValue) => {
        return {
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            debuffs,
            stats: ["burst", "pyro", ...hitStats],
            transforms
        };
    });
};

export const pyronadoHits = (traits = [], debuffs = [], amps = [], transforms = [], hitStats = []) => {
    return START_HITS.map((motionValue) => {
        return {
            traits,
            amplifiers: [crit],
            motionValue,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            debuffs,
            stats: ["burst", "pyro", ...hitStats]
        };
    });
};

export const pyronadoAction = ({ weapon, artifacts, buffs = [], debuffs, amps = [], transforms = [], hitStats = [], duration }) => {
    const hits = [
        ...pyronadoHits(buffs, debuffs, amps, transforms, hitStats, duration),
        ...pyronadoSpinHits(buffs, debuffs, amps, transforms, hitStats, duration)
    ];

    return {
        char: stats(xiangling, weapon, artifacts),
        hits,
        cooldown: 20,
        delay: 2,
    };
};

export const pyronadoSpinAction = ({ weapon, artifacts, buffs = [], debuffs, amps = [], transforms = [], hitStats = [], duration }) => {
    const hits = [
        ...pyronadoSpinHits(buffs, debuffs, amps, transforms, hitStats, duration)
    ];

    return {
        char: stats(xiangling, weapon, artifacts),
        hits,
        cooldown: 20,
    };
};

const cr_circ = circlet_12;
const cd_circ = circlet_2;
const artifacts = [flower_17, feather_2, sand_19, goblet_7];
const atk_gob = {
    type: "eosf",
    atkPct: 0.387,
    atk: 53,
    critDmg: 0.155,
    hp: 209,
    elemMast: 37,
};
const artifacts2 = [flower_2, feather_2, sand_2, atk_gob, circlet_6];

export const print = () => {
    const hits = (traits = [], debuffs = [], amps = [], transforms = [], hitStats = []) => {
        return [
            ...pyronadoHits(traits, debuffs, amps, transforms, hitStats),
            ...pyronadoSpinHits(traits, debuffs, amps, transforms, hitStats),
        ];
    };

    setCurrentEnemy(enemy);
    const vapeHits = hits([bennBurst, noblesse, pyroRes, baalE], [], [pyroVape]);
    const overVapeHits = hits([bennBurst, noblesse, pyroRes, baalE], [], [pyroVape], [overloaded]);
    console.log("Vape");
    console.log(`Catch r5 CR circ: ${damageDps(stats(char, theCatchR5, artifacts.concat(cr_circ)), vapeHits, 14, 6)}`);
    console.log(`Deathmatch (1 enemy) CD circ: ${damageDps(stats(char, deathmatch1, artifacts.concat(cd_circ)), vapeHits, 14, 6)}`);
    console.log(`Dragon's bane r5 CR circ: ${damageDps(stats(char, dragonsBane, artifacts.concat(cr_circ)), vapeHits, 14, 6)}`);
    console.log(`Homa r1 CR circ: ${damageDps(stats(char, homa, artifacts.concat(cr_circ)), vapeHits, 14, 6)}`);
    console.log(`Wavebreaker r3 CR circ: ${damageDps(stats(char, wavebreakerR3, artifacts.concat(cr_circ)), vapeHits, 14, 6)}`);
    
    console.log("");
    console.log("One hit CRIT");
    console.log(`Catch r5 CR circ: ${damageDps(stats(char, theCatchR5, artifacts.concat(cr_circ).concat({ critRate: 1 })), vapeHits.slice(4, 5))}`);
    console.log(`Deathmatch (1 enemy) CD circ: ${damageDps(stats(char, deathmatch1, artifacts.concat(cd_circ).concat({ critRate: 1 })), vapeHits.slice(4, 5))}`);
    console.log(`Dragon's bane r5 CR circ: ${damageDps(stats(char, dragonsBane, artifacts.concat(cr_circ).concat({ critRate: 1 })), vapeHits.slice(4, 5))}`);
    console.log(`Homa r1 CR circ: ${damageDps(stats(char, homa, artifacts.concat(cr_circ).concat({ critRate: 1 })), vapeHits, 14, 6)}`);
    console.log(`Wavebreaker r3 CR circ: ${damageDps(stats(char, wavebreakerR3, artifacts.concat(cr_circ).concat({ critRate: 1 })), vapeHits.slice(4, 5))}`);

    console.log("");
    console.log("OverVape");
    console.log(`Catch r5 CR circ: ${damageDps(stats(char, theCatchR5, artifacts.concat(cr_circ)), overVapeHits, 14, 6)}`);
    console.log(`Deathmatch (1 enemy) CD circ: ${damageDps(stats(char, deathmatch1, artifacts.concat(cd_circ)), overVapeHits, 14, 6)}`);
    console.log(`Dragon's bane r5 CR circ: ${damageDps(stats(char, dragonsBane, artifacts.concat(cr_circ)), overVapeHits, 14, 6)}`);
    console.log(`Homa r1 CR circ: ${damageDps(stats(char, homa, artifacts.concat(cr_circ)), overVapeHits, 14, 6)}`);
    console.log(`Wavebreaker r3 CR circ: ${damageDps(stats(char, wavebreakerR3, artifacts.concat(cr_circ)), overVapeHits, 14, 6)}`);
    
    console.log("");
    console.log("One hit CRIT");
    console.log(`Catch r5 CR circ: ${damageDps(stats(char, theCatchR5, artifacts.concat(cr_circ).concat({ critRate: 1 })), overVapeHits.slice(4, 5))}`);
    console.log(`Deathmatch (1 enemy) CD circ: ${damageDps(stats(char, deathmatch1, artifacts.concat(cd_circ).concat({ critRate: 1 })), overVapeHits.slice(4, 5))}`);
    console.log(`Dragon's bane r5 CR circ: ${damageDps(stats(char, dragonsBane, artifacts.concat(cr_circ).concat({ critRate: 1 })), overVapeHits.slice(4, 5))}`);
    console.log(`Homa r1 CR circ: ${damageDps(stats(char, homa, artifacts.concat(cr_circ).concat({ critRate: 1 })), overVapeHits.slice(4, 5))}`);
    console.log(`Wavebreaker r3 CR circ: ${damageDps(stats(char, wavebreakerR3, artifacts.concat(cr_circ).concat({ critRate: 1 })), overVapeHits.slice(4, 5))}`);
};

/*
Deathmatch (2 enemy) CD circ: 307352
Deathmatch (1 enemy) CD circ: 317883
Catch r3 CD circ: 274893
Catch r3 CR circ: 280394
Catch r5 CR circ lvl 20: 315784
Jade (no bonus): 334350
*/