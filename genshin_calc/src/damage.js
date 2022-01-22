const enemyTemplate = (enemy = {}) => {
    return {
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        ...enemy
    };
};

const hitTemplate = (hit = {}) => {
    return {
        traits: [],
        amplifiers: [],
        transforms: [],
        motionValue: 0,
        enemy: enemyTemplate(hit.enemy),
        index: 0,
        debuffs: [],
        stats:[],
        ...hit
    }
};

const charAttr = (start, hit) => {
    const attr = [...hit.traits, ...start.traits].reduce((accum, next) => {
        return {
            ...accum,
            ...next(accum, hit)
        };
    }, start);

    return attr;
};

const targetDef = (attr, enemy) => {
    const charLvl = attr.lvl;
    const enemyLvl = enemy.lvl;
    const top = charLvl + 100;
    const bottom = charLvl + 100 + ((enemyLvl + 100) * (1 - enemy.defDebuff));

    return top / bottom;
};

const targetRes = (attr, enemy) => {
    let res = enemy.res + enemy.resBuff - enemy.resDebuff;

    // console.log(enemy);

    if (0 > res) {
        return 1 - (res / 2);
    }
    if (0 <= res && res < 0.75) {
        return 1 - res;
    }
    if (0.75 <= res) {
        return 1 / (4 * res + 1);
    }
};
const hitTarget = (start, hit, hitStat) => {
    const { traits, amplifiers = [(attr) => 1.0], motionValue, enemy, debuffs = [], transforms = [] } = hit;
    const enemyDebuffed = debuffs.reduce((accum, next) => {
        return {
            ...accum,
            ...next(accum, hit)
        };
    }, enemy);
    const attr = charAttr(start, hit);
    //console.log(attr);
    const def = targetDef(attr, enemyDebuffed);
    const res = targetRes(attr, enemyDebuffed);
    const motionDmg = (attr[hitStat] * motionValue + attr.flatDmg) * (1 + attr.elemDmg) * def * res;
    //console.log(`${res} x ${def} x ${attr[hitStat]} x ${motionValue}`);
    const ampedDmg = amplifiers.reduce((dmg, amp) => dmg * amp(attr, hit), motionDmg);
    return transforms.reduce((dmg, trans) => dmg + (trans(attr, hit) * res), ampedDmg);
};

export const damage = (start, hits, hitStat = "atk") => {
    return hits.reduce((accum, hit, index) => {
        return accum + hitTarget(start, hitTemplate({...hit, index: hit.index || index }), hitStat);
    }, 0);
};

export const damageDps = (start, hits, duration = 1, downtime = 0, hitStat = "atk") => {
    const totalDmg = damage(start, hits, hitStat);
    return `${Math.floor(totalDmg / (duration + downtime)).toLocaleString()} dps | ${Math.floor(totalDmg).toLocaleString()} in ${duration + downtime} sec`;
};

export const teamDamage = (characterActions) => {
    return characterActions.reduce((totalDmg, { char, hits, hitStat = "atk" }) => {
        return totalDmg + damage(char, hits, hitStat);
    }, 0);
};

export const teamDamageDps = (characterActions = [], duration = 1, downtime = 0) => {
    let totalDmg = 0;
    let charDmg = {};

    for (const action of characterActions) {
        const { char, hits, hitStat = "atk" } = action;
        const dmg = damage(char, hits, hitStat)
        totalDmg += dmg;
        charDmg[char.name] = (charDmg[char.name] || 0) + dmg;
    }

    if (characterActions.find((ca) => ca.duration)) {
        duration = characterActions.reduce((sum, { duration = 0 }) => {
            return sum + duration;
        }, 0);
    }

    if (characterActions.find((ca) => ca.cooldown)) {
        downtime = characterActions.reduce((largest, { cooldown = 0 }) => {
            if (largest < cooldown) {
                return cooldown;
            }
            return largest;
        }, 0) - duration;
        downtime = Math.max(0, downtime);
    }

    if (characterActions.find((ca) => ca.delay)) {
        downtime = Math.max(characterActions.reduce((sum, { delay = 0 }) => {
            return sum + delay;
        }, 0), downtime);
    }
    const outputStr = Object.keys(charDmg).reduce((str, name) => {
        return `${str} | ${Math.round((charDmg[name] / totalDmg) * 100).toLocaleString()}% ${name}`
    }, '');

    return `${Math.floor(totalDmg / (duration + downtime)).toLocaleString()} dps | ${Math.floor(totalDmg).toLocaleString()} in ${duration + downtime} sec${outputStr}`;
};