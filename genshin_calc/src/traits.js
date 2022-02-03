export const bennBurst = ({ atk, elemDmg }, hit) => {
    return {
        atk: atk + 814,
        elemDmg: elemDmg + (hit.stats.includes("pyro") ? 0.15 : 0)
    };
};
export const saraBurst = ({ atk, critDmg }, hit) => {
    return {
        atk: atk + 600,
        //critDmg: critDmg + (hit.stats.includes("electro") ? 0.6 : 0)
    };
};
export const sucroseSwirl = ({ elemMast }, hit) => {
    return {
        elemMast: elemMast + (773 * 0.2 + 50)
    };
};
export const sucroseC6 = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + .2
    };
};
export const noblesse = ({ baseAtk, atk }) => {
    return {
        atk: atk + (baseAtk * 0.20)
    };
};
export const tom = ({ baseAtk, atk }) => {
    return {
        atk: atk + (baseAtk * 0.20)
    };
};
export const pyroRes = ({ baseAtk, atk }) => {
    return {
        atk: atk + (baseAtk * 0.25)
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
        elemDmg: elemDmg + (stats.includes("burst") ? (burstCost * 0.0029) : 0)
    };
};
export const homNature = ({ elemMast }) => {
    return {
        elemMast: elemMast + 125
    };
};
export const dionaC6 = ({ elemMast }) => {
    return {
        elemMast: elemMast + 200
    };
};
export const ttds = ({ baseAtk, atk }) => {
    return {
        atk: atk + (baseAtk * 0.48)
    };
};
export const monaOmen = ({ elemDmg }) => {
    return {
        elemDmg: elemDmg + 0.50
    };
};
export const xianglingC6 = ({ elemDmg }, hit) => {
    return {
        elemDmg: elemDmg + (hit.stats.includes("pyro") ? 0.15 : 0)
    };
};
export const yoimiyaSaxi = ({ atk, baseAtk, name }) => {
    return {
        atk: atk + (baseAtk * ((name === "yoimiya") ? 0 : 0.10))
    };
};

export const gorouBanner3 = ({ elemDmg, def, baseDef, critDmg }, hit) => {
    // c6
    return {
        def: def + 391.7 + (baseDef * 0.25),
        elemDmg: elemDmg + (hit.stats.includes("geo") ? 0.15 : 0),
        critDmg: critDmg + (hit.stats.includes("geo") ? 0.4 : 0)
    };
};

export const yunjinBurst = ({ flatDmg, elemDmg }, hit) => {
    // c2
    const DEF = 2200; // hard code until figure
    return {
        flatDmg: flatDmg + (hit.stats.includes("normal") ? (0.56 * DEF) : 0),
        elemDmg: elemDmg + (hit.stats.includes("normal") ? 0.15 : 0),
    };
};

export const makeShenheE = (num, ATK = 3300, hold = false) => {
    let shenheQuota = num;
    return ({ flatDmg, elemDmg }, hit) => {
        if (hit.stats.includes("cryo")) {
            shenheQuota--;
        }
        const boost = hold ?
            ((hit.stats.includes("normal") || hit.stats.includes("charged")) ? 0.15 : 0) :
            ((hit.stats.includes("burst") || hit.stats.includes("skill")) ? 0.15 : 0);
        return {
            flatDmg: flatDmg + ((hit.stats.includes("cryo") && shenheQuota > -1) ? (0.73 * ATK) : 0),
            // ascension 1
            elemDmg: elemDmg + boost
        };
    }
}