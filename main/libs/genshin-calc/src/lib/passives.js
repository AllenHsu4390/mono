export const homa = (attr) => {
    const { atk, hp } = attr;

    return {
        atk: atk + (hp * 0.018)
    };
};

export const jadeSpear = ({ baseAtk, atk, elemDmg }, { index }) => {
    let bonusAtkMult = 0.032 * index;
    let bonusDmg = 0;
    if (index > 6) {
        bonusAtkMult =  0.032 * 7;
        bonusDmg = 0.12;
    }
    return {
        atk: atk + (baseAtk * bonusAtkMult),
        elemDmg: elemDmg + bonusDmg,
    };
};

export const wolfs = ({ baseAtk, atk }, { index }) => {
    // inaccurate condition
    return {
        atk: atk + (index > 10 ? (baseAtk * 0.4) : 0)
    };
};

export const amos = ({ elemDmg }, { index }) => { 
    const bonus = (index % 2 === 0) ? 0.35 : 0.65;
    return {
        elemDmg: elemDmg + bonus,
    };
};

export const whiteTassel = ({ elemDmg }, { stats }) => {
    if (stats.includes("normal")) {
        return {
            elemDmg: elemDmg + 0.48
        };
    }
    return {};
};

export const rainslasher = ({ elemDmg }, { enemy }) => {
    if (enemy.stats.includes("hasHydro") || enemy.stats.includes("hasElectro")) {
        return {
            elemDmg: elemDmg + .36
        };
    }

    return {};
};

export const dragonsBane = ({ elemDmg }, { enemy }) => {
    if (enemy.stats.includes("hasHydro") || enemy.stats.includes("hasPyro")) {
        return {
            elemDmg: elemDmg + .36
        };
    }

    return {};
};

export const lionroar = ({ elemDmg }, { enemy }) => {
    if (enemy.stats.includes("hasElectro") || enemy.stats.includes("hasPyro")) {
        return {
            elemDmg: elemDmg + .36
        };
    }

    return {};
};

export const festering = ({ critRate, elemDmg }, { stats }) => {
    if (stats.includes("skill")) {
        return {
            elemDmg: elemDmg + 0.32,
            critRate: critRate + 0.12
        };
    }

    return {};
};

export const stringless = ({ elemDmg }, { stats }) => {
    if (stats.includes("burst") || stats.includes("skill")) {
        return {
            elemDmg: elemDmg + 0.48
        };
    }

    return {};
};

export const wavebreaker = ({ elemDmg }, { stats }) => {
    const BOOST = 260 * 0.0018;
    return {
        elemDmg: elemDmg + (stats.includes("burst") ? BOOST : 0),
    };
};

export const skywardHarp = ({ critDmg }, { stats }) => {
    return {
        critDmg: critDmg + 0.20,
        // 60% extra phys
    };
}; 

export const thunderingPulse = ({ atk, elemDmg, baseAtk }, { stats, index }) => {
    return {
        atk: atk + (baseAtk * 0.2),
        elemDmg: elemDmg + (3 * 0.4)
    };
};

export const yoimiya1 = (attr, { index }) => { 
    const { elemDmg } = attr;
    return {
        elemDmg: elemDmg + (0.02 * (index > 10 ? 10 : index)),
    };
};

export const ganyu1 = (attr, { index }) => {
    const { critRate } = attr;
    return {
        critRate: critRate + (index > 1 ? 0.2 : 0)
    }
};

export const raiden2 = ({ recharge, elemDmg }) => {
    let bonus = (recharge - 1) * 0.4;
    if (bonus < 0) {
        bonus = 0;
    }
    return {
        elemDmg: elemDmg + bonus
    };
};

export const hutao2 = ({ elemDmg }) => {
    return {
        elemDmg: elemDmg + 0.33
    };
};

export const xingqiu2 = ({ elemDmg }) => {
    return {
        elemDmg: elemDmg + 0.2
    };
};

export const xiao1 = ({ elemDmg }, { index }) => {
    let bonus = (Math.floor((index) / 2) + 1) * 0.05;

    if (bonus > 0.25) {
        bonus = 0.25;
    }

    return {
        elemDmg: elemDmg + bonus
    };
};

export const albedo1 = ({ elemDmg }, { index, enemy }) => {
    // enemy below than 50% hp
    let bonus = 0;
    if (enemy && enemy.hp < (enemy.maxHp / 2)) {
        bonus = 0.25;
    }

    return {
        elemDmg: elemDmg + bonus
    };
};

export const cinnabar = ({ flatDmg, def }, { stats }) => {
    return {
        flatDmg: flatDmg + (stats.includes("skill") ? (0.8 * def) : 0)
    };
};

export const redhorn = ({ flatDmg, def }, { stats }) => {
    return {
        flatDmg: flatDmg + (stats.includes("normal") || stats.includes("charge") ? (0.4 * def) : 0)
    };
};

export const blackSword = (attr, { stats }) => {
    const { elemDmg } = attr;
    return {
        elemDmg: elemDmg + (stats.includes("normal") || stats.includes("charge") ? 0.25 : 0)
    };
};

export const skywardBlade = (attr, { stats }) => {
    const { atk, flatDmg } = attr;
    return {
        // attack speed increased by 12%
        flatDmg: flatDmg + (stats.includes("normal") || stats.includes("charge") ? (0.2 * atk) : 0)
    };
};

export const solarpearl = ({ elemDmg }) => {
    // only 6 secs, inaccurate atm
    return {
        elemDmg: elemDmg + 0.20
    }
}
