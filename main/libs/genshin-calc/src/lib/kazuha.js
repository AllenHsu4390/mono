import { crit } from './amplifiers.js';
import { damageDps } from './damage.js';
import { getCurrentEnemy } from './enemy.js';
import {
  circlet_55,
  feather_55,
  flower_55,
  goblet_55,
  sand_55,
} from './my_artifacts.js';
import { kazuha } from './my_characters.js';
import { overloaded, swirl } from './reactions.js';
import { stats } from './stats.js';
import { ironSting, isshin, sacSword } from './swords.js';
import { getCurrentTeam } from './team.js';

const char = kazuha;

let A1_BONUS = 2.0;
let CHIHAYABURU = 3.912 + A1_BONUS;
let PLUNGE_HIGH = 3.2321;
let KAZUHA_SLASH = 4.1984;
let KAZUHA_DOT = 1.92;
let KAZUHA_DMG = 0.576;

// level 90 override
char.elemMast = 115.2;
char.lvl = 90;
char.lvlMax = 90;
CHIHAYABURU = 4.1728 + A1_BONUS;
PLUNGE_HIGH = 3.4936;
KAZUHA_SLASH = 4.4608;
KAZUHA_DOT = 2.04;
KAZUHA_DMG = 0.612;

const chihayaHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 1
) => {
  return [
    ...[CHIHAYABURU].map((motionValue, index) => {
      return {
        stats: ['anemo', 'skill'],
        traits: [...traits],
        amplifiers: [crit, ...amps],
        motionValue,
        index,
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
        debuffs,
        transforms,
      };
    }),
    ...[PLUNGE_HIGH].map((motionValue, index) => {
      return {
        stats: ['plunge', ...stats],
        traits: [...traits],
        amplifiers: [crit, ...amps],
        motionValue,
        index,
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
        debuffs,
        transforms,
      };
    }),
  ];
};

const kazuhaHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 4
) => {
  return [
    ...[KAZUHA_SLASH].map((motionValue, index) => {
      return {
        stats: ['anemo', 'burst'],
        traits: [...traits],
        amplifiers: [crit, ...amps],
        motionValue,
        index,
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
        debuffs,
        transforms,
      };
    }),
    ...Array(duration)
      .fill(KAZUHA_DOT + KAZUHA_DMG)
      .map((motionValue, index) => {
        return {
          stats: ['burst', ...stats],
          traits: [...traits],
          amplifiers: [crit, ...amps],
          motionValue,
          index,
          enemy: getCurrentEnemy(),
          team: getCurrentTeam(),
          debuffs,
          transforms,
        };
      }),
  ];
};

export const kazuhaAction = ({
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
    hits: [
      ...chihayaHits(buffs, debuffs, amps, transforms, hitStats, duration),
      ...kazuhaHits(buffs, debuffs, amps, transforms, hitStats, duration),
    ],
    duration: 6,
    cooldown: 9,
  };
};

export const print = () => {
  const artifacts = [flower_55, feather_55, sand_55, goblet_55, circlet_55];
  const buffs = [];
  const debuffs = [];
  const transforms = [swirl];
  console.log('-----Chihayaburu damage-----');
  console.log(
    `Sac sword: ${damageDps(
      stats(char, sacSword, artifacts),
      chihayaHits(buffs, debuffs, undefined, transforms, undefined)
    )}`
  );
  console.log(
    `Iron sting: ${damageDps(
      stats(char, ironSting, artifacts),
      chihayaHits(buffs, debuffs, undefined, transforms, undefined)
    )}`
  );
  console.log(
    `Isshin: ${damageDps(
      stats(char, isshin, artifacts),
      chihayaHits(buffs, debuffs, undefined, transforms, undefined)
    )}`
  );
  console.log('-----Kazuha slash damage-----');
  console.log(
    `Sac sword: ${damageDps(
      stats(char, sacSword, artifacts),
      kazuhaHits(buffs, debuffs, undefined, transforms, undefined),
      8
    )}`
  );
  console.log(
    `Iron sting: ${damageDps(
      stats(char, ironSting, artifacts),
      kazuhaHits(buffs, debuffs, undefined, transforms, undefined),
      8
    )}`
  );
  console.log(
    `Isshin: ${damageDps(
      stats(char, isshin, artifacts),
      kazuhaHits(buffs, debuffs, undefined, transforms, undefined),
      8
    )}`
  );
  console.log('-----Combo damage-----');
  console.log(
    `Sac sword: ${damageDps(
      stats(char, sacSword, artifacts),
      [
        ...chihayaHits(buffs, debuffs, undefined, transforms, undefined),
        ...kazuhaHits(buffs, debuffs, undefined, transforms, undefined),
      ],
      10
    )}`
  );
  console.log(
    `Iron sting: ${damageDps(
      stats(char, ironSting, artifacts),
      [
        ...chihayaHits(buffs, debuffs, undefined, transforms, undefined),
        ...kazuhaHits(buffs, debuffs, undefined, transforms, undefined),
      ],
      10
    )}`
  );
  console.log(
    `Isshin: ${damageDps(
      stats(char, isshin, artifacts),
      [
        ...chihayaHits(buffs, debuffs, undefined, transforms, undefined),
        ...kazuhaHits(buffs, debuffs, undefined, transforms, undefined),
      ],
      10
    )}`
  );

  console.log('-----Combo damage (overloaded)-----');
  console.log(
    `Sac sword: ${damageDps(
      stats(char, sacSword, artifacts),
      [
        ...chihayaHits(
          buffs,
          debuffs,
          undefined,
          [...transforms, overloaded],
          undefined
        ),
        ...kazuhaHits(
          buffs,
          debuffs,
          undefined,
          [...transforms, overloaded],
          undefined
        ),
      ],
      10
    )}`
  );
  console.log(
    `Iron sting: ${damageDps(
      stats(char, ironSting, artifacts),
      [
        ...chihayaHits(
          buffs,
          debuffs,
          undefined,
          [...transforms, overloaded],
          undefined
        ),
        ...kazuhaHits(
          buffs,
          debuffs,
          undefined,
          [...transforms, overloaded],
          undefined
        ),
      ],
      10
    )}`
  );
  console.log(
    `Isshin: ${damageDps(
      stats(char, isshin, artifacts),
      [
        ...chihayaHits(
          buffs,
          debuffs,
          undefined,
          [...transforms, overloaded],
          undefined
        ),
        ...kazuhaHits(
          buffs,
          debuffs,
          undefined,
          [...transforms, overloaded],
          undefined
        ),
      ],
      10
    )}`
  );
};
