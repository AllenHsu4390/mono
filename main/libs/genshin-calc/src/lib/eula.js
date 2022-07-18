import { crit, pyroVape } from './amplifiers.js';
import { serpentSpine, wolfs } from './claymore.js';
import { withContext } from './context.js';
import { damageDps } from './damage.js';
import {
  icetide,
  lapidus,
  lisaA2,
  shenheBurst,
  superConduct,
} from './debuffs.js';
import { getCurrentEnemy } from './enemy.js';
import {
  flower_10,
  feather_10,
  sand_10,
  goblet_10,
  circlet_10,
  circlet_23,
} from './my_artifacts.js';
import { eula } from './my_characters.js';
import { stats } from './stats.js';
import { getCurrentTeam } from './team.js';
import {
  baalE,
  bennBurst,
  cryoRes,
  geoRes,
  homNature,
  noblesse,
  pyroRes,
  makeShenheE,
  tom,
  ttds,
  xinyanFervor,
  xinyanC4,
} from './traits.js';

export const char = eula;

const enemy = {
  lvl: 90,
  res: 0.3,
  resBuff: 0,
  resDebuff: 0,
  defDebuff: 0,
};

let BURST_INITIAL = 3.9296;
let BURST_FINAL = 6.274;
let STACK = 1.2818;
let NORMAL_ATTACKS = [1.419, 1.41794, 0.8982, 0.8982, 1.7813];

// level 90 override
char.baseAtk = 342;
char.critDmg = 0.5 + 0.384;
char.lvl = 90;
char.lvlMax = 90;
BURST_INITIAL = 4.4208;
BURST_FINAL = 7.2556;
STACK = 1.4824;
NORMAL_ATTACKS = [1.5338, 1.5991, 0.9709, 0.9709, 1.9254];

const glacialIllu = (stacks) => {
  return stacks * STACK;
};

const burstHit = (
  stacks = 13,
  traits = [],
  debuffs = [],
  amps = [],
  transforms = []
) => {
  return [BURST_FINAL + glacialIllu(stacks)].map((motionValue, index) => {
    return {
      stats: ['physical', 'burst'],
      traits,
      amplifiers: [crit, ...amps],
      motionValue,
      index,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      transforms,
      debuffs: [...debuffs, icetide],
    };
  });
};

export const hits = (
  traits = [],
  debuffs = [],
  amps = [],
  transforms = [],
  stats = []
) => {
  const physHit = (motionValue, index) => {
    return {
      stats: ['physical', 'normal'],
      traits,
      amplifiers: [crit, ...amps],
      motionValue,
      index,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      transforms,
      debuffs,
    };
  };

  const cryoHit = (motionValue, index) => {
    return {
      stats: ['cryo'],
      traits,
      amplifiers: [crit],
      motionValue,
      index,
      enemy: getCurrentEnemy(),
      team: getCurrentTeam(),
      transforms,
      debuffs,
    };
  };

  const physHitAfterCryoHit = (motionValue, index) => {
    return {
      ...physHit(motionValue, index),
      debuffs: [...debuffs, icetide],
    };
  };

  const miniBurstHit = (motionValue, index) => {
    return {
      ...physHitAfterCryoHit(motionValue, index),
      stats: ['physical'],
    };
  };

  const combo = [
    ...[BURST_INITIAL].map(cryoHit),
    ...NORMAL_ATTACKS.map(physHit),
    ...[3.07, 1.2, 1.2].map(cryoHit),
    ...[6.274 / 2].map(miniBurstHit),
    ...NORMAL_ATTACKS.slice(0, 4).map(physHitAfterCryoHit),
  ];

  return [...combo, ...burstHit(combo.length, traits, debuffs)];
};

export const glacialAction = ({
  weapon,
  artifacts,
  buffs = [],
  debuffs,
  amps = [],
  transforms,
  hitStats,
}) => {
  return {
    char: stats(eula, weapon, artifacts),
    hits: hits(buffs, debuffs, amps, transforms, hitStats),
    duration: 7,
    cooldown: 20,
    delay: 2,
  };
};

const atk_sands = {
  type: 'pale',
  atkPct: 0.466,
  hp: 269,
  critRate: 0.054,
  defPct: 0.051,
  critDmg: 0.272,
};

const atk_goblet = {
  type: 'pale',
  atkPct: 0.583,
  defPct: 0.041,
  def: 35,
  critRate: 0.011,
  critDmg: 0.078,
};

const cr_circlet = {
  type: 'pale',
  critRate: 0.311,
};

const artifacts = [flower_10, feather_10, sand_10, goblet_10, circlet_23];
const pyroTeam = [bennBurst, tom, noblesse, baalE, xinyanFervor];
const geoTeam = [tom, geoRes, baalE];
const electroTeam = [tom, baalE, ttds];
const cryoTeam = [baalE, cryoRes, makeShenheE(12)];
const xinyanTeam = [tom, baalE, xinyanFervor];

export const print = () => {
  withContext({
    enemy,
    run: () => {
      const geoTeamHits = hits(geoTeam, [lapidus, superConduct]);
      const pyroTeamHits = hits(
        pyroTeam,
        [superConduct, xinyanC4],
        undefined,
        undefined,
        ['pyro']
      );
      const cryoTeamHits = hits(cryoTeam, [lapidus, superConduct, shenheBurst]);
      const electroTeamHits = hits(electroTeam, [
        lapidus,
        superConduct,
        lisaA2,
      ]);
      const xinyanTeamHits = hits(xinyanTeam, [superConduct, xinyanC4, lisaA2]);

      console.log('Geo team: Eula, Raiden, Albedo, Zhong Li');
      console.log(
        `Wolfs r1 ER sands: ${damageDps(
          stats(char, wolfs, artifacts),
          geoTeamHits,
          7
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands: ${damageDps(
          stats(char, serpentSpine, artifacts),
          geoTeamHits,
          7
        )}`
      );
      console.log(
        `Wolfs r1 ER sands Last Hit CRIT: ${damageDps(
          stats(char, wolfs, artifacts.concat({ critRate: 1 })),
          geoTeamHits.slice(-1)
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(
          stats(char, serpentSpine, artifacts.concat({ critRate: 1 })),
          geoTeamHits.slice(-1)
        )}`
      );
      console.log('');
      console.log('Pyro team: Eula, Raiden, Bennett, Xinyan');
      console.log(
        `Wolfs r1 ER sands: ${damageDps(
          stats(char, wolfs, artifacts),
          pyroTeamHits,
          7
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands: ${damageDps(
          stats(char, serpentSpine, artifacts),
          pyroTeamHits,
          7
        )}`
      );
      console.log(
        `Wolfs r1 ER sands Last Hit CRIT: ${damageDps(
          stats(char, wolfs, artifacts.concat({ critRate: 1 })),
          pyroTeamHits.slice(-1)
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(
          stats(char, serpentSpine, artifacts.concat({ critRate: 1 })),
          pyroTeamHits.slice(-1)
        )}`
      );
      console.log('');
      console.log('Cryo team: Eula, Raiden, Shenhe, Zhong Li');
      console.log(
        `Wolfs r1 ER sands: ${damageDps(
          stats(char, wolfs, artifacts),
          cryoTeamHits,
          7
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands: ${damageDps(
          stats(char, serpentSpine, artifacts),
          cryoTeamHits,
          7
        )}`
      );
      console.log(
        `Wolfs r1 ER sands Last Hit CRIT: ${damageDps(
          stats(char, wolfs, artifacts.concat({ critRate: 1 })),
          cryoTeamHits.slice(-1)
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(
          stats(char, serpentSpine, artifacts.concat({ critRate: 1 })),
          cryoTeamHits.slice(-1)
        )}`
      );
      console.log('');
      console.log('Electro team: Eula, Raiden, Lisa, Zhong Li');
      console.log(
        `Wolfs r1 ER sands: ${damageDps(
          stats(char, wolfs, artifacts),
          electroTeamHits,
          7
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands: ${damageDps(
          stats(char, serpentSpine, artifacts),
          electroTeamHits,
          7
        )}`
      );
      console.log(
        `Wolfs r1 ER sands Last Hit CRIT: ${damageDps(
          stats(char, wolfs, artifacts.concat({ critRate: 1 })),
          electroTeamHits.slice(-1)
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(
          stats(char, serpentSpine, artifacts.concat({ critRate: 1 })),
          electroTeamHits.slice(-1)
        )}`
      );
      console.log('');
      console.log('Xinyan team: Eula, Raiden, Lisa, Xinyan');
      console.log(
        `Wolfs r1 ER sands: ${damageDps(
          stats(char, wolfs, artifacts),
          xinyanTeamHits,
          7
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands: ${damageDps(
          stats(char, serpentSpine, artifacts),
          xinyanTeamHits,
          7
        )}`
      );
      console.log(
        `Wolfs r1 ER sands Last Hit CRIT: ${damageDps(
          stats(char, wolfs, artifacts.concat({ critRate: 1 })),
          xinyanTeamHits.slice(-1)
        )}`
      );
      console.log(
        `Serpent Spine r2 ER sands Last Hit CRIT: ${damageDps(
          stats(char, serpentSpine, artifacts.concat({ critRate: 1 })),
          xinyanTeamHits.slice(-1)
        )}`
      );
    },
  });
};
