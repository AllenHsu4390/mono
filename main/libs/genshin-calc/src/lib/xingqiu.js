import { crit, hydroVape } from './amplifiers.js';
import {
  lionroarR5,
  sacSword,
  harbinger,
  blackSword,
  isshin,
} from './swords.js';
import { damageDps } from './damage.js';
import {
  flower_1,
  feather_1,
  sand_1,
  goblet_1,
  circlet_2,
  circlet_3,
  circlet_12,
  feather_2,
  circlet_37,
  feather_9,
  feather_49,
  goblet_49,
} from './my_artifacts.js';
import { stats } from './stats.js';
import { bennBurst, noblesse, pyroRes, baalE } from './traits.js';
import { xingqiu } from './my_characters.js';
import { getCurrentEnemy } from './enemy.js';
import { getCurrentTeam } from './team.js';
import { xingqiuC2 } from './debuffs.js';
import { withContext } from './context.js';

export const char = xingqiu;

let RAINSWORD = 1.03;

// level 90 override
char.baseAtk = 202;
char.atkPct = 0.24;
char.lvl = 90;
char.lvlMax = 90;
RAINSWORD = 1.22;

const c4 = () => 1.5;

export const hits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 15
) => {
  return [
    ...fatalRainScreenHits(traits, debuffs, [...amps, c4], transforms, stats),
    ...Array(Math.floor(Math.min(15, duration) * 4))
      .fill(RAINSWORD)
      .map((motionValue, index) => {
        return {
          stats: ['burst', 'hydro', ...stats],
          traits,
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

const fatalRainScreenHits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = [],
  duration = 15
) => {
  return [3.02, 3.44].map((motionValue, index) => {
    return {
      traits: [...traits],
      debuffs,
      transforms,
      amplifiers: [crit, ...amps],
      motionValue,
      stats: ['skill', 'hydro', ...stats],
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
    };
  });
};

export const raincutterAction = ({
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
    char: stats(xingqiu, weapon, artifacts),
    hits: hits(buffs, debuffs, amps, transforms, hitStats, duration),
    cooldown: 20,
    delay: 2,
  };
};

const artifacts = [flower_1, feather_49, sand_1, goblet_49, circlet_37];

const buffs = [];
const debuffs = [xingqiuC2];
const enemy = {
  lvl: 90,
  res: 0.1,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
  stats: ['hasElectro'],
};

export const print = () => {
  withContext({
    enemy,
    run: () => {
      console.log('Total Combo');
      console.log(
        `Lion's roar: ${damageDps(
          stats(xingqiu, lionroarR5, artifacts),
          hits(buffs, debuffs),
          15
        )}`
      );
      console.log(
        `Sac sword: ${damageDps(
          stats(xingqiu, sacSword, artifacts),
          hits(buffs, debuffs).concat(fatalRainScreenHits(buffs, debuffs)),
          15
        )}`
      );
      console.log(
        `HOD: ${damageDps(
          stats(xingqiu, harbinger, artifacts),
          hits(buffs, debuffs),
          15
        )}`
      );
      console.log(
        `Black sword: ${damageDps(
          stats(xingqiu, blackSword, artifacts),
          hits(buffs, debuffs),
          15
        )}`
      );

      console.log(
        `Isshin: ${damageDps(
          stats(xingqiu, isshin, artifacts),
          hits(buffs, debuffs),
          15
        )}`
      );

      console.log('Total rainscreen');
      console.log(
        `Sac sword: ${damageDps(
          stats(xingqiu, sacSword, artifacts),
          fatalRainScreenHits(buffs, debuffs).concat(
            fatalRainScreenHits(buffs, debuffs)
          )
        )}`
      );
      console.log(
        `Lion's roar: ${damageDps(
          stats(xingqiu, lionroarR5, artifacts),
          fatalRainScreenHits(buffs, debuffs)
        )}`
      );
      console.log(
        `HOD: ${damageDps(
          stats(xingqiu, harbinger, artifacts),
          fatalRainScreenHits(buffs, debuffs)
        )}`
      );
      console.log(
        `Black sword: ${damageDps(
          stats(xingqiu, blackSword, artifacts),
          fatalRainScreenHits(buffs, debuffs)
        )}`
      );
      console.log(
        `Isshin: ${damageDps(
          stats(xingqiu, isshin, artifacts),
          fatalRainScreenHits(buffs, debuffs)
        )}`
      );

      /* 
            console.log("");
            console.log(`Lion's roar CD Circ Single sword CRIT: ${damageDps(stats(xingqiu, lionroarR5, artifacts.concat({ critRate: 1})), hits.slice(0, 1))}`);
            console.log(`Sac sword CD Circ Single sword CRIT: ${damageDps(stats(xingqiu, sacSword, artifacts.concat({ critRate: 1})), hits.slice(0, 1))}`);
            
            console.log(`Sac sword CD Circ: ${damage(stats(xingqiu, sacSword, artifacts), fatalRainScreen) * 0.6 * 2}`);
            console.log(`Sac sword ATK Circ: ${damage(stats(xingqiu, sacSword, artifacts.concat(atk_circ)), fatalRainScreen) * 0.6 * 2}`);
            console.log("");
            console.log(`Lion's roar CD Circ: ${damage(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
            console.log(`Lion's roar ATK Circ: ${damage(stats(xingqiu, lionroarR5, artifacts.concat(atk_circ)), fatalRainScreen)}`);
            console.log(`Lion's roar CR Circ: ${damage(stats(xingqiu, lionroarR5, artifacts), fatalRainScreen)}`);
            console.log(`Lion's roar ATK lvl 20 Circ: ${damage(stats(xingqiu, lionroarR5, artifacts.concat(atk_circ_lvl_20)), fatalRainScreen)}`);
            */
    },
  });
};

/*
Sac sword CD Circ: 207107
Sac sword ATK Circ: 217104
Lion's roar CD Circ: 285239
Lion's roar ATK Circ: 291628
*/
