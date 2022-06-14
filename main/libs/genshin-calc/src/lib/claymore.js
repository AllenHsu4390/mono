export const wolfs = (attr) => {
    const { atkPct, baseAtk } = attr;
    const newBaseAtk = baseAtk + 608;

    return {
        name: "wolfs",
        baseAtk: newBaseAtk,
        atkPct: atkPct + 0.496 + 0.2
    };
};

export const serpentSpine = ({ baseAtk, critRate, elemDmg }) => {
    return {
        name: "serpent",
        baseAtk: baseAtk + 510,
        critRate: critRate + 0.276,
        elemDmg: elemDmg + 0.45
    }
};

export const redhorn = ({ baseAtk, critDmg, defPct }) => {
    return {
        name: "redhorn",
        baseAtk: baseAtk + 542,
        critDmg: critDmg + 0.882,
        defPct: defPct + .28
    }
};

export const rainslasher = ({ baseAtk, elemMast }) => {
    return {
        name: "rainslasher",
        baseAtk: baseAtk + 475,
        elemMast: elemMast + 151,
    }
}; 