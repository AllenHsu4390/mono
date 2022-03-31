import { crit, pyroVape } from './amplifiers.js';
import { serpentSpine, wolfs } from './claymore.js';
import { damageDps } from './damage.js';
import { icetide, lapidus, lisaA2, shenheBurst, superConduct } from './debuffs.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { flower_10, feather_10, sand_10, goblet_10, circlet_10, circlet_23 } from './my_artifacts.js';
import { eula } from './my_characters.js';
import { stats } from './stats.js';
import { getCurrentTeam } from './team.js';
import { baalE, bennBurst, cryoRes, geoRes, homNature, noblesse, pyroRes, makeShenheE, tom, ttds } from './traits.js';

const enemy = {
    lvl: 90,
    res: 0.30,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0,
};

const glacialIllu = (stacks) => {
    return stacks * 1.2818;
};

const burstHit = (stacks = 13, traits = [], debuffs = [], amps = [], transforms = []) => {
    return [6.274 + glacialIllu(stacks)].map((motionValue, index) => {
        return {
            stats: ["physical", "burst"],
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            transforms,
            debuffs: [...debuffs, icetide]
        };
    });
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = [], stats = ["physical"]) => {
    const physHit = (motionValue, index) => {
        return {
            stats,
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            transforms,
            debuffs
        };
    };

    const cryoHit = (motionValue, index) => {
        return {
            stats: ["cryo"],
            traits,
            amplifiers: [crit],
            motionValue,
            index,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            transforms,
            debuffs
        };
    };

    const physHitAfterCryoHit = (motionValue, index) => {
        return {
            ...physHit(motionValue, index),
            debuffs: [...debuffs, icetide]
        };
    };

    const miniBurstHit = (motionValue, index) => {
        return {
            ...physHitAfterCryoHit(motionValue, index),
            stats: ["physical"]
        };
    };

    const combo = [
        ...[3.9296].map(cryoHit),
        ...[1.419, 1.41794, .8982, .8982, 1.7813].map(physHit),
        ...[3.07, 1.20, 1.20].map(cryoHit),
        ...[6.274 / 2].map(miniBurstHit),
        ...[1.419, 1.41794, .8982, .8982].map(physHitAfterCryoHit),
    ];

    return [...combo, ...burstHit(combo.length, traits, debuffs)];
};

export const glacialAction = ({ weapon, artifacts, buffs = [], debuffs, amps = [], transforms, hitStats }) => {
    return {
        char: stats(eula, weapon, artifacts),
        hits: hits(buffs, debuffs, amps, transforms, hitStats),
        duration: 7,
        cooldown: 20,
        delay: 2
    };
};

const atk_sands = {
    type: "pale",
    atkPct: .466,
    hp: 269,
    critRate: 0.054,
    defPct: 0.051,
    critDmg: 0.272
};

const atk_goblet = {
    type: "pale",
    atkPct: 0.583,
    defPct: 0.041,
    def: 35,
    critRate: 0.011,
    critDmg: 0.078,
};

const cr_circlet = {
    type: "pale",
    critRate: 0.311,
};

const xinyanC4 = ({ resDebuff }, { stats }) => {
    return {
        resDebuff: resDebuff + (stats.includes("physical") ? 0.15 : 0)
    };
};

const xinyanFervor = ({ elemDmg }, { stats }) => {
    return {
        elemDmg: elemDmg + (stats.includes("physical") ? 0.15 : 0)
    };
};

const artifacts = [flower_10, feather_10, sand_10, goblet_10, circlet_23];
const pyroTeam = [bennBurst, tom, noblesse, baalE, xinyanFervor];
const geoTeam = [tom, geoRes, baalE];
const electroTeam = [tom, baalE, ttds];
const cryoTeam = [baalE, cryoRes, makeShenheE(12)];
const xinyanTeam = [tom, baalE, xinyanFervor];

export const char = eula;

export const print = () => {
    setCurrentEnemy(enemy);
    const geoTeamHits = hits(geoTeam, [lapidus, superConduct]);
    const pyroTeamHits =  hits(pyroTeam, [superConduct, xinyanC4], undefined, undefined, ["pyro"]);
    const cryoTeamHits =  hits(cryoTeam, [lapidus, superConduct, shenheBurst]);
    const electroTeamHits = hits(electroTeam, [lapidus, superConduct, lisaA2]);
    const xinyanTeamHits = hits(xinyanTeam, [superConduct, xinyanC4, lisaA2]);

    console.log("Geo team: Eula, Raiden, Albedo, Zhong Li");
    console.log(`Wolfs r1 ER sands: ${damageDps(stats(char, wolfs, artifacts), geoTeamHits, 7)}`);
    console.log(`Serpent Spine r2 ER sands: ${damageDps(stats(char, serpentSpine, artifacts), geoTeamHits, 7)}`);
    console.log(`Wolfs r1 ER sands Last Hit CRIT: ${damageDps(stats(char, wolfs, artifacts.concat({ critRate: 1 })), geoTeamHits.slice(-1))}`);
    console.log(`Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(stats(char, serpentSpine, artifacts.concat({ critRate: 1 })), geoTeamHits.slice(-1))}`);
    console.log("");
    console.log("Pyro team: Eula, Raiden, Bennett, Xinyan");
    console.log(`Wolfs r1 ER sands: ${damageDps(stats(char, wolfs, artifacts), pyroTeamHits, 7)}`);
    console.log(`Serpent Spine r2 ER sands: ${damageDps(stats(char, serpentSpine, artifacts), pyroTeamHits, 7)}`);
    console.log(`Wolfs r1 ER sands Last Hit CRIT: ${damageDps(stats(char, wolfs, artifacts.concat({ critRate: 1 })), pyroTeamHits.slice(-1))}`);
    console.log(`Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(stats(char, serpentSpine, artifacts.concat({ critRate: 1 })), pyroTeamHits.slice(-1))}`);
    console.log("");
    console.log("Cryo team: Eula, Raiden, Shenhe, Zhong Li");
    console.log(`Wolfs r1 ER sands: ${damageDps(stats(char, wolfs, artifacts), cryoTeamHits, 7)}`);
    console.log(`Serpent Spine r2 ER sands: ${damageDps(stats(char, serpentSpine, artifacts), cryoTeamHits, 7)}`);
    console.log(`Wolfs r1 ER sands Last Hit CRIT: ${damageDps(stats(char, wolfs, artifacts.concat({ critRate: 1 })), cryoTeamHits.slice(-1))}`);
    console.log(`Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(stats(char, serpentSpine, artifacts.concat({ critRate: 1 })), cryoTeamHits.slice(-1))}`);
    console.log("");
    console.log("Electro team: Eula, Raiden, Lisa, Zhong Li");
    console.log(`Wolfs r1 ER sands: ${damageDps(stats(char, wolfs, artifacts), electroTeamHits, 7)}`);
    console.log(`Serpent Spine r2 ER sands: ${damageDps(stats(char, serpentSpine, artifacts), electroTeamHits, 7)}`);
    console.log(`Wolfs r1 ER sands Last Hit CRIT: ${damageDps(stats(char, wolfs, artifacts.concat({ critRate: 1 })), electroTeamHits.slice(-1))}`);
    console.log(`Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(stats(char, serpentSpine, artifacts.concat({ critRate: 1 })), electroTeamHits.slice(-1))}`);
    console.log("");
    console.log("Xinyan team: Eula, Raiden, Lisa, Xinyan");
    console.log(`Wolfs r1 ER sands: ${damageDps(stats(char, wolfs, artifacts), xinyanTeamHits, 7)}`);
    console.log(`Serpent Spine r2 ER sands: ${damageDps(stats(char, serpentSpine, artifacts), xinyanTeamHits, 7)}`);
    console.log(`Wolfs r1 ER sands Last Hit CRIT: ${damageDps(stats(char, wolfs, artifacts.concat({ critRate: 1 })), xinyanTeamHits.slice(-1))}`);
    console.log(`Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(stats(char, serpentSpine, artifacts.concat({ critRate: 1 })), xinyanTeamHits.slice(-1))}`);
    
};