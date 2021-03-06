import { crit, cryoMelt, pyroVape } from './amplifiers.js';
import { amosR2, rustR1, rustR5, skywardHarpR1, stringlessR5 } from './bows.js';
import { withContext } from './context.js';
import { damage, damageDps } from './damage.js';
import { lapidus } from './debuffs.js';
import { getCurrentEnemy } from './enemy.js';
import {
  flower_13,
  feather_13,
  sand_13,
  goblet_13,
  circlet_13,
  circlet_2,
  flower_4,
  sands_14,
  goblet_15,
  feather_16,
  circlet_45,
  circlet_44,
} from './my_artifacts.js';
import { fischl } from './my_characters.js';
import { electroCharged } from './reactions.js';
import { stats } from './stats.js';
import { getCurrentTeam } from './team.js';
import {
  bennBurst,
  geoRes,
  homNature,
  noblesse,
  pyroRes,
  tom,
} from './traits.js';

export const char = fischl;

const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
};

let OZ_START = 4.1934;
let OZ_HIT = 1.887;

// level 90 override
/*
char.baseAtk = 244;
char.atkPct = 0.24;
char.lvl = 90;
char.lvlMax = 90;

OZ_START = 2.4531;
OZ_HIT = 1.887;
*/

export const icdElectroCharged = (attr, hit) => {
  if (hit.index % 3 === 0) {
    return electroCharged(attr, hit);
  } else {
    return 0;
  }
};

export const hits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 12
) => {
  return [OZ_START, ...Array(duration).fill(OZ_HIT)].map(
    (motionValue, index) => {
      return {
        stats: ['electro', 'skill'],
        traits,
        transforms,
        amplifiers: [crit, ...amps],
        motionValue,
        index,
        debuffs,
        enemy: getCurrentEnemy(),
        team: getCurrentTeam(),
      };
    }
  );
};

const artifacts = [flower_13, feather_16, sand_13, goblet_15, circlet_44];
const cr_artifacts = [flower_13, feather_16, sand_13, goblet_15, circlet_45];

export const a2Action = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps = [],
  transforms,
  hitStats = [],
  duration,
}) => {
  return {
    char: stats(fischl, weapon, artifacts),
    hits: Array(duration)
      .fill(0.8)
      .map((motionValue) => {
        return {
          stats: ['electro', ...hitStats],
          traits: buffs,
          transforms,
          amplifiers: [crit, ...amps],
          motionValue,
          debuffs,
          enemy: getCurrentEnemy(),
          team: getCurrentTeam(),
        };
      }),
  };
};

export const c6Action = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps = [],
  transforms,
  hitStats = [],
  duration = 10,
}) => {
  return {
    char: stats(fischl, weapon, artifacts),
    hits: Array(duration)
      .fill(0.3)
      .map((motionValue) => {
        return {
          stats: ['electro', ...hitStats],
          traits: buffs,
          transforms,
          amplifiers: [crit, ...amps],
          motionValue,
          debuffs,
          enemy: getCurrentEnemy(),
          team: getCurrentTeam(),
        };
      }),
  };
};

export const ozAction = ({
  weapon,
  artifacts,
  buffs,
  debuffs,
  amps = [],
  transforms,
  hitStats,
  duration,
}) => {
  return {
    char: stats(fischl, weapon, artifacts),
    hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
    delay: 1,
  };
};

export const print = () => {
  withContext({
    enemy,
    run: () => {
      const pyroTeam = [bennBurst, noblesse, pyroRes];
      const geoTeam = [tom];
      const geoTeamDebuffs = [lapidus];

      console.log(
        `Stringless r5 Pyro team: ${damageDps(
          stats(char, stringlessR5, cr_artifacts),
          hits(pyroTeam),
          10
        )}`
      );
      console.log(
        `Stringless r5 Geo team: ${damageDps(
          stats(char, stringlessR5, cr_artifacts),
          hits(geoTeam, geoTeamDebuffs),
          10
        )}`
      );
      console.log(
        `Skyward harp Pyro team: ${damageDps(
          stats(char, skywardHarpR1, artifacts),
          hits(pyroTeam),
          10
        )}`
      );
      console.log(
        `Skyward harp Geo team: ${damageDps(
          stats(char, skywardHarpR1, artifacts),
          hits(geoTeam, geoTeamDebuffs),
          10
        )}`
      );

      console.log(
        `Stringless r5 Pyro team summon CRIT: ${damageDps(
          stats(char, stringlessR5, cr_artifacts.concat({ critRate: 1 })),
          hits(pyroTeam).slice(0, 1)
        )}`
      );
      console.log(
        `Stringless r5 Geo team summon CRIT: ${damageDps(
          stats(char, stringlessR5, cr_artifacts.concat({ critRate: 1 })),
          hits(geoTeam, geoTeamDebuffs).slice(0, 1)
        )}`
      );
      console.log(
        `Skyward harp Pyro team summon CRIT: ${damageDps(
          stats(char, skywardHarpR1, artifacts.concat({ critRate: 1 })),
          hits(pyroTeam).slice(0, 1)
        )}`
      );
      console.log(
        `Skyward harp Geo team summon CRIT: ${damageDps(
          stats(char, skywardHarpR1, artifacts.concat({ critRate: 1 })),
          hits(geoTeam, geoTeamDebuffs).slice(0, 1)
        )}`
      );
    },
  });
};
