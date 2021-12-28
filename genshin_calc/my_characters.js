export const xiao = {
    element: "anemo",
    name: "xiao",
    lvl: 80,
    lvlMax: 80,
    baseHp: 11236,
    baseAtk: 308,
    recharge: 1,
    critRate: 0.242,
    critDmg: 0.50,
    elemDmg: 0,
};

export const eula = {
    element: "cryo",
    name: "eula",
    lvl: 80,
    lvlMax: 80,
    baseHp: 11669,
    baseAtk: 302,
    baseDef: 662,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.788
};

export const raiden = {
    element: "electro",
    name: "raiden",
    lvl: 80,
    lvlMax: 80,
    baseHp: 11388,
    baseAtk: 298,
    recharge: 1.24,
    critRate: 0.05,
    critDmg: 0.5,
    elemDmg: 0,
    burstCost: 90,
};

export const xiangling = {
    element: "pyro",
    name: "xiangling",
    lvl: 80,
    baseAtk: 200,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.50,
    elemDmg: 0,
    elemMast: 72,
    burstCost: 80,
};

export const xingqiu = {
    element: "hydro",
    name: "xingqiu",
    lvl: 80,
    baseAtk: 179,
    atkPct: 0.18,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.50,
    elemDmg: 0,
    burstCost: 80,
};

export const yoimiya = {
    element: "pyro",
    name: "yoimiya",
    lvl: 80,
    lvlMax: 80,
    baseAtk: 285,
    recharge: 1,
    critRate: 0.194,
    critDmg: 0.50,
    elemMast: 0,
};

export const hutao = {
    element: "pyro",
    name: "hutao",
    lvl: 80,
    lvlMax: 80,
    baseHp: 13721,
    baseAtk: 94,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.788,
    elemDmg: 0,
};

export const albedo = {
    element: "geo",
    name: "albedo",
    lvl: 80,
    lvlMax: 80,
    baseAtk: 222,
    baseDef: 773,
    baseHp: 11669,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.50,
    elemMast: 0,
    traits: [({ elemDmg }, { stats }) => {
        return {
            elemDmg: elemDmg + (stats.includes("geo") ? .216 : 0)
        };
    }]
};

export const itto = {
    element: "geo",
    name: "itto",
    lvl: 80,
    lvlMax: 80,
    baseAtk: 299,
    baseDef: 846,
    baseHp: 11345,
    recharge: 1,
    critRate: 0.194,
    critDmg: 0.50,
    elemMast: 0,
    traits: [({ atk, def }, { stats }) => {
        return {
            atk: atk + (.9216 * def)
        };
    }]
};

export const fischl = {
    element: "electro",
    name: "fischl",
    lvl: 80,
    lvlMax: 80,
    baseHp: 8144,
    baseAtk: 216,
    baseDef: 526,
    recharge: 1,
    atkPct: 0.18,
    critRate: 0.05,
    critDmg: 0.50
};

export const zhongli = {
    element: "geo",
    name: "zhongli"
};

export const bennett = {
    element: "pyro",
    name: "bennett"
};

export const sucrose = {
    element: "anemo",
    name: "sucrose",
};

export const jean = {
    element: "anemo",
    name: "jean",
};

export const gorou = {
    element: "geo",
    name: "gorou",
};