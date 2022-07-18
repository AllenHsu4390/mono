export const traitsModifiers = {
  SHENHE_DMG_BONUS: 0.73,
  SHENHE_ATK: 3300,
  YUNJIN_DMG_BONUS: 0.661,
  BENNETT_ATK_BONUS: 1.06,
  YUNJIN_DEF: 2200,
  KAZUHA_DMG_BONUS: 0.0004,
  KAZUHA_ELEM_MAST: 646,
};

export const bennBurst = ({ atk, elemDmg }, hit) => {
  return {
    atk: atk + 702 * traitsModifiers.BENNETT_ATK_BONUS,
    elemDmg: elemDmg + (hit.stats.includes('pyro') ? 0.15 : 0),
  };
};
export const saraBurst = ({ atk, critDmg }, hit) => {
  return {
    atk: atk + 526.47,
    //critDmg: critDmg + (hit.stats.includes("electro") ? 0.6 : 0)
  };
};
export const sucroseSwirl = ({ elemMast, name }, hit) => {
  return {
    elemMast: elemMast + (name !== 'sucrose' ? 773 * 0.2 + 50 : 0),
  };
};
export const sucroseC6 = ({ elemDmg }, hit) => {
  return {
    elemDmg: elemDmg + 0.2,
  };
};

export const makePetraCrystal = (type) => {
  return ({ elemDmg }, hit) => {
    return {
      elemDmg: elemDmg + (hit.stats.includes(type) ? 0.35 : 0),
    };
  };
};

export const noblesse = ({ baseAtk, atk }) => {
  return {
    atk: atk + baseAtk * 0.2,
  };
};
export const tom = ({ baseAtk, atk }) => {
  return {
    atk: atk + baseAtk * 0.2,
  };
};
export const pyroRes = ({ baseAtk, atk }) => {
  return {
    atk: atk + baseAtk * 0.25,
  };
};
export const cryoRes = ({ critRate }) => {
  return {
    critRate: critRate + 0.15,
  };
};
export const geoRes = ({ elemDmg }) => {
  return {
    elemDmg: elemDmg + 0.15,
  };
};
export const baalE = ({ burstCost, elemDmg }, { stats }) => {
  return {
    elemDmg: elemDmg + (stats.includes('burst') ? burstCost * 0.0029 : 0),
  };
};
export const homNature = ({ elemMast }) => {
  return {
    elemMast: elemMast + 125,
  };
};
export const dionaC6 = ({ elemMast }) => {
  return {
    elemMast: elemMast + 200,
  };
};
export const ttds = ({ baseAtk, atk }) => {
  return {
    atk: atk + baseAtk * 0.48,
  };
};
export const monaOmen = ({ elemDmg, reactDmg }, { stats, enemy }) => {
  const isHydroReaction =
    stats.includes('hydro') || enemy.stats.includes('hasHydro');
  return {
    elemDmg: elemDmg + 0.5,
    reactDmg: reactDmg + (isHydroReaction ? 0.15 : 0),
  };
};
export const xianglingC6 = ({ elemDmg }, hit) => {
  return {
    elemDmg: elemDmg + (hit.stats.includes('pyro') ? 0.15 : 0),
  };
};

export const yoimiyaSaxi = ({ atk, baseAtk, name }) => {
  return {
    atk: atk + baseAtk * (name === 'yoimiya' ? 0 : 0.1),
  };
};

export const gorouBanner = (
  { elemDmg, def, baseDef, critDmg },
  { stats, team }
) => {
  const geoCount = team.chars.filter((char) => char.element === 'geo').length;
  // c6
  return {
    def: def + (geoCount > 0 ? 391.7 + baseDef * 0.25 : 0),
    elemDmg: elemDmg + (geoCount > 2 && stats.includes('geo') ? 0.15 : 0),
    critDmg: critDmg + (geoCount > 2 && stats.includes('geo') ? 0.4 : 0),
  };
};

export const yunjinBurst = ({ flatDmg, elemDmg }, hit) => {
  // c2
  return {
    flatDmg:
      flatDmg +
      (hit.stats.includes('normal')
        ? traitsModifiers.YUNJIN_DMG_BONUS * traitsModifiers.YUNJIN_DEF
        : 0),
    elemDmg: elemDmg + (hit.stats.includes('normal') ? 0.15 : 0),
  };
};

export const kazuhaBurst = ({ elemDmg }) => {
  const bonus =
    traitsModifiers.KAZUHA_DMG_BONUS * traitsModifiers.KAZUHA_ELEM_MAST;
  return {
    elemDmg: elemDmg + bonus,
  };
};

export const yelanA4 = ({ flatDmg, elemDmg }, hit) => {
  // averaged out
  return {
    elemDmg: elemDmg + 0.25,
  };
};

export const makeShenheE = (num, ATK = 3300, hold = false) => {
  let shenheQuota = num;
  return ({ flatDmg, elemDmg }, hit) => {
    if (hit.stats.includes('cryo')) {
      shenheQuota--;
    }
    const boost = hold
      ? hit.stats.includes('normal') || hit.stats.includes('charge')
        ? 0.15
        : 0
      : hit.stats.includes('burst') || hit.stats.includes('skill')
      ? 0.15
      : 0;
    return {
      flatDmg:
        flatDmg +
        (hit.stats.includes('cryo') && shenheQuota > -1
          ? traitsModifiers.SHENHE_DMG_BONUS * ATK
          : 0),
      // ascension 1
      elemDmg: elemDmg + boost,
    };
  };
};

export const xinyanC4 = ({ resDebuff }, { stats }) => {
  return {
    resDebuff: resDebuff + (stats.includes('physical') ? 0.15 : 0),
  };
};

export const xinyanFervor = ({ elemDmg }, { stats }) => {
  return {
    elemDmg: elemDmg + (stats.includes('physical') ? 0.15 : 0),
  };
};
