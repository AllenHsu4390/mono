export const crit = ({ critRate, critDmg }) => {
    const rate = Math.max(Math.min(critRate, 1), 0);

    return 1 + (rate * critDmg);
};

export const pyroVape = ({ elemMast, reactDmg }) => {
    const bonus = 1 + ((2.78 * elemMast) / (elemMast + 1400)) + reactDmg;
    return 1.5 * bonus;
};

export const hydroVape = ({ elemMast, reactDmg }) => {
    const bonus = 1 + ((2.78 * elemMast) / (elemMast + 1400)) + reactDmg;
    return 2 * bonus;
};

export const cryoMelt = ({ elemMast, reactDmg }) => {
    const bonus = 1 + ((2.78 * elemMast) / (elemMast + 1400)) + reactDmg;
    return 1.5 * bonus;
};

export const pyroMelt = ({ elemMast, reactDmg }) => {
    const bonus = 1 + ((2.78 * elemMast) / (elemMast + 1400)) + reactDmg;
    return 2 * bonus;
};