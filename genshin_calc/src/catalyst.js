export const solarpearl = (attr) => {
    const { critRate, baseAtk } = attr;
    const newBaseAtk = baseAtk + 475;

    return {
        name: "solarpearl",
        baseAtk: newBaseAtk,
        critRate: critRate + .251
    };
};

export const oathsworn = (attr) => {
    const { baseAtk, atkPct } = attr;
    const newBaseAtk = baseAtk + 523;

    return {
        name: "oathsword",
        baseAtk: newBaseAtk,
        atkPct: atkPct + .251
    };
};

export const widsith = (attr) => {
    const { baseAtk, critDmg } = attr;
    const newBaseAtk = baseAtk + 475;

    return {
        name: "widsith",
        baseAtk: newBaseAtk,
        critDmg: critDmg + 0.503
    };
};

export const widsith_atk = (attr) => {
    const { atkPct, baseAtk } = attr;

    return {
        ...widsith(attr),
        atkPct: atkPct + 1.2
    };
};

export const widsith_mast = (attr) => {
    const { elemMast, baseAtk } = attr;

    return {
        ...widsith(attr),
        elemMast: elemMast + 480
    };
};

export const widsith_dmg = (attr) => {
    const { elemDmg, baseAtk } = attr;

    return {
        ...widsith(attr),
        elemDmg: elemDmg + .96
    };
};

export const mappa = ({ baseAtk, elemDmg, elemMast }) => {
    return {
        name: "mappa",
        baseAtk: baseAtk + 523,
        elemDmg: elemDmg + 0.16,
        elemMast: elemMast + 101,
    }
};