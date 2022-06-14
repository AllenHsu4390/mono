export const deathmatch1 = (attr) => {
    const { atkPct, baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 454;
    return {
        name: "deathmatch",
        baseAtk: newBaseAtk,
        atkPct: atkPct + 0.36,
        critRate: critRate + .368
    };
};

export const deathmatch2 = (attr) => {
    const { atkPct, baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 454;

    return {
        name: "deathmatch",
        baseAtk: newBaseAtk,
        atkPct: atkPct + 0.20,
        critRate: critRate + .368
    };
};

export const theCatchR3 = (attr) => {
    const { elemDmg, critRate, recharge, baseAtk } = attr;
    const newBaseAtk = baseAtk + 449;

    return {
        name: "theCatch",
        baseAtk: newBaseAtk,
        critRate: critRate + 0.09,
        elemDmg: elemDmg + 0.24,
        recharge: recharge + .419
    };
};

export const theCatchR4 = (attr) => {
    const { elemDmg, critRate, recharge, baseAtk } = attr;
    const newBaseAtk = baseAtk + 475;

    return {
        name: "theCatch",
        baseAtk: newBaseAtk,
        critRate: critRate + 0.105,
        elemDmg: elemDmg + 0.28,
        recharge: recharge + .419
    };
};

export const theCatchR5 = (attr) => {
    const { elemDmg, critRate, recharge, baseAtk } = attr;
    const newBaseAtk = baseAtk + 510;

    return {
        name: "theCatch",
        baseAtk: newBaseAtk,
        critRate: critRate + 0.12,
        elemDmg: elemDmg + 0.32,
        recharge: recharge + .459
    };
};

export const engulfing = (attr) => {
    const { recharge, baseAtk } = attr;
    const newBaseAtk = baseAtk + 608;

    return {
        name: "engulfing",
        baseAtk: newBaseAtk,
        recharge: recharge + .551,
    };
};

export const jadeSpear = (attr) => {
    const { critRate, baseAtk } = attr;
    const newBaseAtk = baseAtk + 674;

    return {
        name: "jadeSpear",
        baseAtk: newBaseAtk,
        critRate: critRate + .221
    };
};

export const kitain = (attr) => {
    const { elemMast, baseAtk } = attr;
    const newBaseAtk = baseAtk + 523;

    return {
        name: "kitain",
        baseAtk: newBaseAtk,
        elemMast: elemMast + 101
    };
};

export const dragonsBane = (attr) => {
    const { elemMast, baseAtk } = attr;
    const newBaseAtk = baseAtk + 427;

    return {
        name: "dragonsBane",
        baseAtk: newBaseAtk,
        elemMast: elemMast + 201
    };
};

export const favoniusLance = (attr) => {
    const { recharge, baseAtk } = attr;
    const newBaseAtk = baseAtk + 523;

    return {
        name: "favoniusLance",
        baseAtk: newBaseAtk,
        recharge: recharge + .279
    };
};

export const lithic3 = (attr) => {
    const { atkPct, baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 523

    return {
        name: "lithic",
        baseAtk: newBaseAtk,
        atkPct: atkPct + (0.07 * 3) + 0.251,
        critRate: critRate + (.03 * 3)
    };
};

export const lithic1 = (attr) => {
    const { atkPct, baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 523

    return {
        name: "lithic",
        baseAtk: newBaseAtk,
        atkPct: atkPct + (0.07 * 1) + 0.251,
        critRate: critRate + (.03 * 1)
    };
};

export const whiteTassel = (attr) => {
    const { baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 401;

    return {
        name: "whiteTassel",
        baseAtk: newBaseAtk,
        critRate: critRate + (.234),
    };
};

export const homa = (attr) => {
    const { baseAtk, hpPct, critDmg } = attr;
    const newBaseAtk = baseAtk + 608;

    return {
        name: "homa",
        baseAtk: newBaseAtk,
        critDmg: critDmg + (.662),
        hpPct:  hpPct + .20,
    };
};

export const wavebreakerR3 = (attr, hit) => {
    const { baseAtk, atkPct, elemDmg } = attr;
    const newBaseAtk = baseAtk + 571;

    return {
        name: "wavebreaker",
        baseAtk: newBaseAtk,
        atkPct:  atkPct + .125,
    };
};