export const rustR1 = (attr) => {
    const { elemDmg, baseAtk, atkPct } = attr;
    const newBaseAtk = baseAtk + 510;

    return {
        name: "rust",
        elemDmg: elemDmg + 0.40,
        baseAtk: newBaseAtk,
        atkPct: atkPct + 0.413,
    };
};

export const rustR5 = (attr) => {
    const { elemDmg, baseAtk, atkPct } = attr;
    const newBaseAtk = baseAtk + 510;

    return {
        name: "rust",
        elemDmg: elemDmg + 0.80,
        baseAtk: newBaseAtk,
        atkPct: atkPct + 0.413,
    };
};

export const amosR2 = (attr) => {
    const { baseAtk, atkPct } = attr;
    const newBaseAtk = baseAtk + 608;

    return {
        name: "amos",
        baseAtk: newBaseAtk,
        atkPct: atkPct +  0.496,
    };
};

export const stringlessR5 = (attr) => {
    const { baseAtk, elemMast } = attr;
    const newBaseAtk = baseAtk + 475;

    return {
        name: "stringless",
        baseAtk: newBaseAtk,
        elemMast: elemMast + 165
    };
};

export const thunderingPulseR1 = (attr) => {
    const { baseAtk, critDmg } = attr;
    const newBaseAtk = baseAtk + 608;

    return {
        name: "thunderingPulse",
        baseAtk: newBaseAtk,
        critDmg: critDmg + .662
    };
};

export const skywardHarpR1 = (attr) => {
    const { baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 674;

    return {
        name: "skywardHarp",
        baseAtk: newBaseAtk,
        critRate: critRate + .221
    };
};

export const recurve = (attr) => {
    const { baseAtk, hpPct } = attr;
    const newBaseAtk = baseAtk + 354;

    return {
        name: "recurve",
        baseAtk: newBaseAtk,
        hpPct: hpPct + .469
    };
};

export const mouun = (attr) => {
    const { baseAtk, atkPct } = attr;
    const newBaseAtk = baseAtk + 565;

    return {
        name: "mouun",
        baseAtk: newBaseAtk,
        atkPct: atkPct + .276
    };
};

export const slingshot = (attr) => {
    const { baseAtk, critRate } = attr;
    const newBaseAtk = baseAtk + 354;

    return {
        name: "slingshot",
        baseAtk: newBaseAtk,
        critRate: critRate + .312
    };
}