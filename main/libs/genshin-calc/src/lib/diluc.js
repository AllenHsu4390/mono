import { crit, pyroMelt, pyroVape } from './amplifiers.js';
import { damageDps } from './damage.js';
import {
  flower_7,
  feather_7,
  sand_7,
  goblet_7,
  circlet_7,
  circlet_11,
  circlet_6,
  feather_13,
  flower_18,
  circlet_25,
  sand_4,
  goblet_4,
  circlet_41,
  flower_36,
  feather_1,
  sand_36,
  goblet_36,
  circlet_2,
} from './my_artifacts.js';
import { stats } from './stats.js';
import {
  bennBurst,
  geoRes,
  homNature,
  noblesse,
  pyroRes,
  sucroseC6,
  sucroseSwirl,
  tom,
} from './traits.js';
import {
  deathmatch1,
  jadeSpear,
  lithic3,
  kitain,
  whiteTassel,
  homa,
  dragonsBane,
} from './polearms.js';
import { lapidus, vvShred } from './debuffs.js';
import { overloaded } from './reactions.js';
import { diluc } from './my_characters.js';
import { rainslasher, redhorn, serpentSpine, wolfs } from './claymore.js';
import { getCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';
import { withContext } from './context.js';

export const char = diluc;

const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
  stats: ['hasHydro'],
};

let normals = [1.4185, 1.3858, 1.5626, 2.1189];
let onslaught = [1.7936, 1.8544, 2.4472];
let dawn = [3.06, 0.9, 0.9, 0.9, 3.06];

// level 90 override
char.baseAtk = 335;
char.baseDef = 784;
char.critRate = 0.05 + 0.192;
char.lvl = 90;
char.lvlMax = 90;
normals = [1.4185, 1.3858, 1.5626, 2.1189];
onslaught = [1.7936, 1.8544, 2.4472];
dawn = [3.06, 0.9, 0.9, 0.9, 3.06];

const normalHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 10
) => {
  return normals.slice(0, duration).map((motionValue, index) => {
    return {
      traits,
      amplifiers: [crit, ...amps],
      motionValue,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      index,
      debuffs,
      transforms,
      stats: [...stats, 'normal', 'pyro'],
    };
  });
};

const onslaughtHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = []
) => {
  return onslaught.map((motionValue, index) => {
    return {
      traits,
      amplifiers: [crit, ...amps],
      motionValue,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      index,
      debuffs,
      transforms,
      stats: [...stats, 'skill', 'pyro'],
    };
  });
};

const dawnHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 10
) => {
  return dawn.slice(0, duration).map((motionValue, index) => {
    return {
      traits,
      amplifiers: [crit, ...amps],
      motionValue,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      index,
      debuffs,
      transforms,
      stats: [...stats, 'burst', 'pyro'],
    };
  });
};

const A1 = ({ elemDmg }, hit) => {
  return {
    elemDmg: elemDmg + (hit.stats.includes('pyro') ? 0.2 : 0),
  };
};

const C1 = ({ elemDmg }, hit) => {
  return {
    elemDmg: elemDmg + 0.15,
  };
};

const comboHits = (buffs = [], debuffs, amps = [], transforms, hitStats) => {
  return [
    ...onslaughtHits([...buffs, C1], debuffs, amps, transforms, hitStats),
    ...dawnHits([...buffs, C1], debuffs, amps, transforms, hitStats, 1),
    ...dawnHits([...buffs, C1, A1], debuffs, [], transforms, hitStats).slice(1),
    ...normalHits([...buffs, C1, A1], debuffs, [], transforms, hitStats, 1),
    ...normalHits([...buffs, C1, A1], debuffs, [], transforms, hitStats, 1),
    ...normalHits([...buffs, C1, A1], debuffs, [], transforms, hitStats, 1),
    ...onslaughtHits([...buffs, C1, A1], debuffs, amps, transforms, hitStats),
  ];
};

export const comboAction = ({
  weapon,
  artifacts,
  buffs = [],
  debuffs,
  amps = [],
  transforms,
  hitStats,
}) => {
  return {
    char: stats(diluc, weapon, artifacts),
    hits: comboHits(buffs, debuffs, amps, transforms, hitStats),
    duration: 5,
    cooldown: 12,
  };
};

const artifacts = [flower_7, feather_7, sand_4, goblet_4, circlet_41];

export const print = () => {
  withContext({
    enemy,
    run: () => {
      const vapeHits = comboHits(
        [tom, noblesse, bennBurst, pyroRes],
        [lapidus],
        [pyroVape]
      );
      console.log('Vape Combo');
      console.log(
        `Wolfs: ${damageDps(stats(char, wolfs, artifacts), vapeHits, 10)}`
      );
      console.log(
        `Rainslasher: ${damageDps(
          stats(char, rainslasher, artifacts),
          vapeHits,
          10
        )}`
      );
      console.log(
        `Serpent Spine: ${damageDps(
          stats(char, serpentSpine, artifacts),
          vapeHits,
          10
        )}`
      );
      console.log(
        `Redhorn: ${damageDps(stats(char, redhorn, artifacts), vapeHits, 10)}`
      );
      console.log('Dawn CRIT HIT');
      console.log(
        `Wolfs: ${damageDps(
          stats(char, wolfs, artifacts.concat({ critRate: 1 })),
          [vapeHits[3]]
        )}`
      );
      console.log(
        `Rainslasher: ${damageDps(
          stats(char, rainslasher, artifacts.concat({ critRate: 1 })),
          [vapeHits[3]]
        )}`
      );
      console.log(
        `Serpent Spine: ${damageDps(
          stats(char, serpentSpine, artifacts.concat({ critRate: 1 })),
          [vapeHits[3]]
        )}`
      );
      console.log(
        `Redhorn: ${damageDps(
          stats(char, redhorn, artifacts.concat({ critRate: 1 })),
          [vapeHits[3]]
        )}`
      );
    },
  });
};
