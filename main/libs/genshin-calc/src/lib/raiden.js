import { crit, pyroVape } from './amplifiers.js';
import { damageDps } from './damage.js';
import { flower_9, feather_9, sand_9, goblet_9, circlet_9, feather_40, circlet_39 } from './my_artifacts.js';
import { stats } from './stats.js';
import { baalE, bennBurst, geoRes, monaOmen, noblesse, pyroRes, saraBurst, tom, ttds } from './traits.js';
import { deathmatch1, jadeSpear, lithic3, kitain, whiteTassel, theCatchR5, favoniusLance, wavebreakerR3, homa } from './polearms.js';
import { lisaA2, raidenC2, vvShred } from './debuffs.js';
import { electroCharged, overloaded } from './reactions.js';
import { raiden } from './my_characters.js';
import { getCurrentEnemy, setCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';

const enemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

const icdOverloaded = (attr, hit) => {
    if (hit.index % 3 === 0) {
        return overloaded(attr, hit);
    } else {
        return 0;
    }
};

export const icdElectroCharged = (attr, hit) => {
    if (hit.index % 2 === 0) {
        return electroCharged(attr, hit);
    } else {
        return 0;
    }
};

const resolveBonus = (index, stacks) => {
    return stacks * (index === 0 ? 0.0622 : 0.0116);
};

const N5 = [.707, 0.694, 0.85, .488, 0.489, 1.168];
const N1CA = [.707, .973, 1.175];
const NA3CA = [.707, 0.694, 0.85, .973, 1.175];
const N3CAX3_N1CA = [Array(3).fill(NA3CA), N1CA].flat();
const N1CAX5 = [Array(5).fill([0.85, .973, 1.175])].flat();
const N3CAX2_N2CAX2 = [Array(2).fill(NA3CA), Array(2).fill([.707, 0.694, .973, 1.175])].flat();
const N5X3 = Array(3).fill(N5);

const comboHits = (combo, traits = [], debuffs = [], amps = [], transforms = []) => {
    return [6.41].concat(combo).flat().map((motionValue, index) => {
        return {
            traits,
            amplifiers: [crit],
            motionValue: motionValue + resolveBonus(index, 60),
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            debuffs,
            transforms,
            stats: ["burst", "electro"]
        };
    });
};

export const balefulOmenHits = (traits = [], debuffs = [], amps = [], transforms = [], stats, duration = 10) => {
    return Array(Math.floor(duration / 0.9)).fill(.63).map((motionValue, index) => {
        return {
            traits,
            amplifiers: [crit],
            motionValue,
            enemy: getCurrentEnemy(),
            team: getCurrentTeam(),
            debuffs,
            transforms,
            stats: ["skill", "electro"]
        };
    });
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = []) => {
    return comboHits(N5X3, traits, debuffs, amps, transforms);
};

export const musouAction = ({ weapon, artifacts, buffs = [], debuffs = [], amps = [], transforms, hitStats }) => {
    return {
        char: stats(raiden, weapon, artifacts),
        hits: hits(buffs, [...debuffs], amps, transforms, hitStats),
        duration: 7,
        cooldown: 18,
        delay: 2
    };
};

export const omenAction = ({ weapon, artifacts, buffs = [], debuffs = [], amps = [], transforms, hitStats }) => {
    return {
        char: stats(raiden, weapon, artifacts),
        hits: balefulOmenHits(buffs, [...debuffs], amps, transforms, hitStats),
        delay: 2
    };
};

const artifacts = [flower_9, feather_40, sand_9, goblet_9, circlet_9];

const nationalTeam = [bennBurst, noblesse, pyroRes, baalE];
const buffTeam = [bennBurst, noblesse, baalE, saraBurst];

export const char = raiden;

export const print = () => {
    setCurrentEnemy(enemy);
    const nationalTeamEasy = comboHits(N5X3, nationalTeam, [], [], [icdElectroCharged]);
    const nationalTeamHard = comboHits(N3CAX2_N2CAX2, nationalTeam, [], [], [icdElectroCharged]);
    const buffTeamEasy = comboHits(N5X3, buffTeam, [vvShred]);
    const buffTeamHard = comboHits(N3CAX2_N2CAX2, buffTeam, [vvShred]);

    console.log("National Team");
    console.log(`Jade r1 3NA5 spam: ${damageDps(stats(char, jadeSpear, artifacts), nationalTeamEasy, 6)}`);
    console.log(`Catch r5 3NA5 spam: ${damageDps(stats(char, theCatchR5, artifacts), nationalTeamEasy, 6)}`);
    console.log(`Homa r1 3NA5 spam: ${damageDps(stats(char, homa, artifacts), nationalTeamEasy, 6)}`);
    console.log(`Wavebreaker 3NA5 spam: ${damageDps(stats(char, wavebreakerR3, artifacts), nationalTeamEasy, 6)}`);
    console.log("");
    console.log("Buff Team");
    console.log(`Jade r1 spam: ${damageDps(stats(char, jadeSpear, artifacts), buffTeamEasy, 6)}`);
    console.log(`Catch r5 spam: ${damageDps(stats(char, theCatchR5, artifacts), buffTeamEasy, 6)}`);
    console.log(`Homa r1 spam: ${damageDps(stats(char, homa, artifacts), buffTeamEasy, 6)}`);
    console.log(`Wavebreaker spam: ${damageDps(stats(char, wavebreakerR3, artifacts), buffTeamEasy, 6)}`);

    /*
    console.log("");
    console.log("National Team C2");
    console.log(`Jade r1 C2, 3N3C1D + 1N1C1: ${damageDps(stats(char, jadeSpear, artifacts), NA3_CA1(nationalTeam, [raidenC2]), 7, 11)}`);
    console.log(`Catch r5 C2, 3N3C1D + 1N1C1: ${damageDps(stats(char, theCatchR5, artifacts), NA3_CA1(nationalTeam, [raidenC2]), 7, 11)}`);
    console.log(`Deathmatch (1) C2, 3N3C1D + 1N1C1: ${damageDps(stats(char, deathmatch1, artifacts), NA3_CA1(nationalTeam, [raidenC2]), 7, 11)}`);
    //console.log(`Jade r1 3N5D: ${damageDps(stats(char, jadeSpear, artifacts), NA5(fullbuff), 7, 11)}`);
    //console.log(`Catch r5 3N5D: ${damageDps(stats(char, theCatchR5, artifacts), NA5(fullbuff), 7, 11)}`);
    //console.log(`Deathmatch (1) 3N5D: ${damageDps(stats(char, deathmatch1, artifacts), NA5(), 7, 11)}`);
    console.log(`Jade r1 C2, 3N3C1D + 1N1C1: ${damageDps(stats(char, jadeSpear, artifacts), NA3_CA1([], c2), 7, 11)}`);
    console.log(`Catch r5 C2, 3N3C1D + 1N1C1: ${damageDps(stats(char, theCatchR5, artifacts), NA3_CA1([], c2), 7, 11)}`);
    console.log(`Deathmatch (1) C2, 3N3C1D + 1N1C1: ${damageDps(stats(char, deathmatch1, artifacts), NA3_CA1([], c2), 7, 11)}`);
    */
    console.log("");
    console.log("National Team first hit");
    console.log(`Jade r1 initial hit CRIT: ${damageDps(stats(char, jadeSpear, artifacts.concat({ critRate: 1 })), nationalTeamEasy.slice(0, 1))}`);
    console.log(`Catch r5 initial hit CRIT: ${damageDps(stats(char, theCatchR5, artifacts.concat({ critRate: 1 })), nationalTeamEasy.slice(0, 1))}`);
    console.log(`Homa r1 initial hit CRIT: ${damageDps(stats(char, homa, artifacts.concat({ critRate: 1 })), nationalTeamEasy.slice(0, 1))}`);
    console.log(`Wavebreaker r3 initial hit CRIT: ${damageDps(stats(char, wavebreakerR3, artifacts.concat({ critRate: 1 })), nationalTeamEasy.slice(0, 1))}`);
    console.log("");
    console.log("Buff Team first hit");
    console.log(`Jade r1 initial hit CRIT: ${damageDps(stats(char, jadeSpear, artifacts.concat({ critRate: 1 })), buffTeamEasy.slice(0, 1))}`);
    console.log(`Catch r5 initial hit CRIT: ${damageDps(stats(char, theCatchR5, artifacts.concat({ critRate: 1 })), buffTeamEasy.slice(0, 1))}`);
    console.log(`Homa r1 initial hit CRIT: ${damageDps(stats(char, homa, artifacts.concat({ critRate: 1 })), buffTeamEasy.slice(0, 1))}`);
    console.log(`Wavebreaker r3 initial hit CRIT: ${damageDps(stats(char, wavebreakerR3, artifacts.concat({ critRate: 1 })), buffTeamEasy.slice(0, 1))}`);

    console.log("");
    console.log("Baleful Omen");
    console.log(`Jade r1 3NA5 spam: ${damageDps(stats(char, jadeSpear, artifacts), balefulOmenHits(nationalTeam), 10, 0)}`);

    //console.log(`Jade r1 C2, initial hit CRIT: ${damageDps(stats(char, jadeSpear, artifacts.concat({ critRate: 1 })), NA3_CA1_jadeSpear(fullbuff, c2).slice(0, 1))}`);
    //console.log(`Catch r5 C2, initial hit CRIT: ${damageDps(stats(char, theCatchR5, artifacts.concat({ critRate: 1 })), NA3_CA1(fullbuff, c2).slice(0, 1))}`);

    //console.log(`Jade r1 initial hit CRIT 0 stacks no bennet: ${damageDps(stats(char, jadeSpear, artifacts.concat({ critRate: 1 })), NA3_CA1_jadeSpear([pyroRes], undefined, 0).slice(0, 1))}`);
    //console.log(`Deathmatch (1) C2 initial hit CRIT: ${damageDps(stats(char, deathmatch1, artifacts.concat({ critRate: 1 })), NA3_CA1([], c2).slice(0, 1))}`);
    /*
    console.log(`Deathmatch (1) initial hit CRIT: ${damageDps(stats(char, deathmatch1, artifacts.concat({ critRate: 1 })), NA3_CA1().slice(0, 1))}`);
    console.log(`Jade r1 C2, initial hit CRIT: ${damageDps(stats(char, jadeSpear, artifacts.concat({ critRate: 1 })), NA3_CA1([], c2).slice(0, 1))}`);
    console.log(`Catch r5 C2, initial hit CRIT: ${damageDps(stats(char, theCatchR5, artifacts.concat({ critRate: 1 })), NA3_CA1([], c2).slice(0, 1))}`);
    console.log(`Deathmatch (1) initial hit CRIT: ${damageDps(stats(char, deathmatch1, artifacts.concat({ critRate: 1 })), NA3_CA1().slice(0, 1))}`);
    
    */
};

// 38570 E, 0 stacks