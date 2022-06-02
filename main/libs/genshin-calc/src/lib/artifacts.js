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

export const cwof4 = ({ elemDmg, reactDmg }, { stats, enemy }) => {
    const isVapeMelt = stats.includes("pyro") && (enemy.stats.includes("hasHydro") || enemy.stats.includes("hasCryo"));
    const isOverload = stats.includes("pyro") && enemy.stats.includes("hasElectro");
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
            hit.stats.includes("weapon_sword") || 
            hit.stats.includes("weapon_polearm") ||  
            hit.stats.includes("weapon_claymore") || 
            hit.stats.includes("normal") ? 0.35 : 0)
    };
};

export const pale2 = (attr) => {
    return {
        element: "physical",
        elemDmg: 0.25,
    };
};

export const pale4 = ({ elemDmg, baseAtk, atk }, hit) => {
    return {
        atk: atk + (baseAtk * 0.18),
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

export const husk4 = ({ baseDef, def, elemDmg }, hit) => {
    return {
        def: def + (baseDef * .24),
        elemDmg: elemDmg + (hit.stats.includes("geo") ? 0.24 : 0)
    };
};

export const bliz2 = () => {
    return {
        element: "cryo",
        elemDmg: 0.15,
    };
};

export const bliz4 = ({ critRate }, { enemy }) => {
    const hasFrozen = enemy.stats.includes("hasFrozen");
    const hasCryo = enemy.stats.includes("hasCryo");
    return {
        critRate: critRate + (hasFrozen ? 0.40 : hasCryo ? 0.20 : 0)
    };
};