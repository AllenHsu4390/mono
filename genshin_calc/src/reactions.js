const reactionDamage = (elemMast, reactDmg) => {
    return 1 + ((16 * elemMast) / (2000 + elemMast)) + reactDmg;
};

const levelMult = (lvl) => {
    if (lvl >= 60) {
        return (0.00194 * Math.pow(lvl, 3))
            + (-0.319 * Math.pow(lvl, 2))
            + (30.7 * lvl)
            + -868;
    }

    return (0.0002325 * Math.pow(lvl, 3))
        + (0.05547 * Math.pow(lvl, 2))
        + (-0.2523 * lvl)
        + 14.47;
};

export const overloaded = ({ lvl, elemMast, reactDmg }) => {
    return 4 * reactionDamage(elemMast, reactDmg) * levelMult(lvl);
};

export const shatter = ({ lvl, elemMast, reactDmg }) => {
    return 3 * reactionDamage(elemMast, reactDmg) * levelMult(lvl);
};

export const electroCharged = ({ lvl, elemMast, reactDmg }) => {
    return 2.4 * reactionDamage(elemMast, reactDmg) * levelMult(lvl);
};

export const swirl = ({ lvl, elemMast, reactDmg }) => {
    return 1.2 * reactionDamage(elemMast, reactDmg) * levelMult(lvl);
};

export const superConduct = ({ lvl, elemMast, reactDmg }) => {
    return 1 * reactionDamage(elemMast, reactDmg) * levelMult(lvl);
};