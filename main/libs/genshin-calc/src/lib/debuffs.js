export const lapidus = (enemy) => {
    return {
        resDebuff: enemy.resDebuff + 0.2
    };
};

export const superConduct = (enemy, hit) => {
    return {
        resDebuff: enemy.resDebuff + (hit.stats.includes("physical") ? .40 : 0)
    };
};

export const icetide = (enemy, hit) => {
    return {
        resDebuff: enemy.resDebuff + (hit.stats.includes("physical") || hit.stats.includes("cryo") ? 0.19 : 0)
    };
};

export const raidenC2 = (enemy) => {
    return {
        defDebuff: enemy.defDebuff + 0.60
    };
};

export const lisaA2 = (enemy) => {
    return {
        defDebuff: enemy.defDebuff + 0.15
    };
};

export const xingqiuC2 = (enemy, hit) => {
    return {
        resDebuff: enemy.resDebuff + (hit.stats.includes("hydro") ? 0.15 : 0)
    };
}; 

export const vvShred = (enemy) => {
    return {
        resDebuff: enemy.resDebuff + 0.40
    };
};

export const geoResShred = (enemy, hit) => {
    return {
        resDebuff: enemy.resDebuff + (hit.stats.includes("geo") ? 0.20 : 0)
    };
};

export const shenheBurst = (enemy, hit) => {
    return {
        resDebuff: enemy.resDebuff + ((hit.stats.includes("cryo") || hit.stats.includes("physical")) ? 0.12 : 0)
    };
};