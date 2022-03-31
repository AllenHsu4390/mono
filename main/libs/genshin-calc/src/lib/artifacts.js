export const eosf2 = (attr) => {
    return {
        recharge: 0.2,
    };
};

export const eosf4 = (attr, hit) => {
    if (hit.stats.indexOf("burst") > -1) {
        const { recharge, elemDmg } = attr;
        const bonus = 0.25 * recharge;

        return {
            elemDmg: elemDmg + ((bonus > 0.75) ? 0.75 : bonus),
        };
    }

    return {};
};

export const cwof2 = (attr) => {
    return {
        element: "pyro",
        elemDmg: 0.15
    };
};

export const cwof4 = ({ elemDmg, reactDmg }, { stats }) => {
    const isVapeMelt = stats.includes("pyro") && (stats.includes("hasHydro") || stats.includes("hasCryo"));
    const isOverload = stats.includes("pyro") && stats.includes("hasElectro");
    return {
        elemDmg: elemDmg + (stats.includes("pyro") ? 0.075 : 0),
        reactDmg: reactDmg + (isVapeMelt ? 0.15 : isOverload ? 0.40 : 0)
    };
};

export const shime2 = (attr) => {
    return {
        atkPct: 0.18
    };
};

export const shime4 = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + (hit.stats.includes("charge") || hit.stats.includes("normal") ? 0.50 : 0)
    };
};

export const wand2 = (attr) => {
    return {
        elemMast: 80
    };
};

export const wand4 = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + (hit.stats.includes("charge") ? 0.35 : 0)
    };
};

export const glad2 = (attr) => {
    return {
        atkPct: 0.18
    };
};

export const glad4 = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + (
            hit.stats.includes("weapon_sword") && 
            hit.stats.includes("weapon_polearm") && 
            hit.stats.includes("weapon_claymore") &&
            hit.stats.includes("normal") ? 0.35 : 0)
    };
};

export const pale2 = (attr) => {
    return {
        element: "physical",
        elemDmg: 0.25,
    };
};

export const pale4 = ({ elemDmg, atkPct }, hit) => {
    return {
        atkPct: atkPct + 0.18,
        elemDmg: elemDmg + (hit.stats.includes("physical") ? 0.25 : 0)
    };
};

export const arch2 = () => {
    return {
        element: "geo",
        elemDmg: 0.15,
    };
};

export const husk2 = ({ defPct }) => {
    return {
        defPct: 0.3
    };
};

export const husk4 = ({ defPct, elemDmg }, hit) => {
    return {
        defPct: defPct + 0.24,
        elemDmg: elemDmg + (hit.stats.includes("geo") ? 0.24 : 0)
    };
};

export const bliz2 = () => {
    return {
        element: "cryo",
        elemDmg: 0.15,
    };
};

export const bliz4 = ({ critRate }, hit) => {
    const stats = hit.enemy && hit.enemy.stats;
    const isFrozen = stats && stats.includes("frozen");
    const hasCryo = stats && stats.includes("hasCryo");
    return {
        critRate: critRate + (isFrozen ? 0.40 : hasCryo ? 0.20 : 0)
    };
};