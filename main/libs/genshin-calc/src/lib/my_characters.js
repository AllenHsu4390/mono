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
    lvl: 90,
    lvlMax: 90,
    baseHp: 11388,
    baseAtk: 337,
    recharge: 1.32,
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
    lvl: 90,
    lvlMax: 90,
    hp: 10164,
    baseAtk: 323,
    baseDef: 615,
    recharge: 1,
    critRate: 0.242,
    critDmg: 0.50,
    elemMast: 0,
};

export const hutao = {
    element: "pyro",
    name: "hutao",
    lvl: 90,
    lvlMax: 90,
    baseHp: 15552,
    baseAtk: 106,
    baseDef: 876,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.884,
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
    lvl: 90,
    lvlMax: 90,
    baseAtk: 227,
    baseDef: 959,
    baseHp: 12858,
    recharge: 1,
    critRate: 0.242,
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

export const ganyu = {
    type: "cryo",
    name: "ganyu",
    lvl: 90,
    lvlMax: 90,
    baseHp: 9797,
    baseAtk: 335,
    baseDef: 630,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.884
};

export const ayato = {
    type: "hydro",
    name: "ayato",
    lvl: 80,
    lvlMax: 80,
    baseHp: 12101,
    baseAtk: 264,
    baseDef: 678,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.788
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

export const gorou = {
    element: "geo",
    name: "gorou",
};

export const shenhe = {
    element: "cryo",
    name: "shenhe",
    lvl: 80,
    lvlMax: 80,
    baseHp: 11463,
    baseAtk: 268,
    baseDef: 732,
    recharge: 1,
    atkPct: 0.216,
    critRate: 0.05,
    critDmg: 0.50
};

export const yunjin = {
    element: "geo",
    name: "yunjin",
    lvl: 80,
    lvlMax: 80,
    baseHp: 9445,
    baseAtk: 169,
    baseDef: 651,
    recharge: 1.2,
    atkPct: 0,
    critRate: 0.05,
    critDmg: 0.50
};

export const ayaka = {
    element: "cryo",
    name: "ayaka",
    lvl: 90,
    lvlMax: 90,
    baseHp: 12858,
    baseAtk: 342,
    baseDef: 784,
    recharge: 1,
    atkPct: 0,
    critRate: 0.05,
    critDmg: 0.884
};

export const rosaria = {
    element: "cryo",
    name: "rosaria",
    lvl: 80,
    lvlMax: 80,
    baseHp: 10891,
    baseAtk: 213,
    baseDef: 629,
    recharge: 1,
    atkPct: .18,
    critRate: 0.05,
    critDmg: 0.5
};

export const diluc = {
    element: "pyro",
    name: "diluc",
    lvl: 80,
    lvlMax: 80,
    baseHp: 11453,
    baseAtk: 295,
    baseDef: 692,
    recharge: 1,
    critRate: 0.194,
    critDmg: 0.5
};

export const jean = {
    element: "anemo",
    name: "jean",
    lvl: 80,
    lvlMax: 80,
    baseHp: 12965,
    baseAtk: 211,
    baseDef: 678,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.5
};

export const sara = {
    element: "electro",
    name: "sara",
    lvl: 80,
    lvlMax: 80,
    baseHp: 8481,
    baseAtk: 173,
    baseDef: 556,
    atkPct: 0.18,
    recharge: 1,
    critRate: 0.05,
    critDmg: 0.5
};

export const yae = {
    element: "electro",
    name: "yae",
    lvl: 80,
    lvlMax: 80,
    baseHp: 9151,
    baseAtk: 300,
    baseDef: 502,
    recharge: 1,
    critRate: 0.194,
    critDmg: 0.5
};

export const yelan = {
    element: "hydro",
    name: "yelan",
    lvl: 90,
    lvlMax: 90,
    baseAtk: 244,
    baseDef: 548,
    baseHp: 14450,
    recharge: 1,
    critRate: 0.05 + 0.192,
    critDmg: 0.50,
    elemMast: 0,
};

export const venti = {
    element: "anemo",
    name: "venti",
    lvl: 80,
    lvlMax: 80,
    baseHp: 9292,
    baseAtk: 232,
    baseDef: 590,
    recharge: 1.24,
    critRate: 0.05,
    critDmg: 0.5
};
