import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { stats } from './stats.js';
import { ayaka } from './my_characters.js';
import { amenoma, festering, harbinger, mistSplitter } from './swords.js';
import {
  circlet_33,
  feather_33,
  flower_33,
  goblet_33,
  sand_33,
} from './my_artifacts.js';
import { cryoRes, noblesse, makeShenheE, ttds } from './traits.js';
import { shenheBurst, vvShred } from './debuffs.js';
import { getCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';
import { withContext } from './context.js';

export const char = ayaka;

const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
  stats: ['hasCryo', 'hasFrozen'],
};

export const soumetsuHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 15
) => {
  return [3.0321, ...Array(19).fill(2.0214)].map((motionValue, index) => {
    return {
      stats: ['burst', 'cryo', 'after_dash', 'after_hyouka', ...stats],
      traits: [...traits],
      amplifiers: [crit, ...amps],
      motionValue,
      index,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      debuffs,
      transforms,
    };
  });
};

export const normalAtkHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 7
) => {
  return [0.7231, 0.7699, 0.9903, 0.3581, 0.3581, 0.3581, 1.2364]
    .slice(0, duration)
    .map((motionValue, index) => {
      return {
        stats: ['normal', 'cryo', 'after_dash', 'after_hyouka', ...stats],
        traits: [...traits],
        amplifiers: [crit, ...amps],
        motionValue,
        index,
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
        debuffs,
        transforms,
      };
    });
};

export const chargeAtkHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 15
) => {
  return [0.8718, 0.8718, 0.8718].map((motionValue, index) => {
    return {
      stats: ['charge', 'cryo', 'after_dash', 'after_hyouka', ...stats],
      traits: [...traits],
      amplifiers: [crit, ...amps],
      motionValue,
      index,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      debuffs,
      transforms,
    };
  });
};

export const hyoukaHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 15
) => {
  return [3.588].map((motionValue, index) => {
    return {
      stats: ['skill', 'cryo', 'after_dash', 'after_hyouka', ...stats],
      traits: [...traits],
      amplifiers: [crit, ...amps],
      motionValue,
      index,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      debuffs,
      transforms,
    };
  });
};

const artifacts = [flower_33, feather_33, sand_33, goblet_33, circlet_33];

export const normalAtkAction = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps,
  transforms,
  hitStats,
  duration,
}) => {
  return {
    char: stats(char, weapon, artifacts),
    hits: normalAtkHits(buffs, debuffs, amps, transforms, hitStats, duration),
  };
};

export const chargedAtkAction = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps,
  transforms,
  hitStats,
  duration,
}) => {
  return {
    char: stats(char, weapon, artifacts),
    hits: chargeAtkHits(buffs, debuffs, amps, transforms, hitStats, duration),
  };
};

export const comboAction = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps,
  transforms,
  hitStats = [],
  duration,
}) => {
  const actions = [
    normalAtkAction({
      weapon,
      debuffs,
      buffs,
      amps,
      artifacts,
      transforms,
      hitStats,
      duration: 3,
    }),
    chargedAtkAction({
      weapon,
      debuffs,
      buffs,
      amps,
      artifacts,
      transforms,
      hitStats,
    }),
  ];
  return actions.reduce((accum, action) => {
    return {
      ...accum,
      hits: [...accum.hits, ...action.hits],
    };
  });
};

export const hyoukaAction = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps,
  transforms,
  hitStats,
  duration,
}) => {
  return {
    char: stats(char, weapon, artifacts),
    hits: hyoukaHits(buffs, debuffs, amps, transforms, hitStats, duration),
    cooldown: 10,
    delay: 1,
  };
};

export const soumetsuAction = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps,
  transforms,
  hitStats,
  duration,
}) => {
  return {
    char: stats(char, weapon, artifacts),
    hits: soumetsuHits(buffs, debuffs, amps, transforms, hitStats, duration),
    cooldown: 20,
    delay: 2,
  };
};

const buffs = [noblesse, ttds, cryoRes];
const debuffs = [vvShred];

export const print = () => {
  withContext({
    enemy,
    run: () => {
      const hits = (...params) => [
        ...soumetsuHits(...params),
        ...hyoukaHits(...params),
        ...chargeAtkHits(...params),
      ];
      console.log('-----Soumetsu-----');
      console.log(
        `HOD Damage: ${damageDps(
          stats(char, harbinger, artifacts),
          hits(buffs, debuffs),
          20
        )}`
      );
      console.log(
        `Amenoma Damage: ${damageDps(
          stats(char, amenoma, artifacts),
          hits(buffs, debuffs),
          20
        )}`
      );
      console.log(
        `Festering Desire Damage: ${damageDps(
          stats(char, festering, artifacts),
          hits(buffs, debuffs),
          20
        )}`
      );
      console.log(
        `Mistsplitter Damage: ${damageDps(
          stats(char, mistSplitter, artifacts),
          hits(buffs, debuffs),
          20
        )}`
      );
      console.log('-----CRIT 1 Cut-----');
      console.log(
        `HOD Damage: ${damageDps(
          stats(char, harbinger, artifacts.concat({ critRate: 1 })),
          hits(buffs, debuffs).slice(1, 2)
        )}`
      );
      console.log(
        `Amenoma Damage: ${damageDps(
          stats(char, amenoma, artifacts.concat({ critRate: 1 })),
          hits(buffs, debuffs).slice(1, 2)
        )}`
      );
      console.log(
        `Festering Desire Damage: ${damageDps(
          stats(char, festering, artifacts.concat({ critRate: 1 })),
          hits(buffs, debuffs).slice(1, 2)
        )}`
      );
      console.log(
        `Mistsplitter Damage: ${damageDps(
          stats(char, mistSplitter, artifacts.concat({ critRate: 1 })),
          hits(buffs, debuffs).slice(1, 2)
        )}`
      );
      console.log('-----Shenhe Buff-----');
      console.log(
        `HOD Damage: ${damageDps(
          stats(char, harbinger, artifacts),
          hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst]),
          20
        )}`
      );
      console.log(
        `Amenoma Damage: ${damageDps(
          stats(char, amenoma, artifacts),
          hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst]),
          20
        )}`
      );
      console.log(
        `Festering Desire Damage: ${damageDps(
          stats(char, festering, artifacts),
          hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst]),
          20
        )}`
      );
      console.log(
        `Mistsplitter Damage: ${damageDps(
          stats(char, mistSplitter, artifacts),
          hits([...buffs, makeShenheE(10)], [...debuffs, shenheBurst]),
          20
        )}`
      );
      console.log('-----Shenhe Buff CRIT 1 Cut-----');
      console.log(
        `HOD Damage: ${damageDps(
          stats(char, harbinger, artifacts.concat({ critRate: 1 })),
          hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst]).slice(
            1,
            2
          )
        )}`
      );
      console.log(
        `Amenoma Damage: ${damageDps(
          stats(char, amenoma, artifacts.concat({ critRate: 1 })),
          hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst]).slice(
            1,
            2
          )
        )}`
      );
      console.log(
        `Festering Desire Damage: ${damageDps(
          stats(char, festering, artifacts.concat({ critRate: 1 })),
          hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst]).slice(
            1,
            2
          )
        )}`
      );
      console.log(
        `Mistsplitter Damage: ${damageDps(
          stats(char, mistSplitter, artifacts.concat({ critRate: 1 })),
          hits([...buffs, makeShenheE(1)], [...debuffs, shenheBurst]).slice(
            1,
            2
          )
        )}`
      );
    },
  });
};
