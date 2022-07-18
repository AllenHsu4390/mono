import { crit, pyroVape } from './amplifiers.js';
import { damageDps } from './damage.js';
import {
  flower_9,
  feather_9,
  sand_2,
  sand_9,
  goblet_9,
  circlet_9,
  feather_40,
  circlet_13,
  sand_19,
  circlet_45,
  goblet_53,
} from './my_artifacts.js';
import { stats } from './stats.js';
import {
  baalE,
  bennBurst,
  geoRes,
  monaOmen,
  noblesse,
  pyroRes,
  saraBurst,
  tom,
  ttds,
} from './traits.js';
import {
  deathmatch1,
  jadeSpear,
  lithic3,
  kitain,
  whiteTassel,
  theCatchR5,
  favoniusLance,
  wavebreakerR3,
  homa,
  engulfing,
} from './polearms.js';
import { lisaA2, raidenC2, vvShred } from './debuffs.js';
import { electroCharged, overloaded } from './reactions.js';
import { raiden } from './my_characters.js';
import { getCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';
import { withContext } from './context.js';

const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
};

const icdOverloaded = (attr, hit) => {
  if (hit.index % 3 === 0) {
    return overloaded(attr, hit);
  } else {
    return 0;
  }
};

export const icdElectroCharged = (attr, hit) => {
  if (hit.index % 3 === 0) {
    return electroCharged(attr, hit);
  } else {
    return 0;
  }
};

const resolveBonus = (index, stacks) => {
  return stacks * (index === 0 ? 0.07 : 0.0131);
};

const N5 = [0.7982, 0.7842, 0.9602, 0.5511, 0.5526, 1.3192];
const N1CA = [0.7982, 0.973, 1.3267];
const NA3CA = [0.7982, 0.7842, 0.9602, 0.973, 1.3267];
const N3CAX3_N1CA = [Array(3).fill(NA3CA), N1CA].flat();
const N1CAX5 = [Array(5).fill([0.9602, 0.973, 1.3267])].flat();
const N3CAX2_N2CAX2 = [
  Array(2).fill(NA3CA),
  Array(2).fill([0.7982, 0.7842, 1.099, 1.3267]),
].flat();
const N5X3 = Array(3).fill(N5);

const comboHits = (
  combo,
  traits = [],
  debuffs = [],
  amps = [],
  transforms = []
) => {
  return [7.2144]
    .concat(combo)
    .flat()
    .map((motionValue, index) => {
      return {
        traits,
        amplifiers: [crit],
        motionValue: motionValue + resolveBonus(index, 60),
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
        debuffs,
        transforms,
        stats: ['burst', 'electro'],
      };
    });
};

export const balefulOmenHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats,
  duration = 10
) => {
  return Array(Math.floor(duration / 0.9))
    .fill(0.63)
    .map((motionValue, index) => {
      return {
        traits,
        amplifiers: [crit],
        motionValue,
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
        debuffs,
        transforms,
        stats: ['skill', 'electro'],
      };
    });
};

export const hits = (traits = [], debuffs = [], amps = [], transforms = []) => {
  return comboHits(N5X3, traits, debuffs, amps, transforms);
};

export const musouAction = ({
  weapon,
  artifacts,
  buffs = [],
  debuffs = [],
  amps = [],
  transforms,
  hitStats,
}) => {
  return {
    char: stats(raiden, weapon, artifacts),
    hits: hits(buffs, [...debuffs], amps, transforms, hitStats),
    duration: 7,
    cooldown: 18,
    delay: 2,
  };
};

export const omenAction = ({
  weapon,
  artifacts,
  buffs = [],
  debuffs = [],
  amps = [],
  transforms,
  hitStats,
}) => {
  return {
    char: stats(raiden, weapon, artifacts),
    hits: balefulOmenHits(buffs, [...debuffs], amps, transforms, hitStats),
    delay: 2,
  };
};
goblet_53;

const cd_er_artifacts = [flower_9, feather_40, sand_9, goblet_9, circlet_9];
const cd_atk_artifacts = [flower_9, feather_40, sand_19, goblet_9, circlet_9];
const cd_er_atk_artifacts = [
  flower_9,
  feather_40,
  sand_19,
  goblet_53,
  circlet_9,
];
const cd_atk_atk_artifacts = [
  flower_9,
  feather_40,
  sand_19,
  goblet_53,
  circlet_9,
];

const cr_er_artifacts = [flower_9, feather_40, sand_9, goblet_9, circlet_45];
const cr_atk_artifacts = [flower_9, feather_40, sand_19, goblet_9, circlet_45];
const cr_er_atk_artifacts = [
  flower_9,
  feather_40,
  sand_19,
  goblet_53,
  circlet_45,
];
const cr_atk_atk_artifacts = [
  flower_9,
  feather_40,
  sand_19,
  goblet_53,
  circlet_45,
];

const nationalTeam = [bennBurst, noblesse, pyroRes, baalE];
const buffTeam = [bennBurst, noblesse, baalE, saraBurst];

export const char = raiden;

export const print = () => {
  withContext({
    enemy,
    run: () => {
      const nationalTeamEasy = comboHits(N5X3, nationalTeam, [], [], []);
      const nationalTeamHard = comboHits(
        N3CAX2_N2CAX2,
        nationalTeam,
        [],
        [],
        []
      );
      const buffTeamEasy = comboHits(N5X3, buffTeam, [vvShred]);
      const buffTeamHard = comboHits(N3CAX2_N2CAX2, buffTeam, [vvShred]);

      console.log('National Team');
      console.log(
        `Engulfing r1 3NA5 spam: ${damageDps(
          stats(char, engulfing, cr_er_artifacts),
          nationalTeamEasy,
          6
        )}`
      );
      console.log(
        `Jade r1 3NA5 spam: ${damageDps(
          stats(char, jadeSpear, cd_er_artifacts),
          nationalTeamEasy,
          6
        )}`
      );
      console.log(
        `Catch r5 3NA5 spam: ${damageDps(
          stats(char, theCatchR5, cd_atk_artifacts),
          nationalTeamEasy,
          6
        )}`
      );
      console.log(
        `Homa r1 3NA5 spam: ${damageDps(
          stats(char, homa, cr_er_artifacts),
          nationalTeamEasy,
          6
        )}`
      );
      console.log(
        `Wavebreaker 3NA5 spam: ${damageDps(
          stats(char, wavebreakerR3, cr_er_artifacts),
          nationalTeamEasy,
          6
        )}`
      );
      console.log(
        `Deathmatch 3NA5 spam: ${damageDps(
          stats(char, deathmatch1, cd_er_artifacts),
          nationalTeamEasy,
          6
        )}`
      );
      console.log('');
      console.log('Buff Team');
      console.log(
        `Engulfing r1 spam: ${damageDps(
          stats(char, engulfing, cr_er_artifacts),
          buffTeamEasy,
          6
        )}`
      );
      console.log(
        `Jade r1 spam: ${damageDps(
          stats(char, jadeSpear, cd_er_artifacts),
          buffTeamEasy,
          6
        )}`
      );
      console.log(
        `Catch r5 spam: ${damageDps(
          stats(char, theCatchR5, cd_atk_artifacts),
          buffTeamEasy,
          6
        )}`
      );
      console.log(
        `Homa r1 spam: ${damageDps(
          stats(char, homa, cr_er_artifacts),
          buffTeamEasy,
          6
        )}`
      );
      console.log(
        `Wavebreaker spam: ${damageDps(
          stats(char, wavebreakerR3, cr_er_artifacts),
          buffTeamEasy,
          6
        )}`
      );
      console.log(
        `Deathmatch spam: ${damageDps(
          stats(char, deathmatch1, cd_er_artifacts),
          buffTeamEasy,
          6
        )}`
      );

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
      console.log('');
      console.log('National Team first hit');
      console.log(
        `Engulfing r1 initial hit CRIT: ${damageDps(
          stats(char, engulfing, cr_er_artifacts.concat({ critRate: 1 })),
          nationalTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Jade r1 initial hit CRIT: ${damageDps(
          stats(char, jadeSpear, cd_er_artifacts.concat({ critRate: 1 })),
          nationalTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Catch r5 initial hit CRIT: ${damageDps(
          stats(char, theCatchR5, cd_atk_artifacts.concat({ critRate: 1 })),
          nationalTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Homa r1 initial hit CRIT: ${damageDps(
          stats(char, homa, cr_er_artifacts.concat({ critRate: 1 })),
          nationalTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Wavebreaker r3 initial hit CRIT: ${damageDps(
          stats(char, wavebreakerR3, cr_er_artifacts.concat({ critRate: 1 })),
          nationalTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Deathmatch initial hit CRIT: ${damageDps(
          stats(char, deathmatch1, cd_er_artifacts.concat({ critRate: 1 })),
          nationalTeamEasy.slice(0, 1)
        )}`
      );
      console.log('');
      console.log('Buff Team first hit');
      console.log(
        `Engulfing r1 initial hit CRIT: ${damageDps(
          stats(char, engulfing, cr_er_artifacts.concat({ critRate: 1 })),
          buffTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Jade r1 initial hit CRIT: ${damageDps(
          stats(char, jadeSpear, cd_er_artifacts.concat({ critRate: 1 })),
          buffTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Catch r5 initial hit CRIT: ${damageDps(
          stats(char, theCatchR5, cd_atk_artifacts.concat({ critRate: 1 })),
          buffTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Homa r1 initial hit CRIT: ${damageDps(
          stats(char, homa, cr_er_artifacts.concat({ critRate: 1 })),
          buffTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Wavebreaker r3 initial hit CRIT: ${damageDps(
          stats(char, wavebreakerR3, cr_er_artifacts.concat({ critRate: 1 })),
          buffTeamEasy.slice(0, 1)
        )}`
      );
      console.log(
        `Deathmatch initial hit CRIT: ${damageDps(
          stats(char, deathmatch1, cd_er_artifacts.concat({ critRate: 1 })),
          buffTeamEasy.slice(0, 1)
        )}`
      );

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
    },
  });
};

// 38570 E, 0 stacks
