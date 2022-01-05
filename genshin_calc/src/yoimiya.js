import { crit, pyroVape, pyroMelt } from './amplifiers.js';
import { amosR2, rustR1, rustR5, skywardHarpR1, thunderingPulseR1 } from './bows.js';
import { damage, damageDps } from './damage.js';
import { lapidus, vvShred } from './debuffs.js';
import { fischlA2, fischlC6 } from './fischl.js';
import { flower_4, feather_4, sand_4, goblet_4, circlet_4, circlet_5, circlet_6, flower_13, circlet_13, flower_7, feather_7, circlet_2, feather_16, sand_8, sand_27, goblet_26 } from './my_artifacts.js';
import { overloaded } from './reactions.js';
import { stats } from './stats.js';
import { bennBurst, dionaC6, geoRes, homNature, noblesse, pyroRes, sucroseC6, sucroseSwirl, tom, xianglingC6 } from './traits.js';
import { yoimiya } from './my_characters.js';

export const char = yoimiya;

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

export const firedance = () => {
    return 1.529;
};

export const icdPyroVape = (attr, hit) => {
    if (hit.index % 3 === 0) {
        return pyroVape(attr);
    } else {
        return 1.0;
    }
};

const icdPyroMelt = (attr, hit) => {
    if (hit.index % 3 === 0) {
        return pyroMelt(attr);
    } else {
        return 1.0;
    }
};

export const icdOverloaded = (attr, hit) => {
    if (hit.index % 3 === 0) {
        return overloaded(attr, hit);
    } else {
        return 0;
    }
};

export const hits = (traits, debuffs, amps, transforms, stats = []) => {
    return Array(3).fill([.563, .563,  1.08, 1.404, .7332, .7332, 1.6722]).flat().map((motionValue, index) => {
        return {
            stats: ["pyro", "normal", ...stats],
            traits,
            amplifiers: [crit, ...amps],
            motionValue,
            index,
            enemy,
            debuffs,
            transforms
        };
    }).concat([1.91, ...Array(5).fill(1.83)].map((motionValue, index) => {
        return {
            stats: ["pyro", "burst"],
            traits,
            amplifiers: [crit],
            motionValue,
            enemy,
            debuffs,
        };
    }));
};

export const fischlBonus = (traits, debuffs) => {
    return (attr, hit) => {
        return (hit.index % 3 === 0 ? fischlA2(enemy, traits, debuffs)(attr, hit) : 0) +
            fischlC6(enemy, traits, debuffs)(attr, hit);
    };
};

export const fireDanceAction = ({ weapon, artifacts, buffs, debuffs, amps = [], transforms, hitStats }) => {
    return {
        char: stats(yoimiya, weapon, artifacts),
        hits: hits(buffs, debuffs, [firedance, ...amps], transforms, hitStats),
        duration: 10,
        cooldown: 18,
        delay: 2
    };
};

const cd_circ = circlet_6;
const atk_circ = circlet_5;
const cr_circ = circlet_4;
const artifacts = [flower_4, feather_4, sand_27, goblet_26, circlet_4];
const monoPyroTeam = [bennBurst, noblesse, pyroRes, xianglingC6]
const pyroTeam = [bennBurst, noblesse, pyroRes];
const geoTeam = [tom, geoRes, homNature];
const mixTeam = [tom];

export const print = () => {

    const vapeOverloadPyro = hits(pyroTeam, undefined, [firedance, icdPyroVape], [icdOverloaded, fischlBonus([noblesse, pyroRes])], ["hasHydro", "hasElectro"]);
    const vapePyro = hits(pyroTeam, [lapidus], [firedance, icdPyroVape], [], ["hasHydro"]);
    const overloadPyro = hits(pyroTeam, [lapidus], [firedance], [icdOverloaded, fischlBonus([noblesse, pyroRes], [lapidus])], ["hasElectro"]);
    const vapeGeo = hits(geoTeam, [lapidus], [firedance, icdPyroVape], [], ["hasHydro"]);
    const overloadGeo = hits(geoTeam, [lapidus], [firedance], [icdOverloaded, fischlBonus([tom, geoRes], [lapidus])], ["hasElectro"]);
    const vapeOverload = hits(mixTeam, [lapidus], [firedance, icdPyroVape], [icdOverloaded, fischlBonus([tom], [lapidus])], ["hasHydro", "hasElectro"]);
    const vapeMonoPyro = hits(monoPyroTeam, [], [firedance, icdPyroVape], [], ["hasHydro"]);
    const vvVape = hits([tom, pyroRes, sucroseSwirl, sucroseC6], [vvShred], [icdPyroVape], [], ["hasHydro"]);

    console.log("Pyro team overvape: Yoimiya, Xingqiu, Fischl, Bennett");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), vapeOverloadPyro, 10)}`);
    //console.log(`Rust r5 CD circ: ${damageDps(stats(yoimiya, rustR5, artifacts.concat(cd_circ)), hits(pyroTeam), 10, 8)}`);
    //console.log(`Rust r5 ATK circ: ${damageDps(stats(yoimiya, rustR5, artifacts.concat(atk_circ)), hits(pyroTeam), 10, 8)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), vapeOverloadPyro.slice(6, 7))}`);

    console.log(`Skyward Harp CD circ: ${damageDps(stats(yoimiya, skywardHarpR1, [flower_4, feather_4, sand_4, goblet_4, cd_circ]), vapeOverloadPyro, 10)}`);
    console.log(`Skyward Harp CD circ Last Hit CRIT: ${damageDps(stats(yoimiya, skywardHarpR1, [flower_4, feather_4, sand_4, goblet_4, cd_circ].concat({ critRate: 1})), vapeOverloadPyro.slice(6, 7))}`);

    console.log(`Thundering Pulse CR circ: ${damageDps(stats(yoimiya, thunderingPulseR1, artifacts), vapeOverloadPyro, 10)}`);
    console.log(`Thundering Pulse CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, thunderingPulseR1, artifacts.concat({ critRate: 1})), vapeOverloadPyro.slice(6, 7))}`);
    console.log("");
    console.log("Pyro team vape: Yoimiya, Xingqiu, Bennett, ZhongLi");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), vapePyro, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), vapePyro.slice(6, 7))}`);
    console.log("");
    console.log("Pyro team overload: Yoimiya, Fischl, Bennett, ZhongLi");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), overloadPyro, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), overloadPyro.slice(6, 7))}`);
    console.log("");
    console.log("Geo team vape: Yoimiya, Xingqiu, Albedo, ZhongLi");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), vapeGeo, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), vapeGeo.slice(6, 7))}`);
    console.log("");
    console.log("Geo team overload: Yoimiya, Fischl, Albedo, ZhongLi");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), overloadGeo, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1 })), overloadGeo.slice(6, 7))}`);
    console.log("");
    console.log("Mix team overvape: Yoimiya, Xingqiu, Fischl, ZhongLi");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), vapeOverload, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), vapeOverload.slice(6, 7))}`);
    console.log("");
    console.log("Mono pyro team vape: Yoimiya, Xiangling, Xingqiu, Bennett");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), vapeMonoPyro, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), vapeMonoPyro.slice(6, 7))}`);
    console.log("");
    console.log("VV team vape: Yoimiya, Xingqiu, Sucrose, Xinyan");
    console.log(`Rust r5 CR circ: ${damageDps(stats(yoimiya, rustR5, artifacts), vvVape, 10)}`);
    console.log(`Rust r5 CR circ Last Hit CRIT: ${damageDps(stats(yoimiya, rustR5, artifacts.concat({ critRate: 1})), vvVape.slice(6, 7))}`);
};