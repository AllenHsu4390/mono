export const lionroarR5 = (attr) => {
  const { baseAtk, atkPct } = attr;
  const newBaseAtk = baseAtk + 475;

  return {
    name: 'lionroar',
    baseAtk: newBaseAtk,
    atkPct: atkPct + 0.377,
  };
};

export const sacSword = (attr) => {
  const { baseAtk, recharge } = attr;
  const newBaseAtk = baseAtk + 427;

  return {
    name: 'sacSword',
    baseAtk: newBaseAtk,
    recharge: recharge + 0.559,
  };
};

export const ironSting = (attr) => {
  const { baseAtk, elemMast } = attr;
  const newBaseAtk = baseAtk + 449;

  return {
    name: 'ironSting',
    baseAtk: newBaseAtk,
    elemMast: elemMast + 151,
  };
};

export const harbinger = (attr) => {
  const { baseAtk, critDmg, critRate } = attr;
  const newBaseAtk = baseAtk + 401;
  return {
    name: 'harbinger',
    baseAtk: newBaseAtk,
    critRate: critRate + 0.28,
    critDmg: critDmg + 0.469,
  };
};

export const amenoma = (attr) => {
  const { baseAtk, atkPct } = attr;
  const newBaseAtk = baseAtk + 454;
  return {
    name: 'amenoma',
    baseAtk: newBaseAtk,
    atkPct: atkPct + 0.551,
  };
};

export const isshin = (attr) => {
  const { baseAtk, atkPct } = attr;
  const newBaseAtk = baseAtk + 510;
  return {
    name: 'isshin',
    baseAtk: newBaseAtk,
    atkPct: atkPct + 0.413,
  };
};

export const mistSplitter = (attr) => {
  const { baseAtk, critDmg, elemDmg } = attr;
  const newBaseAtk = baseAtk + 674;
  return {
    name: 'mistsplitter',
    baseAtk: newBaseAtk,
    critDmg: critDmg + 0.441,
    elemDmg: elemDmg + 0.16,
  };
};

export const festering = (attr) => {
  const { baseAtk, recharge } = attr;
  const newBaseAtk = baseAtk + 475;
  return {
    name: 'festering',
    baseAtk: newBaseAtk,
    recharge: recharge + 0.419,
  };
};

export const cinnabar = (attr) => {
  const { baseAtk, defPct } = attr;
  const newBaseAtk = baseAtk + 454;
  return {
    name: 'cinnabar',
    baseAtk: newBaseAtk,
    defPct: defPct + 0.69,
  };
};

export const blackSword = (attr) => {
  const { baseAtk, critRate } = attr;
  const newBaseAtk = baseAtk + 510;
  return {
    name: 'blackSword',
    baseAtk: newBaseAtk,
    critRate: critRate + 0.276,
  };
};

export const skywardBlade = (attr) => {
  const { baseAtk, critRate, recharge } = attr;
  const newBaseAtk = baseAtk + 608;
  return {
    name: 'skywardBlade',
    baseAtk: newBaseAtk,
    critRate: critRate + 0.04,
    recharge: recharge + 0.551,
  };
};
