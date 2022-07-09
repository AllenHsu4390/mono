import { crit } from './amplifiers.js';
import { redhorn } from './claymore.js';
import { damageDps } from './damage.js';
import {
  flower_20,
  feather_20,
  sand_20,
  goblet_20,
  circlet_20,
  circlet_28,
  feather_28,
  sands_28,
  flower_28,
  circlet_29,
  flower_30,
  feather_30,
  sands_30,
  goblet_30,
  circlet_30,
  feather_31,
  circlet_38,
} from './my_artifacts.js';
import { stats } from './stats.js';
import { itto } from './my_characters.js';
import { geoResShred, lapidus } from './debuffs.js';
import { bennBurst, geoRes, gorouBanner, noblesse } from './traits.js';
import { getCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';
import { withContext } from './context.js';

export const char = itto;

const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
};

const c_slash = 1.802;
const c_final = 3.774;
const ushi = 4.9152;

export const hits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration
) => {
  const combo = [
    ushi,
    ...Array(5).fill(c_slash),
    c_final,
    ...Array(3).fill(c_slash),
    c_final,
    ushi,
  ];

  return combo.map((motionValue, index) => {
    return {
      stats: [
        motionValue === ushi ? 'skill' : 'charge',
        'geo',
        ...(motionValue === ushi ? [] : ['kesagiri']),
        ...stats,
      ],
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

const circ = circlet_28;
circlet_29;
circlet_38;

const artifacts = [flower_20, feather_30, sands_28, goblet_30, circlet_28];

export const royalAction = ({
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
    char: stats(itto, weapon, artifacts),
    hits: hits(buffs, debuffs, amps, transforms, hitStats),
    duration: 10,
    cooldown: 18,
    delay: 2,
  };
};

const buffs = [gorouBanner, geoRes];
const team = {
  chars: [{ element: 'geo' }, { element: 'geo' }, { element: 'geo' }],
};

export const print = () => {
  withContext({
    enemy,
    team,
    run: () => {
      const debuffs = [geoResShred];
      const fullCombo = hits(buffs, debuffs);
      console.log(
        `Redhorn Damage: ${damageDps(
          stats(itto, redhorn, artifacts),
          fullCombo,
          10,
          0
        )}`
      );
      console.log(
        `Redhorn Slash Hit CRIT Damage: ${damageDps(
          stats(itto, redhorn, artifacts.concat({ critRate: 1 })),
          fullCombo.slice(1, 2)
        )}`
      );
      console.log(
        `Redhorn Final Hit CRIT Damage: ${damageDps(
          stats(itto, redhorn, artifacts.concat({ critRate: 1 })),
          fullCombo.slice(fullCombo.length - 2, fullCombo.length - 1)
        )}`
      );
      console.log(
        `Redhorn Ushi Hit CRIT Damage: ${damageDps(
          stats(itto, redhorn, artifacts.concat({ critRate: 1 })),
          fullCombo.slice(fullCombo.length - 1)
        )}`
      );
    },
  });
};
