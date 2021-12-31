import * as artifactSets from './artifacts.js';
import * as passives from './passives.js';

const artifactSetTraits = (artifacts) => {
    const countTable = artifacts.reduce((count, arti) => {
        count[arti.type] = (count[arti.type] ? count[arti.type] : 0) + 1;
        return count;
    }, {});

    return Object.keys(countTable).reduce(({ pre, post }, artiType) => {
        if (countTable[artiType] >= 4) {
            if (artifactSets[`${artiType}2`] && artifactSets[`${artiType}4`]) {
                return {
                    pre: [...pre, artifactSets[`${artiType}2`]],
                    post: [...post, artifactSets[`${artiType}4`]],
                };
            }
            if (artifactSets[`${artiType}2`]) {
                return {
                    pre: [...pre, artifactSets[`${artiType}2`]],
                    post,
                };
            }
        } else if (countTable[artiType] >= 2) {
            if (artifactSets[`${artiType}2`]) {
                return {
                    pre: [...pre, artifactSets[`${artiType}2`]],
                    post,
                };
            }
        }
        return { pre, post };
    }, {
        pre: [],
        post: [],
    });
};

const getPassiveTraits = (char, weapon) => {
    const passiveTraits = [];
    if (passives[weapon.name]) {
        passiveTraits.push(passives[weapon.name]);
    }
    if (passives[`${char.name}1`]) {
        passiveTraits.push(passives[`${char.name}1`]);
    }
    if (passives[`${char.name}2`]) {
        passiveTraits.push(passives[`${char.name}2`]);
    }

    return passiveTraits;
};

export const stats = (baseAttr, weapon, artifacts) => {
    const charAttr = {
        lvl: 80,
        burstCost: 40,
        baseHp: 0,
        baseAtk: 0,
        baseDef: 0,
        hpPct: 0,
        atkPct: 0,
        defPct: 0,
        hp: 0,
        atk: 0,
        def: 0,
        recharge: 0,
        critRate: 0,
        critDmg: 0,
        elemMast: 0,
        elemDmg: 0,
        reactDmg: 0,
        flatDmg: 0,
        traits: [],
        ...baseAttr
    };
    const weaponAttr = weapon(charAttr);

    const attr = {
        ...charAttr,
        ...weaponAttr,
        name: charAttr.name,
    };

    const artiTraits = artifactSetTraits(artifacts);
    const passiveTraits = getPassiveTraits(charAttr, weaponAttr);

    const mergeAttr = (accum, arti) => {
        const elemDmgPassive = ({ elemDmg }, hit) => {
            if (hit.stats.includes(arti.element)) {
                return {
                    elemDmg: elemDmg + arti.elemDmg
                };
            }
            return {};
        };
        return {
            ...accum,
            atkPct: accum.atkPct + (arti.atkPct || 0),
            atk: accum.atk + (arti.atk || 0),
            hpPct: accum.hpPct + (arti.hpPct || 0),
            hp: accum.hp + (arti.hp || 0),
            defPct: accum.defPct + (arti.defPct || 0),
            def: accum.def + (arti.def || 0),
            critRate: accum.critRate + (arti.critRate || 0),
            critDmg: accum.critDmg + (arti.critDmg || 0),
            recharge: accum.recharge + (arti.recharge || 0),
            elemMast: accum.elemMast + (arti.elemMast || 0),
            elemDmg: accum.elemDmg + (arti.element ? 0 : (arti.elemDmg || 0)),
            flatDmg: accum.flatDmg + (arti.flatDmg || 0),
            reactDmg: accum.reactDmg + (arti.reactDmg || 0),
            traits: [...accum.traits, elemDmgPassive],
        };
    };

    const artiStats = artiTraits.pre.reduce((attr, trait) => {
        return mergeAttr(attr, trait(attr));
    }, artifacts.reduce((accum, arti) => {
        return mergeAttr(accum, arti);
    }, {
        hpPct: 0,
        atkPct: 0,
        defPct: 0,
        hp: 0,
        atk: 0,
        def: 0,
        elemDmg: 0,
        flatDmg: 0,
        critRate: 0,
        critDmg: 0,
        elemMast: 0,
        recharge: 0,
        reactDmg: 0,
        traits: []
    }));
    
    const rtn = {
        ...attr,
        lvl: attr.lvl,
        burstCost: attr.burstCost,
        baseAtk: attr.baseAtk,
        hp: Math.round(attr.baseHp * (1 + attr.hpPct + artiStats.hpPct)) + artiStats.hp + attr.hp,
        def: Math.round(attr.baseDef * (1 + attr.defPct + artiStats.defPct)) + artiStats.def + attr.def,
        atk: Math.round(attr.baseAtk * (1 + attr.atkPct + artiStats.atkPct)) + artiStats.atk + attr.atk,
        recharge: attr.recharge + artiStats.recharge,
        critRate: attr.critRate + artiStats.critRate,
        critDmg: attr.critDmg + artiStats.critDmg,
        elemMast: attr.elemMast + artiStats.elemMast,
        elemDmg: attr.elemDmg + artiStats.elemDmg,
        flatDmg: attr.flatDmg + artiStats.flatDmg,
        traits: [...attr.traits, ...artiStats.traits, ...artiTraits.post, ...passiveTraits],
    };
    return rtn;
};