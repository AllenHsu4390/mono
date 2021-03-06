import { crit } from './amplifiers.js';
import { withContext } from './context.js';
import { damageDps } from './damage.js';
import { shenheBurst, vvShred } from './debuffs.js';
import { getCurrentEnemy } from './enemy.js';
import {
  circlet_33,
  circlet_5,
  feather_33,
  feather_34,
  flower_33,
  flower_34,
  goblet_33,
  goblet_34,
  sand_33,
  sand_34,
} from './my_artifacts.js';
import { ayaka, shenhe } from './my_characters.js';
import { wavebreakerR3 } from './polearms.js';
import { stats } from './stats.js';
import { amenoma, harbinger } from './swords.js';
import { getCurrentTeam } from './team.js';
import {
  cryoRes,
  makeShenheE,
  noblesse,
  traitsModifiers,
  ttds,
} from './traits.js';

let ATK = undefined;
const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
  stats: ['hasCryo'],
};

const baseChar = {
  element: 'cryo',
  name: 'shenhe',
  lvl: 80,
  lvlMax: 80,
  baseHp: 8144,
  baseAtk: 1000,
  baseDef: 526,
  recharge: 1,
  atkPct: 0,
  critRate: 0.05,
  critDmg: 0.5,
};

const char = baseChar;

// level 90 override
/*
char.lvl = 90;
char.lvlMax = 90;
ATK = 3800;
traitsModifiers.SHENHE_DMG_BONUS = 0.8218; */

const springHit = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 1
) => {
  return Array(1)
    .fill(2.23)
    .map((motionValue, index) => {
      return {
        stats: ['cryo', 'skill', ...stats],
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

const divineHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 1
) => {
  const shenheE = makeShenheE(5, ATK);
  return [1.512].concat(Array(12).fill(0.4968)).map((motionValue, index) => {
    return {
      stats: ['cryo', 'burst', ...stats],
      traits: [...traits, shenheE],
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

export const springAction = ({
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
    char: stats(shenhe, weapon, artifacts),
    hits: springHit(buffs, debuffs, amps, transforms, hitStats, duration),
    delay: 2,
  };
};

export const divineAction = ({
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
    char: stats(shenhe, weapon, artifacts),
    hits: divineHits(buffs, debuffs, amps, transforms, hitStats, duration),
    delay: 4,
  };
};

const quillHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 1
) => {
  return Array(duration)
    .fill(0.5)
    .map((motionValue, index) => {
      return {
        stats: ['cryo', ...stats],
        traits: [...traits, makeShenheE(1, ATK)],
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

export const baseQuillAction = ({
  weapon = () => {
    return { name: 'none' };
  },
  artifacts = [],
  buffs,
  debuffs,
  amps,
  transforms,
  hitStats,
  duration,
}) => {
  return {
    char: stats(baseChar, weapon, artifacts),
    hits: quillHits(buffs, debuffs, amps, transforms, hitStats, duration),
  };
};

const hits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration
) => {
  return [
    ...springHit(traits, debuffs, amps, transforms, stats, duration),
    ...divineHits(traits, debuffs, amps, transforms, stats, duration),
    ...quillHits(traits, debuffs, amps, transforms, stats, 10),
  ];
};

const buffs = [noblesse, cryoRes];
const debuffs = [vvShred, shenheBurst];
const artifacts = [flower_34, feather_34, sand_34, goblet_34, circlet_5];

const noWeapon = () => {
  return { name: 'none' };
};

export const print = () => {
  withContext({
    enemy,
    run: () => {
      console.log('-----Shenhe 3 Cryo-----');
      console.log(
        `Wave full combo Damage: ${damageDps(
          stats(shenhe, wavebreakerR3, artifacts),
          hits(buffs, debuffs, undefined, undefined, undefined),
          15
        )}`
      );
      console.log('-----Shenhe 1 Cryo Base-----');
      console.log(
        `Wave Quill Damage: ${damageDps(
          stats(
            baseChar,
            () => {
              return { name: 'none' };
            },
            []
          ),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 5)
        )}`
      );
      console.log(
        `Wave Quill Damage Ayaka: ${damageDps(
          stats(ayaka, amenoma, [
            flower_33,
            feather_33,
            sand_33,
            goblet_33,
            circlet_33,
          ]),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 5)
        )}`
      );
      console.log(
        `Wave Quill Damage Weak Char: ${damageDps(
          stats(
            baseChar,
            noWeapon,
            [].concat({ critDmg: 0.27, critRate: 0.47, atk: 400 })
          ),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 5)
        )}`
      );
      console.log(
        `Wave Quill Damage Strong Char: ${damageDps(
          stats(
            baseChar,
            noWeapon,
            [].concat({ critDmg: 1, critRate: 0.6, atk: 1000, elemDmg: 0.466 })
          ),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 5)
        )}`
      );
      console.log('-----Shenhe Buff CRIT 1 hit-----');
      console.log(
        `Wave Spring Damage: ${damageDps(
          stats(shenhe, wavebreakerR3, artifacts.concat({ critRate: 1 })),
          hits(buffs, debuffs, undefined, undefined, undefined).slice(0, 1)
        )}`
      );
      console.log(
        `Wave Quill Damage Base: ${damageDps(
          stats(baseChar, noWeapon, [].concat({ critRate: 1 })),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(
            0,
            1
          )
        )}`
      );
      console.log(
        `Wave Quill Damage Ayaka: ${damageDps(
          stats(
            ayaka,
            amenoma,
            [flower_33, feather_33, sand_33, goblet_33, circlet_33].concat({
              critRate: 1,
            })
          ),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(
            0,
            1
          )
        )}`
      );
      console.log(
        `Wave Quill Damage Weak Char: ${damageDps(
          stats(
            baseChar,
            noWeapon,
            [].concat({ critDmg: 0.27, critRate: 1, atk: 400 })
          ),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(
            0,
            1
          )
        )}`
      );
      console.log(
        `Wave Quill Damage Strong Char: ${damageDps(
          stats(
            baseChar,
            noWeapon,
            [].concat({ critDmg: 1, critRate: 1, atk: 1000, elemDmg: 0.466 })
          ),
          quillHits(buffs, debuffs, undefined, undefined, undefined, 15).slice(
            0,
            1
          )
        )}`
      );
    },
  });
};
